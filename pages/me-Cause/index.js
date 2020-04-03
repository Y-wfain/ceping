// pages/me-Cause/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:1,
    pickerProData: {
      index: 0,
      items: ['请选择', '   男   ', '   女   ']
    },
    region: "",
    status:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  tixianFn:function(e){
    if (e.currentTarget.dataset.status==1){
      wx.showToast({
        title: '提现时间为每个月15号开放',
        icon:'none'
      })
    }
    

  },
  bdyhkFn:function(e){
    wx.navigateTo({
      url: '../me-Causebank/index',
    })
  },
  mekehu:function(e){
    wx.showToast({
      title: '暂未开放',
      icon:'none',
    })
  },
  pickerProChange: function (e) {
    this.setData({
      'pickerProData.index': e.detail.value
    })
    var that = this;
    console.log(that.data.pickerProData.index)
    console.log(that.data.pickerProData.items[that.data.pickerProData.index])

  },
  bindRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  fenxiaobind:function(e){
    wx.navigateTo({
      url:'../me-Causedistribution/index'
    })
  },
  commission:function(e){
    console.log(1)
    wx.navigateTo({
      url: '../me-Causecommission/index',
    })
  },
  sharebind:function(e){
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