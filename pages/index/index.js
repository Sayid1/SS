import {
  GLOBAL_API_DOMAIN,
  IMG_API,
  TOKEN_KEY,
  FROM_APP
} from '../../utils/config/config.js';
import Api from '/../../utils/config/api.js'
var utils = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindGetUserInfo:function(){
    var token = wx.getStorageSync(TOKEN_KEY);
    if (!token) {
      wx.login({
        success: res => {
          if (res.code) {
            let params = {
              code: res.code
            }
            console.log(params)
            wx.getSetting({
              success: function (res) {
                if (res.authSetting['scope.userInfo'] === true) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                    success: function (res) {
                      params.nickName = res.userInfo.nickName;
                      params.avatarUrl = res.userInfo.avatarUrl;
                      params.province = res.userInfo.province;
                      params.city = res.userInfo.city;
                      params.country = res.userInfo.country;
                      params.gender = res.userInfo.gender;
                      Api.getOpenId(params).then((res) => {
                        wx.hideToast();
                        res = res.data;
                        if (res.res == 0) {
                          token = res.data.token
                          wx.setStorageSync(TOKEN_KEY, token);
                        } else {
                          wx.showToast({
                            title: '',
                            icon: '',
                            duration: 1200,
                            mask: true
                          })
                        }
                      })

                    }
                  })
                } else {

                }
              }

            })

          }
        }
      })
    }
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
