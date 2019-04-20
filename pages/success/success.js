import {
  HIDE_FOR_AD
} from '../../utils/config/config.js'
import Dialog from '../../dist/dialog/dialog'
import Api from '/../../utils/config/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  cash() {
    Dialog.alert({
      title: '提现失败',
      message: '已浇水N天，还需364天才可以提现，记得每天来浇水哟~',
      confirmButtonText: '知道啦'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Api.finish()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.setStorageSync(HIDE_FOR_AD, false)
    return {
      title: "天天浇水",
      path: "/pages/index/index?user_id=" + wx.getStorageSync(USER_ID)
    }
  }
})