# 主动采集持久化契约

原生 Mac Peer 自己校验采集材料、构造共享图并写入 info-base。它通过既有认证数据库协议访问 PostgreSQL／PostgREST，无需 Python Peer、执行者公告或通用扩展宿主。Python 仓库拥有数据库 schema 和迁移，这不构成运行时写入依赖。

本契约拥有跨 Peer 的 Capture 图、提交身份与原子持久化语义。`impl-swift` 拥有本机采集、待办和构图实现；`impl-py` 拥有数据库事务函数及可选 Python 读取分发；`impl-ts` 拥有可选 Web 读取分发。读取分发的存在、启用与否不影响写入。收入后的信息属于共享 info-base，不依赖原采集者或任何特定执行 Peer 存活。

## 冻结材料与图

本机冻结载荷包含 UUID `submission_id`、带时区的 `captured_at`、入口 `selection | paste | screenshot | manual`、可缺失的 `origin`、有序 `materials` 和可缺失的 `annotation`。出处的 `application_id`、`title`、`url` 都允许缺失；显式粘贴不能推断原始来源。文本材料使用 `kind: text` 和 `text`，图片使用 `kind: image`、`mime_type`、`data_base64` 和可缺失的 `filename`。材料与附注不能同时为空。采集 Peer 将该载荷转换为下述图命令，数据库不接收载荷后代为构图。

单次最多 128 份材料，文本和附注的 UTF-8 字节数加解码图片累计不得超过 32 MiB，HTTP JSON 请求不得超过 48 MiB。支持 PNG、JPEG、GIF、WebP；采集 Peer 验证实际图片格式与声明的 MIME，并拒绝文件损坏或解码尺寸过大的图片。原始字节不经过缩放或重新编码。代理也必须允许相同请求体上限；这两个上限是协议边界，不是所有设备与代理都已完成性能校准的承诺。

调用方先冻结提交 UUID、材料和目标信息库，再发送。网络超时不证明提交失败。恢复先查询同一信息库的 `capture_receipts`，核对指纹，再确认本机结果；没有回执时只可使用原 UUID 和原材料重试。切换当前连接不能重定向已有待办。再次主动采集相同内容使用新 UUID，不进行内容去重。

指纹为规范 JSON 的 SHA-256：对象键排序、紧凑分隔符、UTF-8、缺失的可选字段显式为 `null`，时间转 UTC 并保留六位小数，图片的 `data_base64` 替换为原始字节的 `data_sha256`。UUID 使用标准小写形式；数组顺序、文本换行及 Unicode 组合形式保持原样。Swift 对冻结载荷的网络时间表示再规范化，避免本机亚毫秒时间参与指纹却未被发送。

相同 UUID、相同材料与图返回原回执；相同 UUID、不同材料摘要或不同实际图返回 409，客户端保留材料并要求处理。成功结果包含 `submission_id`、`root_block_id`、`committed_at` 和 `availability: available | deleted`。根 Block 删除后回执仍保留，重试返回 `deleted`，不能复活内容。

## 持久图

| 对象或关系 | 合同 |
| --- | --- |
| 根 Block | `extensions.capture.capture.v1`，内容为时间、入口、出处的 JSON |
| 根 → 材料 | `material:0` 起连续递增的关系，序号不可重复 |
| 文本材料 | 标准 `core.text.v1`，原文保持不变 |
| 图片材料 | `extensions.capture.attachment.v1`，内容为 MIME 与可选文件名 |
| 图片材料 → 原始内容 | 唯一 `content` 关系，目标为 `core.image.v1` |
| 原始图片 | 标准 PostgreSQL binary storage（`storage = -4`）保存原始字节 |
| 根 → 用户附注 | 至多一条 `annotation` 关系，目标为 `core.text.v1` |

Resolver 按关系解释材料顺序，不把附注混入原文；缺失或畸形关系显式报错。Web 来源链接仅允许 HTTP(S) 点击，其他来源位置仍可作为文本查看。图片通过标准 storage/resolver 读取，不依赖 Mac 本地文件、Python 内存或派生 OCR。OCR、通用文件、整页抓取和知识查询不属于此版采集范围。

## 数据库原子提交

认证 Peer 调用 `inkcre.commit_capture(submission_id uuid, payload_digest text, graph jsonb)`，PostgREST 对应 `POST /rpc/commit_capture`。JSON 请求键与参数同名；函数返回一个成功结果对象。它使用既有部署 Peer JWT／数据库角色，没有匿名入口，不派发 Job，不查找其他 Peer。

`graph` 是采集 Peer 已构造的图，不是待处理的材料请求。其字段为：

| 字段 | 结构与约束 |
| --- | --- |
| `root_local_id` | 根 Block 的负数局部 ID |
| `blocks` | 1–258 项，每项为 `id`、`resolver`、`content`；ID 为互不重复的负整数，content 为字符串 |
| `relations` | 至多 257 项，每项为 `from_`、`to_`、`content`，两端只引用本命令的局部 Block |
| `blobs` | 至多 128 项，每项为 `block_id`、`data_base64`；只关联本命令中不同的 Block |

函数分配共享 Block ID，将附带 bytes 写入标准 PostgreSQL binary storage，为对应 Block 填入标准 `{"blob_id":"…"}` 指针，并按局部 ID 映射写入关系。它只校验提交结构、引用和限额，不决定 resolver、材料顺序、来源或附注语义，不解码图片或执行采集业务。图 JSON 的 UTF-8 表示至多 48 MiB，解码后 bytes 累计至多 32 MiB；采集 Peer 仍负责前述材料总量和图片格式校验。

图、bytes 和 `capture_receipts` 必须在同一个事务中提交。任何引用、编码或持久化错误都回滚整个命令。UUID 的事务 advisory lock 串行化并发重试，回执主键提供唯一性约束；通用图写入原有的新建语义不变。

回执保留 `payload_digest`，用于核对已有本机冻结材料，并由数据库从收到的 `graph` JSONB 计算 `graph_digest`（JSONB 文本的 UTF-8 SHA-256），将提交身份绑定实际图与 bytes。新调用不能沿用同一材料摘要而替换图。函数只为新提交写回执；回执中的根 ID 没有删除级联外键，因此根被删除后重试返回 `deleted`，不会重建图。

早期开发合同的回执没有 `graph_digest`，迁移保留其 NULL 值并沿用材料摘要恢复，既有待办的 UUID、目标和材料摘要不迁移。新协议写出的回执总有图摘要；不能通过删除旧回执或重新分配待办身份来升级。

## 验收边界

决定写入是否独立的关键观察是在 Python Peer 停止、其他执行者不可用时，Mac 仍能通过 PostgreSQL／PostgREST 写入包含文字、原图与附注的图。成功提交后丢失响应、重开本机待办并重试只产生一份图；原始 bytes 读回一致。另需覆盖同 UUID 的实际图冲突、事务回滚、根删除后的重放，以及停止 Mac 后其他已具备读取能力的 Peer 冷读共享图。

这些数据库与跨 Peer 观察不替代 macOS 系统权限、真实选区、输入法、物理快捷键和多屏像素的原生验收。
