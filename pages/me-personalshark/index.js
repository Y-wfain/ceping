// pages/me-personalshark/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  cepingbind:function(e){
    // 我的奖金
    // wx.navigateTo({
    //   url: '../me-bonus/index',
    // })
    wx.showToast({
      title: '暂未开放',
      icon:'none'
    })
  },
  tixianFn: function (e) {
    if (e.currentTarget.dataset.status == 1) {
      wx.showToast({
        title: '提现时间为每个月15号开放',
        icon: 'none'
      })
    }


  },
  listprend:function(e){
    wx.navigateTo({
      url: '../me-bonusDetailed/index',
    })
  },
  listbartap:function(e){
    wx.navigateTo({
      url: '../me-Record/index',
    })
  },
  caretbind:function(e){
    wx.navigateTo({
      url: '../me-Causeshare/index',
    })
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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    this.onLoad()
    this.onShow()
    wx.stopPullDownRefresh();
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

  }
})