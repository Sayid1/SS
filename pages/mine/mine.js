import Dialog from '../../dist/dialog/dialog'
import {
  USER_ID,
  HIDE_FOR_AD
} from '../../utils/config/config.js'
import Api from '/../../utils/config/api.js'

const app = getApp()

Page({
  data: {
    userInfo: {},
    watered: false
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  tixian: function() {
    wx.showModal({
      title: '温馨提示',
      content: '可提现金额为0,请先去浇水获取奖励',
    })
  },
  onShow() {
    Api.isWaterToday().then(res => {
      this.setData({
        watered: res.data.data.isWater
      })

    })
  },

  benefits(e) {
    const num = e.target.dataset.num
    Dialog.alert({
      title: '领取失败',
      message: `此福利需邀请${num}人才可领取`,
      confirmButtonText: '去邀请',
      cancelButtonText: '知道了',
      showCancelButton: true,
      confirmButtonOpenType: 'share'
    })
  },
  onShareAppMessage() {
    wx.setStorageSync(HIDE_FOR_AD, false)
    return {
      title: "天天浇水",
      path: "/pages/index/index?user_id=" + wx.getStorageSync(USER_ID)
    }
  }
})