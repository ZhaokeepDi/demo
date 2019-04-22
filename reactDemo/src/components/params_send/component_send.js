import React,{component} from 'react'
var style={
    light:{color:"white",background:"#F66E06"}
}
function ComponentSend(props){
    console.log(props)
    document.title="组件传参"
    return(
        <div className="box">
            <h1><span  style={style.light}>组件</span>传参，接收到父级消息为<span style={style.light}>{props.messige}</span></h1>
            <p>
                {`组件引入：import ComponentSend from './components/params_send/component_send.js'`}
                <br></br>
                {`组件使用：<ComponentSend messige="父=>子"></ComponentSend>`}
                <br></br>
                {`接收参数：{props.messige}`}
            </p>
            <strong>此方法同样可以传递函数以此调用父级函数传参给父级，例子：</strong>
            <button onClick={props.parentFn.bind(this,"这是子级给的内容")}>调用父级函数</button>
            <p>
                {`组件使用：<ComponentSend messige={this.functionDemo.bind(this)}></ComponentSend>`}
                <br></br>
                {`调     用：  <button onClick={props.parentFn.bind(this,"这是子级给的内容")}>调用父级函数</button>`}
            </p>
        </div>
    )
}
export default ComponentSend