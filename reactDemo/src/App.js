import React, { Component } from 'react';
import {Link,Switch,Route} from 'react-router-dom'
import asyncComponent from './js/async_component.js'
import ComponentSend from './components/params_send/component_send.js'
import store from './store/store.js'
import {login} from './store/action'
class App extends Component {
  constructor(){
    super();
    this.pageName='首页app.js'
    this.data='空'
  }
  alertFn(data){
    this.data=data
    this.setState({data:data})
    console.log(this.data)
    alert('父级函数')
  }
  componentDidMount(){
    console.log(store.dispatch(login({ username: "这是store.login.username", yeare: "这是store.login.yeare", login: "这是store.login.login" })))
    console.log(store.getState())
    // alert(store.dispatch({ type: 'login' }))
  }
  render() {
    return (
      <div>
        <h1>
          {this.pageName}
        </h1>
        <p>{this.data}</p>
        {/* {规定一下路由只显示其中一个} */}
        <Link to={'/routerSend:路由传参'}>查看路由传参</Link>
        <Switch>
          <Route path={'/routerSend:id'} component={asyncComponent(()=>import('./components/params_send/router_send.js'))}></Route>
        </Switch>  
        <ComponentSend messige="组件传参" parentFn={this.alertFn.bind(this)}></ComponentSend>
      </div>
    );
  }
}

export default App;
