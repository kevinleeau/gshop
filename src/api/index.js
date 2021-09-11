import ajax from './ajax'
const baseURL = '/api'

// 1、根据经纬度获取位置详情(#1根据经纬度获取位置详情)
export const reqAddress = (geohash) => ajax(`${baseURL}/position/${geohash}`)
// 2、获取食品分类列表(#2获取食品分类列表)
export const reqFoodCategories = () => ajax(baseURL + '/index_category')
// 3、根据经纬度获取商铺列表(#3根据经纬度获取商铺列表)
export const reqShops = (longitude, latitude) => ajax(baseURL + '/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表(#4根据经纬度和关键字搜索商铺列表)
export const reqSearchShop = (geohash, keyword) => ajax(baseURL + '/search_shops', {geohash, keyword}, 'GET')

// 5、获取一次性验证码(#5获取一次性验证码)
// 在login.vue里用event.target.src = 'http://localhost:4000/captcha?time=' + Date.now()获取

// 6、用户名密码登陆(#6用户名密码登陆)
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(baseURL + '/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码(#7发送短信验证码)
export const reqSendCode = (phone) => ajax(baseURL + '/sendcode', {phone}, 'GET')
// 8、手机号验证码登陆(#8手机号验证码登陆)
export const reqSmsLogin = (phone, code) => ajax(baseURL + '/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息(#9根据会话获取用户信息)
export const reqUserInfo = () => ajax(baseURL + '/userinfo')
// 10、用户登出(#10用户登出)
export const reqLogout = () => ajax(baseURL + '/logout')
