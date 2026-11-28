# Relation 邻域

## 子功能

读取单条 Relation 与它连接的 Block。

## 用户入口

从已知 Relation ID 请求 `GET /relations/{id}/neighborhood`。

## 用运行器驱动

核对 `relation_neighborhood`。两个 Peer 返回同一个 Relation identity，图中恰好包含它连接的两个 Block。

## 容易混淆

该入口用于定位一条边；数据集里的相邻边由 Block 邻域读取。
