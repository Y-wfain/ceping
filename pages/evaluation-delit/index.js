// pages/evaluation-delit/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluation_code:'123456',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inpval:function(e){
    console.log(e)
    this.setData({
      val_inp: e.detail.value
    })
  },
  scre_code:function(e){
    wx.navigateTo({
      url: '../shopdelit/index',
    })
  },
  explainFn:function(e){
    wx.navigateTo({
      url: '../evaluation-Explain/index',
    })
  },
  submit:function(e){
    var that =this
    var url = app.globalData.url + '/cp/test/startTest';
    var data = {
      testCode: this.data.val_inp
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {
        wx.showLoading({
          title: '测评码纠验中',
        })
        wx.setStorageSync('evaluation_code', that.data.val_inp);
        wx.redirectTo({
          url: '../evaluation-onedelit/index?id=1',
        })
          // url: '../evaluation-Explaindelituser/index'
        
        wx.hideLoading()
      } else {
        wx.showToast({
          title: '测评码不正确',
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
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
    this.onLoad()
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