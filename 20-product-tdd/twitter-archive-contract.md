# Twitter 归档信息与接入契约

本契约由 `inkcre/twitter` 拥有，约束 Python 与 Web Distribution 共同写入和解释的原生信息、关系及 x-monkey 接入语义。持久信息属于共享 info-base；采集入口或执行 Peer 停止后，信息仍可由其他具备相应能力的 Peer 使用。各 Unit 自己拥有持久化查询、事务实现、HTTP 注册、采集适配和界面实现。

## 原生信息与身份

x-monkey 兼容基线为 `v0.2.0` / `0fe02c7f291bbdc48a6376bc30d8a98f63e94136`，完整 wire 字段以该版本的 [archive/model.ts](https://github.com/steven-vvv/x-monkey/blob/0fe02c7f291bbdc48a6376bc30d8a98f63e94136/src/archive/model.ts) 为依据。三类独立实体通过 ID 引用彼此；同一种实体的原生 ID 决定合并身份，不能使用 handle、显示名或 JavaScript 数字替代。

| 原生实体 | Resolver | 完整记录的必需字段 | 保留的信息 |
| --- | --- | --- | --- |
| User | `extensions.twitter.user.v1` | `id`、`handle`、`name` | 作者资料、简介富文本、来源链接、账号属性，以及逐项计数和观察时间。 |
| Post | `extensions.twitter.tweet.v2` | `id`、`authorId`、`createdAt` | 正文富文本、长文结构、作者与上下文 ID、媒体顺序、卡片、投票、地点、计数和其他已捕获源事实。 |
| Media | `extensions.twitter.media.v1` | `id`、`type`、`url` | 图片或封面 URL、尺寸、alt、视频 variants、来源 ID、可用性及其他已捕获媒体元数据。 |

每个根 Block 的 content 保存该实体的原生 JSON，而不是清洗后的阅读文本或另一个归档副本。阅读投影只使用其中部分字段时，不得删改已接纳的其他源事实。原生 ID 为正十进制字符串；正文实体区间是 Unicode 码点的半开区间 `[start, end)`；原生时间使用 UTC ISO-8601，计数观察时间保留采集响应完成时的精度。长文 Draft.js 区间继续采用源数据的单位，不擅自转换成正文区间。

字段缺省表示未知。合并不得把缺省变成 `null`、空数组、空正文或否定值；纯转帖可以只有必需字段和 `repostOf`。嵌套对象递归合并，已出现的数组整体替换并保留顺序。接收到明确引用的 ID、但没有完整记录时，可以建立 content 严格为 `{"id":"..."}` 的身份根；不能编造作者资料、正文或未捕获的上下文。后续完整记录补齐同一根。

x-monkey 与 Bookmark 是共同原生信息的两个采集入口。同一 native Post ID 补充同一根，Bookmark 不能用加工后的媒体占位文本覆盖已保存的完整正文。Provider 只交付它实际观察到的字段；作者 handle 不能充当作者 ID，conversation ID 不能充当回复父帖 ID。

匹配时优先使用新版根，再寻找同一原生 ID 的 `extensions.twitter.tweet.v1` 根。旧根获得足够新版事实时原地升级并保留 Block ID，使已有组织和引用继续成立；没有重新采集的 v1 记录仍由 v1 decoder 读取。若历史上已有重复，使用固定目标，不承诺本次搬迁或清理全部重复。普通 Twitter 写入入口对身份匹配、合并和受管关系使用同一串行化边界，提交失败不能留下部分批次；这不将所有 info-base 原始写入都纳入 Twitter 的身份保证。

## 稀疏计数与重复提交

User/Post 的每项计数与同名 `countsObservedAt` 成对处理，规则与基线 [mergeCapturedArchiveRecord](https://github.com/steven-vvv/x-monkey/blob/0fe02c7f291bbdc48a6376bc30d8a98f63e94136/src/archive/merge.ts) 一致：

- 新旧值都有观察时间时，较旧观察不能覆盖较新值；相同或较新时间可以覆盖。
- 相同计数但较新的观察时间仍需保存；不能用客户端“内容是否改变”的返回值忽略元数据写入。
- 无时间的新计数可以更新；值改变时移除该项旧时间，避免用旧观察时间标记新值。值未改变时保留已有时间。
- 没有对应计数的孤立观察时间不更新记录；未提交的其他计数和时间保持。

完整信息、补充信息与原样重放均保持同一 Block 身份。较旧的客户端捕获可能继续显示计数差异；不能为消除该界面差异回退已保存的新观察。

## 可导航关系

Post 的受管出边 content 使用以下 JSON grammar；`type` 是表中的一个实际值，只有 `media` 带从 0 开始的 `position`。

```json
{"schema":"extensions.twitter.reference.v1","type":"media","position":0}
```

| `type` | 目标 | 对应事实 |
| --- | --- | --- |
| `author` | User 根 | `authorId`。 |
| `media` | Media 根 | 依次连接 `mediaIds`、`article.coverMediaId`、`article.mediaIds`，按首次出现去重后形成的有序序列，`position` 为该序列的 0-based 下标。 |
| `reply` | Post 根 | `replyTo.postId`。 |
| `quote` | Post 根 | `quote.postId`。 |
| `repost` | Post 根 | `repostOf`。 |

这些边由对应原生引用维护；只删除或替换本 grammar 管理的边，不改动用户组织关系、既有引用或旧 v1 `attachment` / `entities:url` 边。只知道 ID 的目标仍可导航到身份根，并明确表示未捕获内容。原生记录里的其他 ID 不因此获得一条未定义的关系类型。

Media 根通过既有 content 为 `content` 的关系指向普通 `core.image.v1` 或 `core.video.v1` Block。普通媒体内容 Block 使用既有 HTTP Storage 指针。原生 Media、可读取内容与实际媒体字节是不同层次的信息，不能把三者混为已保全的本地文件。

## 媒体读取与独立使用

本版本只保存原生元数据和可按需读取的 HTTP 指针，不持久化图片或视频字节，也不创建媒体下载 Job。只有符合 Twitter 媒体 HTTPS CDN 规则的地址可形成读取指针；无法形成安全指针的原生元数据仍保留。视频/GIF 使用已捕获的可用 MP4 variant，不把 HLS 播放清单当作视频本体。

保存、query、列表、文本投影与词法索引不得为了媒体内容读取外部字节；用户明确展开后，才使用现有 HTTP Storage 的超时、大小限制和失败反馈。源站 URL 失效时保留文字与元数据，界面明确表示媒体读取失败。`accepted`、`unchanged` 和 `found` 均不承诺媒体长期可用，连接说明必须说明未自动转存媒体，以免沿用客户端的媒体转存文案产生误解。

Post/User Resolver 通过既有投影与索引维护提供原帖 ID/链接、作者和已捕获正文/长文线索；阅读端展示正文、长文、出处和已捕获上下文，并安全解释结构化富文本，不执行归档中的 HTML 或脚本。关闭 x-monkey 后，这些能力仍使用共享信息。未捕获的上下文只显示其已知身份或原生不可用说明，不在阅读时额外抓取完整线程。

媒体本体持久化属于后续能力：先具备适合大媒体的 Storage，再由明确设置开关选择异步 Job；本版本不提供没有实现的开关、保存进度或重试界面。

## x-monkey 协议

用户配置的 Base URL 为执行该 HTTP 能力的 Core 公共基址加 `/twitter/x-monkey`，保留部署路径前缀。

| 相对 Base URL 的路径 | 行为 |
| --- | --- |
| `GET /api/v1/session` | 返回会话状态、期限及 `account_url`；未连接时提供连接指引。 |
| `POST /api/v1/archive/query` | 按各类 ID 批量返回 `found`、`missing` 或 `failed`。完整记录为 `found` 并返回同一份原生 JSON；严格身份根为 `missing`；损坏记录为 `failed`。 |
| `POST /api/v1/archive/submit` | 接收 User/Post/Media 原生批次，合并后返回逐项状态与对应汇总；原样重放不新增根或受管关系。 |

一次 submit 的共同事实与受管关系原子保存；数据库失败使整个批次回滚并返回请求错误。结果中的 `accepted` 表示已保存或合并，包括只有计数观察时间变化的持久更新；`unchanged` 表示没有持久变化。不能用成功汇总掩盖失败实体，也不能因本版本有意不下载媒体而返回 `partial`。

协议不依赖 X OAuth；OAuth 仍只服务 Bookmark 采集。浏览器和脚本管理器适配属于 x-monkey。该接入不提供远端历史浏览、检索或恢复接口，也不补抓请求外的线程和历史。

## JWT 连接与续签

协议复用 [Peer JWT](peer-database-runtime-contract.md#jwt-contract)，不新增 PAT、refresh token、签名秘密或会话表。JWT 仍具既有完整 Peer 权限；用途声明与 Cookie 路径都不构成降权或单会话撤销。

用户在 x-monkey 设置远端数据库地址并检测；未连接时通过 `account_url` 打开 Twitter 连接页。该页指引用户另行打开已连接同一 info-base 的 InKCre Web，在 Twitter setup 中点击“连接 x-monkey”。Web 向明确选择的 Core 部署以顶层 POST 投递新鲜 Peer JWT；Core 验证后签发会话 JWT、建立 Cookie，用户返回脚本再次检测。连接页不自动发现 Web 地址，也不接受任意回跳地址。Web 从所选 Core 的 setup 状态提供的可选 `x_monkey_base_url` 判断该入口是否可用，不以两个 Distribution 的版本数字猜测能力。

会话 JWT 带有签名保护的 `session_use="twitter_archive"`，其默认有效期为 7 天，由 Core 环境配置。首次连接与续签使用同一签发配置；静态 Web 不读取或复制该期限。普通 Peer JWT 只在显式连接入口证明已有权限，普通业务请求不会自动将它升级为可续签会话。

有效 session/query/submit 请求通过会话 JWT、用途及来源检查后，若剩余有效期不超过当前配置寿命的一半，Core 签发新的 `iat`/`exp` 并通过 `Set-Cookie` 更新 Cookie。未到窗口不重写 Cookie。过期、无效或没有该用途的 token 不能续签，其他 Core 请求不触发续签。脚本不需要 refresh endpoint 或续期定时器；停止请求后，在最后签发 JWT 的 `exp` 到期。

本版本没有从首次授权开始计算的绝对会话上限；活跃会话和已复制的合格 JWT 都可以持续续签。断开仅清理当前浏览器 Cookie，不撤销已复制 JWT；部署更换既有 JWT_SECRET 后按既有机制失效。较长 JWT 同时扩大被复制凭据的可用时间。

正式 HTTP 接入使用 HTTPS，Cookie 为 Secure、HttpOnly、SameSite=None，Path 限于保留部署前缀的 Twitter 协议路径，期限不晚于 JWT `exp`。只有这些路由读取协议 Cookie，Core 其他受保护路由继续要求既有 Bearer。无关网页不能读取协议响应或利用 Cookie 发起归档写入，明显的子资源嵌入请求不能触发续签；不能把宽松 CORS、JSON 格式或固定客户端头视为凭据。GM 后台请求可能没有网页 Origin，接收端不能据此识别所有触发无 Origin session GET 的页面。JWT 不出现在 URL 或日志中，JWT_SECRET 不发送到新连接页或脚本。

Python 与 Web Distribution 依靠本契约配套；其 [Native Release 独立版本](extension-release-and-installation.md)，不要求版本数字相同。旧阅读端不能假定已支持新版 Resolver，部署需要选择能够解释本契约的 Distribution。
