// pages/kanjia/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdown: {
      day: '',
      hour: '',
      minute: '',
      second: ''
    },
    code_id:2,// 等于1是自己砍价 2是展示他人砍价
    tid:1,
    is_timestatus: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  sunbtn:function(e){
    console.log(e)
    this.setData({
      tid: e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.startCountdown()//倒计时调用
  },
  startCountdown: function (endTime) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var serverTime = timestamp / 1000;
    console.log(serverTime)
    var endTime = that.data.stat_time
    console.log(timestamp)
    console.log(endTime)
    // var millisecond = (endTime - serverTime) * 1000;
    var millisecond = 100000;
    console.log(millisecond)
    var interval = setInterval(function () {
      // console.log('循环中');
      millisecond -= 1000;
      if (millisecond <= 0) {
        clearInterval(interval);
        that.setData({
          countdown: {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
          },
          is_timestatus: false
        });
        return;
      }
      that.transformRemainTime(millisecond);
    }, 1000);
  },
  // 剩余时间(毫秒)处理转换时间
  transformRemainTime: function (millisecond) {
    var that = this;
    var countdownObj = that.data.countdown;
    // 秒数
    var seconds = Math.floor(millisecond / 1000);
    // 天数
    countdownObj.day = that.formatTime(Math.floor(seconds / 3600 / 24));
    // 小时
    countdownObj.hour = that.formatTime(Math.floor(seconds / 3600 % 24));
    // 分钟
    countdownObj.minute = that.formatTime(Math.floor(seconds / 60 % 60));
    // 秒
    countdownObj.second = that.formatTime(Math.floor(seconds % 60));
    that.setData({
      countdown: countdownObj
    });
  },
  //格式化时间为2位
  formatTime: function (time) {
    if (time < 10)
      return '0' + time;
    return time;
  },
  code_Gouser:function(e){
    wx.showToast({
      title: '砍价成功',
    })
  },
  me_Kuser:function(e){
    wx.redirectTo({
      url: '../shopdelit/index',
    })
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