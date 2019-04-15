// var BASEURL = "https://merge.shawn-zheng.com/"; //正式服务器
var BASEURL = "http://water.youmahe.top/"; //正式服务器
const tokenKey = 'water_token';
var token = wx.getStorageSync('token');
var IMG_API = BASEURL + 'uploadImg?torken=' + token;
var config = {
  GLOBAL_API_DOMAIN: BASEURL,
  IMG_API: IMG_API,
  TOKEN_KEY: tokenKey,
  FROM_APP:'hebing'
};
module.exports = config;