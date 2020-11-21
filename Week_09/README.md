学习笔记
思考题：为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
因为first-letter是针对字的样式不用关心变化布局所带来的影响，而first-line时必须是布局计算完成才能确定首行，如果first-line支持改变大小或display，那么布局又需要重新计算首行很影响性能。