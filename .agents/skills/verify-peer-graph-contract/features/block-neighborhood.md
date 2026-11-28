# Block 邻域

## 子功能

按出入方向和 Relation 内容读取；区分孤立 Block 与不存在的 Block。

## 用户入口

从已知 Block ID 请求 `GET /blocks/{id}/neighborhood`。参数由用户请求或图界面选择生成。

## 用运行器驱动

核对 `outgoing_block_neighborhood`、`incoming_exact_content_neighborhood`、`isolated_block_is_success`、`missing_block`。前两项核对实际 Relation 集合和端点完整性，孤立 Block 仍返回自己，缺失场景返回 404。

## 容易混淆

邻域图里的每条边都需要返回两端 Block。零条边仍可返回有效邻域。
