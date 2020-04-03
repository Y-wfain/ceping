// pages/me/index.js
var app=getApp();
var httpUtils = require('../../js/httpUtils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)
  },
  getuser: function (e) {
    var that = this
    var url = app.globalData.url + '/cp/user/getUserInfo';
    console.log(url)
      var data = {
        // code: res.code,
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        that.setData({
          user_in:res.data.user,
          mobile: res.data.user.mobile
        })
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
  },
  cepingbind:function(e){
    wx.navigateTo({
      url: '../me-code/index'
    })
  },
  phone_user: function (e) {
    if (!this.data.mobile) {
      this.setData({
        isSiuser: true
      })
    } else {
      wx.showToast({
        title: '您已经绑定过手机号',
        icon: 'none'
      })
    }

  },
  ggopfn: function (e) {
    this.setData({
      isSiuser: false
    })
  },
  listprend:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../me-Presentation/index'
    })
  },
  listbartapskan:function(e){
    wx.navigateTo({
      url: '../me-Bargainkan/index'
    })
  },
  listbartap:function(e){
    wx.navigateTo({
      url: '../me-Bargain/index'
    })
  },
  caretbind:function(e){
    wx.navigateTo({
      url: '../me-Cause/index'
    })
  },
  meuser:function(e){
    wx.navigateTo({
      url: '../me-user/index'
    })
  },
  sharped:function(e){
    wx.navigateTo({
      url: '../me-personalshark/index'
    })
  },
  cepfn: function (e) {
    wx.redirectTo({
      url: '../evaluation/index',
    })
  },

  indexFn: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  getPhoneNumber: function (e) { //点击获取手机号码按钮
    var that = this;
    wx.checkSession({
      success: function () {
        console.log(e)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionk = that.data.sessionKey;
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          that.setData({
            modalstatus: true
          });
        } else { //同意授权
          let url = app.globalData.url + '/api/User/getphone';
          console.log(url)
          let data = {
            encry: ency,
            iv: iv,
            sessionKey: that.data.session_key
          };
          console.log(data)
          app.wxRequest('POST', url, data, (res) => {
            wx.showLoading({
              title: '加载中'
            })
            console.log(res)
            if (res.code == 1) {
              wx.showToast({
                title: '获取成功',
              })
              that.setData({
                mobile: res.data.phone.phoneNumber
              })
              that.setData({
                isSiuser: false,
              })
              wx.hideLoading()
              let url = app.globalData.url + '/api/User/editUser';
              console.log(url)
              let data = {
                user_id: app.globalData.user_id,
                mobile: res.data.phone.phoneNumber,
              };
              console.log(data)
              app.wxRequest('POST', url, data, (res) => {
                console.log(res)
                if (res.code == 1) {

                }
              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
                console.log(err.errMsg)
              })
            } else {
              that.setData({
                isSiuser: true,
              })
              wx.showToast({
                title: '获取失败',
                icon: 'none'
              })
            }
            that.setData({
              phoneNumber: res.data.phone.phoneNumber
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程");
        that.wxlogin(); //重新登录
      }
    });
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
    this.getuser()
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