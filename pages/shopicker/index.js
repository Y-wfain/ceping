// pages/shopicker/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nums:1,
    pick:56,
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.picker()
  },
  inpnum:function(e){
    // console.log(e)
    this.setData({
      nums: e.detail.value
    })
    if(this.data.nums <=1){
      wx.showToast({
        title: '下单数量不能小于1',
        icon: 'none'
      })
      // this.setData({
      //   nums:1      
      // })
    }
    if (this.data.nums >=10000){
      wx.showToast({
        title: '单次下单数量不能大于9999',
        icon: 'none'
      })
      this.setData({
        nums: 1
      })
    }
    this.picker()

  },
  jieFn:function(e){
    var statnum = this.data.nums;
    
    if (statnum <=1){
      statnum = 1;
      this.setData({
        nums: statnum
      })
      wx.showToast({
        title: '下单数量不能小于1',
        icon:'none'
      })
      this.picker()
    }else{
      statnum--;
      this.setData({
        nums: statnum
      })
      this.picker()
    }
  },
  jiaFn:function(e){
    var statnum = this.data.nums;
    statnum ++;
    this.setData({
      nums: statnum
    })
    
    if (this.data.nums >= 10000) {
      wx.showToast({
        title: '单次下单数量不能大于9999',
        icon: 'none'
      })
      this.setData({
        nums:1
      })
    }
    this.picker()
  },
  picker:function(e){
    var _pick = this.data.pick//获取系统单价
    var _num = this.data.nums//获取实时数量
    var _count = _pick * _num//总金额
    console.log(_count)
    this.setData({
      count: _count
    })
    var that = this
    var url = app.globalData.url + '/cp/shop/getPrice';

    var data = {
      amount: this.data.nums
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {

      } else {
        wx.showToast({
          title: '提交失败',
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
    // this.onLoad()
    // this.onShow()
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