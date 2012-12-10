=> client 接入
    -> 通过 requrest 的 header 获取 UA
    -> 生成一个全局唯一的 clientId

=> 将 client 引用
    -> 推入 client 全局池内（不区分 client 类型）
    -> 推入类型池内（区分 client 类型）

=> emit('client:connect')


-------------------------------
关闭窗口/refresh都能有效触发disconnect事件

如保有效地管理 busy/free 的状态
