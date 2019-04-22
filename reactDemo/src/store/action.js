// 这是相关指令的封装同意存放地，便于管理
function login(value) {
    return {
        type: "login",
        value
    }
}
function shop(value) {
    return {
        type: "shop",
        value
    }
}
export {
    shop,
    login
}
