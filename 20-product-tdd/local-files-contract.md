# 本地文件扩展合同

`inkcre/local-files` 将指定 Peer 可访问的文件持续收入同一 info-base。执行分发拥有目录访问、监视、提取与对账；读取分发解释同一份图。原文件留在原 Peer 的文件系统，数据库保存已提取正文和位置引用。其他 Peer 阅读正文无需原 Peer 在线。首版不提供原件传输、备份、OCR 或历史版本。

## 位置与来源

原件位置为 `inkcre-peer-file://<peer UUID>/<机器绝对路径>`。例如 `inkcre-peer-file://a143b185-f43d-47d1-8ef7-1d3857284b01/Users/alice/note.md`。authority 是 Peer UUID，path 是绝对路径；空格、中文、`#`、`?` 按 URI 编码。禁止凭据、端口、query、fragment 和 NUL。URI 不授权文件访问，也不注册系统 URL handler。只有匹配 Peer 的执行分发可以按现有文件权限打开原件；其他读取端显示位置，不把它当作可远程下载的 URL。

目录 Source 类型是 `extensions.local_files.directory.v1`，config 包含 `peer`（UUID）、`path`（绝对目录路径）、`enabled`（布尔值），不接受其他字段。其普通采集参数为空对象。Source 的 `core.source.v1` 锚点通过 `manages` 关系指向本来源管理的文件资料。只领取 `config.peer` 等于当前 Peer 且已获得目录访问能力的 `core.source.collect.v1` Job。读取分发只注册 Resolver，不注册无法执行的 Source 类；catalog 中存在类型不代表本 Peer 具有执行能力。

FSEvents 等平台通知触发被动核对；手动扫描使用普通 Source Job。两者执行相同对账逻辑。同一 Source 串行运行。Source 与原信息库及 Peer 绑定，切换当前连接不迁移来源。暂停停止监视及后续提交；移除经确认后删除 Source，已经收入的图保留。

## 文件资料与正文

文件根 Block 使用 `extensions.local_files.file.v2`，content 为以下 JSON。成功提取后恰有一条 `body` 关系指向 inline 通用内容：HTML 采用 `core.html.v1`，Markdown 采用 `core.markdown.v1`，纯文及 PDF／DOCX 文字提取采用 `core.text.v1`。首次提取失败时可没有正文。用户批注或其他组织关系不属于本扩展更新范围。

已有 `extensions.local_files.file.v1` 保持其唯一 inline `core.text.v1` 正文合同。读端同时解释两个版本；执行分发在成功重新提取时，沿单份文件事务升级根和正文的 resolver、内容及成功修订，保持根、正文 ID 及其它关系。失败或原件缺失保留旧正文、旧成功修订和旧版本，不扫描全库迁移。分发版本选择沿既有参与合同保护写入，不新增目录类型。

| 字段 | 合同 |
| --- | --- |
| `location` | 上述位置 URI。位置可以随文件重命名改变，Block ID 保持稳定。 |
| `format` | `pdf`、`docx`、`markdown`、`org`、`html`、`text`。 |
| `identity` | 可省略；含 `volume` 字符串、`number` 非负整数、`created` UTC 时间，用于证明同一文件在原 Peer 的移动。它不是内容摘要或跨 Peer 身份。 |
| `available` | 最近完整核对时原件是否存在；无法访问目录不等于不存在。 |
| `observed_at` | 此状态的 UTC 观察时间。 |
| `revision` | 可省略；最后成功正文对应的 `sha256`（原始文件字节）、`extractor`（提取实现版本）、`extracted_at`（UTC）、`scope`（`text`、`text_layer`、`main_document`）。 |
| `issue` | 可省略；当前提取失败的可读原因。失败不能清空旧正文或替换成功修订。 |

更新先按本来源中的当前路径匹配，以支持编辑器原子保存。旧位置消失且系统身份唯一证明重命名时更新原资料；否则创建新资料，不能依据内容相同合并两个文件。身份需持久保存，重启后仍可核对。摘要只判断修订。

单份文件元数据、正文和关系在一个事务中写入。提交回包丢失后重新读取共享图，避免重复创建。删除原件保留最后成功正文，将 `available` 改为 false；这不是软删除或回收站。只有完整枚举成功且目录仍可访问，才可认定原件缺失。目录离线、权限失败、取消扫描不得批量标记缺失。断网后重连核对当前文件，不承诺保存离线期间出现又消失的文件。

Source state 包含最近完整扫描时间 `scanned_at`、失败文件数 `errors`、可选 `issue`。部分提取失败仍完成目录核对，但主动 Job 以 failed 关闭并呈现失败数量；取消、超时按普通 Job 终态处理。

## 文字提取范围

PDF 提取文字层并分隔页面；无文字层、加密和损坏分别报告。DOCX 首版提取主文档文字与表格单元格，不含脚注、批注等附属内容；读取界面须呈现 `main_document` 范围。Markdown、Org、纯文本保留原语法和换行，不执行代码或 include。Markdown 在阅读时按普通 GFM 解释，Org 保持原文阅读。HTML 从已取得的本地 DOM 及明确的嵌入正文提取内容与结构，保留标题、代码、表格、引用、链接及对象边界；不执行脚本或下载外链，也不把机器文件路径当作网页 base。HTML 与 Markdown 的阅读独立净化并隔离脚本和自动资源加载，不保存平行文字／HTML 正文。

Swift 分发的 extractor 为 `mac-native-content.v2`；旧值为 `mac-native-text.v1`。实现变化必须改变标识，使相同原件字节可以重新提取。输入上限 64 MiB，输出 UTF-8 正文上限 8 MiB；超限报错，不截断后标成功。空白文本允许为空正文，但 HTML 空壳及 PDF／DOCX 没有可提取文字是失败。文本支持 UTF-8、带 BOM 的 UTF-16；不能可靠解码时报告失败。
