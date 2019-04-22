import React, { Component } from "react";
// 引入react
export default function asyncComponent(importComponent) {
    // 导出函数
    class AsyncComponent extends Component {
        // 创建继承于react.Component组件的对象
        constructor(props) {
            super(props);
            //继承props属性
            this.state = {
                component: null
            };
            // 设置组件独立状态
        }
        async componentDidMount() {
            const { default: component } = await importComponent();
            this.setState({
                component: component
            });
        }
        // 异步调用时加载 其他模块

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
        // 其他模块设置成组件
    }

    return AsyncComponent;
    // 导出组件
}