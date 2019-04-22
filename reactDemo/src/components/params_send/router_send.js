import React,{component} from 'react'
var style={
    light:{color:"white",background:"#F66E06"}
}
function routerSend(props){
    console.log(props)
    document.title="路由传参"
    return(
        <div className="box">
            <h1><span  style={style.light}>路由</span>传参，接收到父级消息为<span style={style.light}>{props.match.params.id}</span></h1>
            <p>
                {`Route设置： path={'/propsDemo:id'}`}
                <br></br>
                {`Link设置 : to={'/propsDemo:参数'}`}
                <br></br>
                {`接收参数 ：{props.match.params.id}`}
            </p>
        </div>
    )
}
export default routerSend