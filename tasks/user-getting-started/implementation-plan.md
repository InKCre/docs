# Memos 初始化与插件文档入口：实施计划

## 授权与目标

2026-09-21，用户确认架构重查后的方案，授权实施、提交、推送与验证。先独立提交本计划，再实施。沿用 Core #110、Docs #28、Web #115、Registry #41 的分支和 worktree；不合并、不正式发布、不修改生产配置。本文件是本地总任务 packet 的实施附件，不另立任务控制入口。

用户应能在 client-web 中准备 Memos 的 URL 与 PAT，通过普通帮助链接查看对应发行的作者文档。Extension 初始化不包办 Source 的配置和采集。Twitter 功能/UI 保持不动，RSS/GitHub 不增加 setup，Mail/Telegram 的 Source 改进不在本轮。2026-09-21 用户进一步回复“纳入”，授权第一方 Python 的 SDK 0.3 兼容调整及必要配套发行意图，包括 Twitter；不扩大合并、正式发布或生产部署权限。

## 实施边界

单个 deployment 主要服务一个用户。在线 Peer + enabled 是正常流程采用的 best-effort 运行假设；观察到具体失败再处理，不建立 running 数据库字段或额外运行证明。PAT 沿用普通配置，浏览器生成或复用，通过既有 patch_config 保存；不新增原子 prepare、锁、操作收据或同步系统。不建设通用 Wizard、Setup Context、Shell，也不改变 setup.component。

### 1. Core 公共地址与 Memos 服务地址

从 Web Memos 直接读取 peer.config 并拼接路径，改为 Core 提供进程内公共 HTTP 基址读取，Memos Python 负责形成自身完整服务地址，Web 通过 Memos 自有的只读 Peer capability 获取。

实现位于 Core app/http.py 和 extensions/memos，复用既有 Core-owned 配置、Peer JWT、固定 inbound 和 Extension 生命周期。公共基址仍只有一个配置权威，保留路径前缀。不新增环境变量、插件 server_url 配置、通用 Core HTTP-info API 或 endpoint registry。只读返回地址，不重复返回 PAT，不将其作为运行状态证明；地址失败不回滚已保存配置或 enabled。

影响限于 Core 地址消费和新 Memos 发行；原 Memos 公共协议与 PAT 鉴权边界保持不变。通过真实 HTTP 验证认证、路径前缀、启停后 capability 以及缺少地址时的反馈。

### 2. 共用管理协议与文档发现

从应用和 Memos 各自维护 Core Extension 管理 wire，改为 ext-reg 的现有独立 Web Runtime 包提供无状态的管理入口：在线且宣告管理 capability 的 Peer 列表，以及精确目标的 typed management command。PeerManager 继续拥有传输、路由与失败分类；应用继续拥有 current-runtime / remote-host / desired-state 策略。

Runtime 同时提供独立的 exact Release 文档发现读取，不借可执行发行预检读取帮助。复用生成合同和现有 Registry origin resolver；不修改 Registry 服务协议，不新增 SDK 公共模型接口。需要用真实 @inkcre/core 0.3 产物完成类型与构建验证，纠正 Runtime 陈旧的 peer dependency 声明，不能仅靠 ambient stub 通过。

所有 mutation 坚持精确目标、不自动换 Peer、不自动重试未知结果。错误不包含可能回显 PAT 的原始响应。Twitter 本轮不迁移。

### 3. Memos 与应用 UI

Memos 主流程缩减为选择 Core（单候选自动选）、准备连接、复制 URL/PAT。PAT 默认遮蔽，不要求 JSON 或手工生成；已有 PAT 复用，仅尚未 enabled 才启用。保留 pending、真实错误、部分成功和未知结果的现场反馈。重开页面不自动执行 mutation。

Extension 卡片提供实际存在的 global / python / module-federation 文档链接；Memos 提供对应 MF 教程页面或锚点的帮助链接。不嵌入正文、不解析 Markdown、不建立导航模型。严格使用已安装版本，缺文档、旧 Registry 或网络故障不能阻断初始化；明确区分不存在与暂时不可用。外链不带凭据，断开 opener。

### 4. 普通配置的运行时生效

已发现的顺序操作问题是 Web Config 直写数据库而 Memos 鉴权读取进程内配置。经现有合同和 advisor 复核，Memos 原有 Unit TDD 已承诺无需重建路由的替换/撤销，因此在每个受保护请求通过既有 EXTENSION_HOST.get 读取 canonical config，再恢复 MemosConfig 类型。读取失败不回退旧配置，不新增 fresh getter、广播或缓存。有效保存完成后发起的请求采用新值，不追溯取消已通过鉴权的请求。共享合同无需更改。

验收必须覆盖一个用户正常修改/撤销 PAT 后的声明行为；不要求两窗口并发初始化唯一性或多 Core 下一请求立即一致。

### 5. 文档与发行准备

在原有 Unit TDD 修正 Web StatePort/独立 Runtime 的已证实漂移，并更新原 Memos global/python/MF 教程。新共享合同若确有必要，先在 Docs Hub 修改并推送，再分别提交 Spoke 引用；不从 Spoke 编辑 docs/_shared。

新 Memos Python 与 MF 使用同一新 Extension Release，正常提交 release intent，不覆盖公开 0.2.0。验证真实 Runtime/SDK 产物和发行预检。本轮的提交推送授权不等于合并、包发布或生产部署授权。

Core pyproject.toml 的服务发行版本是 0.5.0，现有 fragment 准备到 0.6.0；app/version.py 的 Host SDK 是独立轴，release.py 不会更新它。用户确认纳入后，c215705 已显式将 Host SDK 推进到0.3，并为 GitHub、Learn English、Mail、RSS、Telegram、Twitter 保留 >=0.2 下界、扩展上界到<0.4；Memos 使用新接口，继续要求>=0.3 <0.4。兼容性变化使用项目本地 changed/patch intent，旧发行不改写。Twitter/Mail 的 MF 同步增加 patch intent，确保共享 exact Release 仍同时具有两种 Distribution，不改功能/UI/Web SDK 范围。

另外，Web Memos 当前版本 0.1 的单次 minor intent 只准备到 0.2，而新 Python 功能发行目标为 0.3；普通 Changesets 不支持任意目标版本。正式 Version PR 必须对齐二者，不能发布一个需要新 Python API 的旧 0.2 MF。新 Web Runtime 也须先经正常发布，消费者才能根据真实产物更新冻结依赖；本地候选通过不表示公开依赖已可用。

Runtime 的 SDK 类型依赖已改为固定 client-web 源码 SHA 的真实构建：只检出 packages/core，使用原 SDK 源码和构建配置、ext-reg 自身冻结依赖构建，将产物置于 Runtime 私有 node_modules 并只替换本 workspace 的链接，不写 pnpm 共享 store。已删除 ambient SDK stub；源码类型、声明构建与 HTTP 边界检查均使用真实 SDK。这是本仓库锁定环境的兼容验证，不宣称复现尚未发布的官方 SDK 制品，也不建立新 SDK 发布渠道。

## 提交顺序与验证

1. Docs：独立提交本计划。
2. Registry Runtime：实现管理与文档消费接口，真实 SDK 类型/产物集成；运行包级与仓库门禁，提交推送 #41。
3. Core：公共地址、Memos 只读入口及收敛后的配置行为；声明新发行意图，更新局部文档，运行 pdm run check 和真实 HTTP 验证，提交推送 #110。
4. Web：消费 Runtime、精简 Memos、添加文档链接，更新教程与旧 Unit TDD；运行 pnpm check、pnpm build 和浏览器验收，提交推送 #115。
5. Docs：按实际交付校正用户教程与交付记录，运行网站门禁，推送 #28。跨仓库引用与源码提交分开。

独立代码可并行，但所有消费者必须以真实候选产物验证，不能把本地 alias 或 stub 当成发行已经可用。若上游包尚未发布，保留明确的交付阻塞和可重复的候选集成证据，不提交指向本机路径的生产依赖。

验收覆盖首次准备、已有 PAT、重开与重复点击，保存/启用/地址读取分别失败，精确目标与未知结果，普通 Config 修改/撤销，以及 exact Release 文档的各 scope、缺失、不可用和作者锚点。用 disposable 数据库和真实 Core/Web/Memos HTTP 完成登录与 memo 读写；桌面和窄屏检查复制、遮蔽、键盘操作。此证据不扩大为 MoeMemos 设备 UI 已验收。

## 完成标准与回退

各仓库改动、文档、候选产物集成和门禁有可回读证据；PR 保持现有 draft/ready 状态，列明相关 PR、未发布依赖及剩余限制。每次提交只包含当前任务文件，不带本地凭据、运行数据或他人改动。代码回退以各仓库任务提交为单位；本轮不改 DB schema，因此无需数据迁移回退。

## 本轮实现与验收结果

实施计划 efe5cef 先行提交。Core b3626a1、Registry Runtime 5789d4a、Web 2f06923 已推送原 PR。Core 全门禁通过（14 passed、62 skipped），数据库项目另在 disposable PostgreSQL/pgvector 17 运行，Memos 集成 16 passed。Registry 完整 PG/Moto 门禁及 Web 完整门禁均使用真实 SDK/Runtime 候选通过，不能替代下述公开依赖门禁。

真实隔离 Core、PostgREST、Registry 与 MF 候选完成首次准备、保存失败、启用结果未知、启用失败、地址缺失后的恢复，以及重开无 mutation、复制、键盘、390px 和 memo CRUD。Registry 通过真实发布 API 接收 Python/MF 与三组 VitePress 文档，浏览器点击三种 scope 外链和 MF 锚点成功；文档 404/503 不阻断设置。普通 Web Config 直接产生 PostgREST PATCH，PAT A→B 后 A 401/B 200，撤销后均 401，无 Core 重启或重复 enable。PAT 已撤销。MoeMemos 设备 UI 未验收。

原实现安装整个 producer workspace，其锁文件元数据要求读取无关的 UI 包；只读 token 仍403。9615b0d 改为 ext-reg 自身冻结构建环境，不安装 Web 根 workspace，并撤回额外包认证。无 token、禁用用户 npmrc、全新 store 的冻结安装下载212包且复用0包；真实 SDK/Runtime 构建、类型、HTTP边界与完整本地 PG/Moto 门禁通过。远端运行35587933605全通过，含完整门禁、镜像构建和真实HTTP/数据库smoke，未关闭供应链检查。Web在2f06923重新消费最终Runtime候选，完整pnpm check通过；没有改源码、manifest或lock来伪造正式依赖。

SDK兼容调整已获确认并实现。剩余发行协调限制：Runtime 新接口尚未正式发布，Web 保留现有公开 0.1 依赖，因此干净 CI/preview 尚不能通过；Memos MF/Python 0.3 需在正式 Version PR 对齐。用户教程按目标发行编写，不能先于这些依赖单独交付。本轮不合并、不发布、不部署生产。

验收结束已关闭本轮 Core/Web/Registry/Moto、SSH 转发，并清理三个精确命名的专用测试容器及其可重建数据。没有清理用户既有开发或预览实例；任务脚本、构建候选、截图和活动 packet 保留。

## SDK 0.3 兼容调整的补充验收

Core c215705 已提交推送，Web d5949f5 仅新增 Twitter/Mail patch changeset。Core 本地 pdm run check（14 passed、62 skipped）、release admission、pip check及远端仓库/数据库检查通过。未新增依赖或修改插件行为，任务分支的包版本和生成changelog未改。

隔离目录 `/tmp/inkcre-sdk03.hNrOQD` 从真实提交准备版本、构建并finalize七个wheel。移开该副本的producer源码后，实际Core SDK0.3通过静态Registry HTTP下载、依赖预检、pip安装、标准entry point加载及wheel文件归属检查；七个均通过，pip check无缺失依赖。SDK预检确认六个旧插件接受0.2/0.3、拒绝0.4，Memos拒绝0.2、接受0.3。脚本为Core工作区 `tasks/heroku-self-hosting/check-sdk03-wheels.py`。这是发行与加载兼容证据，不是第三方账号采集或所有插件生命周期的重复验收。

| Python候选 | 版本 | 配套MF候选 |
| --- | --- | --- |
| GitHub | 0.3.1 | 不需要 |
| Learn English | 0.2.1 | 不需要 |
| Mail | 0.3.1 | 0.3.1 |
| Memos | 0.3.0 | 既有0.3目标，版本准备协调仍待完成 |
| RSS | 0.2.1 | 不需要 |
| Telegram | 0.3.1 | 不需要 |
| Twitter | 0.4.1 | 0.4.1 |

Twitter/Mail MF 在独立副本中通过正常Changesets准备上述版本、构建及资源闭包检查；功能源码、构建配置、导出与Web SDK范围未变。真实Python+MF组合静态Registry由Toolkit构建，在同一exact Release上通过Core SDK0.3和Web Runtime SDK0.3预检，MF manifest返回200。证据在Web task的 `evidence/sdk03-mf-companion.json`；原Web工作区完整pnpm check通过，但公开Runtime依赖阻塞仍然存在。教程同步采用新兼容版本，生态作者示例以SDK0.3为目标；不再把已授权的兼容范围列为待确认。
