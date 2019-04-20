import Dialog from '../../dist/dialog/dialog'
import {
  USER_ID,
  HIDE_FOR_AD
} from '../../utils/config/config.js'

const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  cash() {
    Dialog.alert({
      title: '提现失败',
      message: '已浇水N天，还需364天才可以提现，记得每天来浇水哟~',
      confirmButtonText: '知道啦'
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
