# 有向最短路径

## 子功能

返回持久有序路径、已证明不可达或预算限制。起点和终点可以相同。

## 用户入口

用两个 Block 的 ID 调用 `POST /graph/path`，按请求指定方向、Relation 内容和探索预算。

## 用运行器驱动

核对 `unique_directed_shortest_path`、`equal_shortest_path_has_no_tie_break_authority`、`zero_hop_path`、`direction_proves_disconnection`、`hop_budget_prevents_proof`。路径成功时核对有序节点与边、方向和内容。存在等长路径时，运行器校验端点和合法的最短跳数，接受任一合法选择。

## 容易混淆

耗尽预算时返回 `limit_reached`。只有穷尽允许的相关拓扑才能返回 `not_found`。
