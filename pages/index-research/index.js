// pages/index-research/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid:1,
    book: [
      {
        img: '../../image/6bcc86787674282a0215c3cc6a66674@2x.png',
        id: 1
      },
      {
        img: '../../image/6bcc86787674282a0215c3cc6a66674@2x.png',
        id: 2
      },
      {
        img: '../../image/6bcc86787674282a0215c3cc6a66674@2x.png',
        id: 3
      },
      {
        img: '../../image/6bcc86787674282a0215c3cc6a66674@2x.png',
        id: 4
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clickFn:function(e){
    this.setData({
     iid: e.currentTarget.dataset.id
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
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500
    })
    var that = this
    // this.onLoad()
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