# Capture Extension 合同

`inkcre/capture` 是 first-party extension，拥有材料、来源、采集图、收入身份、回执和恢复语义。各平台 Distribution 为所在 Peer 提供这些能力；语言和仓库不决定业务中心。声明支持采集的分发在本 Peer 内完成采集、编辑、本机保存、构图和共享写入，不依赖另一个分发补齐收入流程。

原生 Mac 分发通过 PostgreSQL 原生协议操作共享 info-base。Host 提供连接、同连接事务与标准 Block／Relation／Storage 基础操作；Capture 编排业务事务。Python 仓库拥有权威 schema／迁移的交付，不因此成为运行时采集执行者。其他 Peer 按自身能力读取或提供采集分发。

## 材料与持久图

材料包含提交 UUID `submission_id`、采集时间 `captured_at`、入口 `selection | paste | screenshot | manual`、可缺失的 `origin`、有序 `materials` 和可缺失的 `annotation`。出处的应用 ID、标题和 URL 允许缺失；显式粘贴不推断来源。材料和附注不能同时为空。单次至多 128 份材料，文字与附注 UTF-8 加原图 bytes 累计不超过 32 MiB。

支持 PNG、JPEG、GIF、WebP，验证 MIME、实际格式与解码尺寸。已有支持编码保留原 bytes；系统仅提供原生位图时，由平台分发生成 PNG 后作为本次原图。原文和自己的补充保持可区分，OCR、模型处理不阻塞收入。

| 对象或关系 | 合同 |
| --- | --- |
| 根 Block | `extensions.capture.capture.v1`，JSON 内容包含采集时间、入口、出处 |
| 根 → 材料 | 从 `material:0` 连续递增，无重复序号 |
| 文字 | `core.text.v1`，保持原文 |
| 图片附件 | `extensions.capture.attachment.v1`，JSON 内容包含 MIME、可选文件名 |
| 图片附件 → 内容 | 唯一 `content` 关系，目标为 `core.image.v1` |
| 原图 | 标准 PostgreSQL binary storage `-4`，使用标准 `{"blob_id":"…"}` 指针 |
| 根 → 用户附注 | 至多一条 `annotation` 关系，目标为 `core.text.v1` |

读取分发按关系解释顺序和附注，畸形关系显式报错。Web 来源只允许 HTTP(S) 点击。信息属于共享 info-base，读取不依赖采集设备本地路径或原分发存活。

## 收入、事务与恢复

用户确认后在本机冻结 UUID、材料和目标。Capture 在事务外完成校验和构图，再于同一数据库连接、同一事务内锁定提交身份、检查回执、写图与原图 bytes、写回执。任何写入错误整体回滚。并发请求以 UUID 字符串的 `hashtextextended(value,0)` 取得事务 advisory lock；回执主键再约束唯一性。

共享 `capture_receipts` 保存 `submission_id`、`payload_digest`、`graph_digest`、`root_block_id`、`committed_at`。摘要必填，根 ID 保留历史引用而不级联删除。相同身份和相同摘要重试恢复原结果；摘要冲突保留材料并要求处理。根删除后返回 `deleted`，不得重建图。

材料指纹为规范 JSON 的 SHA-256：键排序、紧凑 UTF-8、缺失可选值为 null、时间 UTC 六位小数、图片数据替换为 bytes SHA-256。文本换行及 Unicode 组合形式不变，材料顺序不变。本机时间冻结为毫秒精度，再规范化为上述时间文本。

实际图指纹使用 Capture v1 的确定性构图投影：`root_local_id`、有序 `blocks`、`relations`、`blobs`；根局部 ID 为 -1，后续 Block 按材料顺序递减分配，图片附件后紧接内容 Block，附注最后。Block 字段为 id/resolver/content，关系为 from_/to_/content，图片附带项为 block_id/data_base64。对这一投影排序键、紧凑 UTF-8 编码后计算 SHA-256；base64 仅参与摘要投影，原生写入 bytes 使用 bytea 参数。

网络超时不证明提交失败。本机先查询同目标回执，核对材料指纹后确认；没有回执时以原身份重试。共享回执确认前保留本机材料。更改当前连接不重定向待办；用户再次采集同内容使用新 UUID，不按内容去重。对用户展示和本机保存的回执时间统一为毫秒精度，数据库保留原时间精度。

## 平台分发与启停

Capture 的本机草稿格式、待办状态机、系统采集策略和界面属于其平台分发。Host 提供应用、窗口／命令挂载、凭据、持久目录和扩展生命周期。停用某个 Peer 的 Capture 不删除材料或改变共享 schema。

Swift 原生分发以 `swift_bundled` 标识，随签名应用携带精确 producer manifest；扩展版本独立于应用版本。未配置数据库时可本机运行。首次加入创建缺失的参与记录，已有选择必须读取且不得覆盖；加入或明确启用成功后，重连不重建已移除的参与，不用缓存启用值覆盖共享意图。用户在线明确启用可以重新创建本 Peer 的缺失参与。离线开关只改变本机运行并说明共享意图未更新；重连读取共享选择，共享写入前复核其精确版本与启用意图。

此 Capture 合同尚未发布，采用一个原生收入协议，不提供旧 HTTP 提交 API、旧回执空摘要或历史本机格式迁移。平台通用数据库协议仍保持原生与 HTTP 的权限对等；未来 HTTP 收入实现须明确自己的事务入口。
