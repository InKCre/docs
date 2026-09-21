# Memos 初始化与插件文档入口：实施计划

## 授权与目标

2026-09-21，用户确认架构重查后的方案，授权实施、提交、推送与验证。先独立提交本计划，再实施。沿用 Core #110、Docs #28、Web #115、Registry #41 的分支和 worktree；不合并、不正式发布、不修改生产配置。本文件是 [总任务 packet](packet.md) 的实施附件，不另立任务控制入口。

用户应能在 client-web 中准备 Memos 的 URL 与 PAT，通过普通帮助链接查看对应发行的作者文档。Extension 初始化不包办 Source 的配置和采集。Twitter 保持不动，RSS/GitHub 不增加 setup，Mail/Telegram 的 Source 改进不在本轮。

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

已发现的顺序操作问题是 Web Config 直写数据库而 Memos 鉴权读取进程内配置。实施前按现有配置合同与实际调用链确定最小修正，并记录具体生效语义；不预定逐请求读取、广播或新 getter。先咨询 advisor，再由主代理决定落点。若必须改变用户已确认的产品语义或共享合同，先说明差异并请求复核，不以本计划授权推导新同步架构。

验收必须覆盖一个用户正常修改/撤销 PAT 后的声明行为；不要求两窗口并发初始化唯一性或多 Core 下一请求立即一致。

### 5. 文档与发行准备

在原有 Unit TDD 修正 Web StatePort/独立 Runtime 的已证实漂移，并更新原 Memos global/python/MF 教程。新共享合同若确有必要，先在 Docs Hub 修改并推送，再分别提交 Spoke 引用；不从 Spoke 编辑 docs/_shared。

新 Memos Python 与 MF 使用同一新 Extension Release，正常提交 release intent，不覆盖公开 0.2.0。验证真实 Runtime/SDK 产物和发行预检。Core #110 既有 added intent 将推进 0.3，而现有第一方 Python 声明上界 <0.3：明确记录并检查该发布依赖，不擅自重发 Twitter、不绕过兼容门禁。本轮的提交推送授权不等于合并、包发布或生产部署授权。

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
