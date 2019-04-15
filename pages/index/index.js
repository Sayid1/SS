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
    animationAuth: '',
    animationAmount: '',
    animationKettle: '',
    animationRaindrop: '',
    userInfo: {},
    hasUserInfo: false,
    showModal: true,
  },
  //事件处理函数
  watering: function () {
    var animationKettle = wx.createAnimation({
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50%",
    })
    var animationRaindrop = wx.createAnimation({
      timingFunction: "ease",
      // delay: 1500,
    })

    //设置动画
    animationKettle.translateY(-130).step({
      duration: 500
    })
    animationKettle.translateX(-70).rotate(-45).step({
      duration: 1000
    })
    animationKettle.translateX(100).step({
      delay: 900,
      duration: 600
    })
    animationKettle.opacity(0).step({
      duration: 20
    })
    animationKettle.translateX(0).translateY(0).rotate(0).opacity(1).step({
      duration: 500
    })
    animationRaindrop.opacity(1).step({
      delay: 1500,
      duration: 200
    })
    animationRaindrop.opacity(0).step({
      duration: 200
    })
    animationRaindrop.opacity(1).step({
      duration: 200
    })
    animationRaindrop.opacity(0).step({
      duration: 200
    })
    //导出动画数据传递给组件的animation属性。
    this.setData({
      animationKettle: animationKettle.export(),
      animationRaindrop: animationRaindrop.export()
    })
  },
  authorize() {
    this.setData({
      animationAuth: wx.createAnimation().scale(0).step({
        duration: 300
      }).export(),
      animationAmount: wx.createAnimation().scale(1).translate('-50%', '-50%').step({
        delay: 350,
        duration: 100
      }).export(),
    })

  },
  closeModal() {
    this.setData({
      showModal: false,
      animationAmount: wx.createAnimation().scale(0).step({
        duration: 100
      }).export(),
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  bindGetUserInfo: function () {
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
})