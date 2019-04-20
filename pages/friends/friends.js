import {
  HIDE_FOR_AD
} from '../../utils/config/config.js'
import Api from '/../../utils/config/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let d
    Api.inviteList().then(res => {
      let list = res.data.data.inviters || []
      list = list.map(item => {
        d = new Date(Number(item.create_time) * 1000)
        item.create_time = d.getFullYear() + '/' + ('' + (d.getMonth() + 1)).padStart(2, 0) + '/' + ('' + d.getDate()).padStart(2, 0) + ' ' + ('' + d.getHours()).padStart(2, 0) + ':' + ('' + d.getMinutes()).padStart(2, 0)
        return item
      })
      this.setData({ list })
    })
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
      path: "/pages/index/index?user_id=" + wx.getStorageSync(USER_ID)
    }
  }
})