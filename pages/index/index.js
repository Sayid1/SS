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
    authed: false,
    showPacket: false,
    showMask: false,
    taskDialog: false
  },
  //事件处理函数
  watering: function () {
    var animationKettle = wx.createAnimation({
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50%",
    })
    var animationRaindrop = wx.createAnimation({
      timingFunction: "ease"
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
    setTimeout(() => {
      this.setData({
        taskDialog: true,
      })
    }, 3500)
  },
  animationend() {
    console.log('emd')
    this.setData({
      taskDialog: true,
    })
  },
  onLoad() {
    // 任务实例
    // Api.task({}).then((res) => {
    //   wx.hideToast();
    //   res = res.data;
    //   console.log(res);
    // })
    // var token = wx.getStorageSync(TOKEN_KEY);
    // if (!token) {
    //   this.setData({
    //     showPacket: true,
    //     showMask: true,
    //   })
    // }
  },
  toRule() {
    wx.navigateTo({
      url: '/pages/rule/rule',
    })
  },
  authorize() {
    this.setData({
      showPacket: false,
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
      showMask: false,
      animationAmount: wx.createAnimation().scale(0).step({
        duration: 100
      }).export(),
    })
  },
  bindGetUserInfo: function () {
    var _this = this
    var token = wx.getStorageSync(TOKEN_KEY);
    if (!token) {
      wx.login({
        success: res => {
          if (res.code) {
            let params = {
              code: res.code
            }
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
                          _this.authorize()
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
                }
              }
            })
          }
        }
      })
    }
  },
})