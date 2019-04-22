// 这是创建reducer统一存放地，reducer————用于建立state数据片段和相关指令作用    
import { createStore ,combineReducers } from "redux";

function login(
    state = {
        username: null,
        yeare: null,
        login: false,//state片段初始化，可以有多个state片段，action为接收变化的指令
    }, action) {
    switch (action.type) {//在redux里state的变化都不是修改而是直接替换，避免了指针问题
        case "login":
            state.username = action.value.username;
            state.yeare = action.value.yeare;
            state.login = action.value.login;
            return state
        case "signOut":
            return state
        default://必须要有默认值导出
            return state
    }
}
function shop(
    state = {
        shopName: null,
        num: null,
    }, action) {
    switch (action.type) {
        case "show":
            state.shopName = action.value.shopName;
            state.num = action.value.num;
            return state
        default:
            return state
    }
}
//使用reducer创建全局唯一store
var store = createStore(combineReducers({login,shop}))
export default store