# Capture Extension 合同

`inkcre/capture` 是 first-party extension，拥有材料、来源、采集图、收入身份和恢复语义。各平台 Distribution 为所在 Peer 提供这些能力；语言和仓库不决定业务中心。声明支持采集的分发在本 Peer 内完成采集、编辑、本机保存、构图和共享写入，不依赖另一个分发补齐收入流程。

原生 Mac 分发通过 PostgreSQL 原生协议操作共享 info-base。Host 提供连接、同连接事务与标准 Block／Relation／Storage 基础操作；Capture 编排业务事务。Python 仓库拥有权威 schema／迁移的交付，不因此成为运行时采集执行者。其他 Peer 按自身能力读取或提供采集分发。

## 材料与持久图

材料包含提交 UUID `submission_id`、采集时间 `captured_at`、入口 `selection | paste | screenshot | manual`、可缺失的 `origin`、有序 `materials` 和可缺失的 `annotation`。出处的应用 ID、标题和 URL 允许缺失；显式粘贴不推断来源。材料和附注不能同时为空。单次至多 128 份材料，文字与附注 UTF-8 加原图 bytes 累计不超过 32 MiB。

支持 PNG、JPEG、GIF、WebP，验证 MIME、实际格式与解码尺寸。已有支持编码保留原 bytes；系统仅提供原生位图时，由平台分发生成 PNG 后作为本次原图。原文和自己的补充保持可区分，OCR、模型处理不阻塞收入。

| 对象或关系 | 合同 |
| --- | --- |
| 根 Block | `extensions.capture.capture.v1`，JSON 内容包含提交身份 `submission_id`、材料摘要 `payload_digest`、采集时间、入口、出处 |
| 根 → 材料 | 从 `material:0` 连续递增，无重复序号 |
| 文字 | `core.text.v1`，保持原文 |
| 图片附件 | `extensions.capture.attachment.v1`，JSON 内容包含 MIME、可选文件名 |
| 图片附件 → 内容 | 唯一 `content` 关系，目标为 `core.image.v1` |
| 原图 | 标准 PostgreSQL binary storage `-4`，使用标准 `{"blob_id":"…"}` 指针 |
| 根 → 用户附注 | 至多一条 `annotation` 关系，目标为 `core.text.v1` |

读取分发按关系解释顺序和附注，畸形关系显式报错。Web 来源只允许 HTTP(S) 点击。信息属于共享 info-base，读取不依赖采集设备本地路径或原分发存活。

## 收入、事务与恢复

用户确认后在本机冻结 UUID、材料和目标；草稿、待办与确认结果由本机持久化保存。Capture 在事务外完成校验和构图，再于同一数据库连接、同一事务内锁定提交身份、查找现有 Capture 根、写图与原图 bytes。任何写入错误整体回滚。并发重试以 UUID 字符串的 `hashtextextended(value,0)` 取得事务 advisory lock。

Capture 根的 `submission_id` 与 `payload_digest` 用于提交恢复。相同身份和摘要返回现有根；摘要冲突保留本机材料并要求处理。Extension 不拥有独立共享表，也不在 Extension state 中累积提交回执。图和原图使用既有 Block／Relation／Storage；本机确认后保存根 ID 和时间，再清理本机材料。

材料指纹为规范 JSON 的 SHA-256：键排序、紧凑 UTF-8、缺失可选值为 null、时间 UTC 六位小数、图片数据替换为 bytes SHA-256。文本换行及 Unicode 组合形式不变，材料顺序不变。本机时间冻结为毫秒精度，再规范化为上述时间文本。

网络超时不证明提交失败。恢复查询原目标中的 Capture 根并核对材料摘要；没有根时以原身份重试。明确提交成功或恢复核对成功前保留本机材料。更改当前连接不重定向待办；用户再次采集同内容使用新 UUID，不按内容去重。已经在本机确认的记录不再发送。提交响应丢失后、恢复前又由其他 Peer 删除根的窄窗口不提供防重建保证；不为此保留永久回执或墓碑。

## 平台分发与启停

Capture 的本机草稿格式、待办状态机、系统采集策略和界面属于其平台分发。Host 提供应用、窗口／命令挂载、凭据、持久目录和扩展生命周期。停用某个 Peer 的 Capture 不删除材料或改变共享 schema。

Swift 原生分发以 `swift_bundled` 标识，随签名应用携带精确 producer manifest；扩展版本独立于应用版本。未配置数据库时可本机运行。本机运行开关只控制本机入口与任务，不隐式修改当前或其他信息库的共享参与。首次加入创建缺失的参与记录，已有选择必须读取且不得覆盖；加入成功后，重连不重建已移除的参与，不用缓存启用值覆盖共享意图。用户可以明确指定信息库，选择并启用当前应用携带的版本；该操作允许更新旧版本选择或重新创建缺失的参与，无需动态下载。共享写入前仍复核精确版本与启用意图，本机启动不覆盖其他 Peer 的停用决定。

此 Capture 合同尚未发布，采用一个原生收入协议，不提供旧 HTTP 提交 API、历史本机格式迁移。平台通用数据库协议仍保持原生与 HTTP 的权限对等；未来 HTTP 收入实现须明确自己的事务入口。
