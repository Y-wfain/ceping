// pages/me-Bargain/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = app.globalData.url + '/cp/order/myList'
    var data = {

    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {
        if (res.data.all.length < 1) {
          wx.showToast({
            title: '暂无数据',
            icon: 'none'
          })
        } else {
          that.setData({
            list: res.data.all,
            // paid: res.data.paid,
            // unPay: res.data.unPay
          })
        }
      } else {
        wx.showToast({
          title: '失败',
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
  lookcp: function (e) {
    wx.navigateTo({
      url: '../me-codedelit/index',
    })
  },
  clickFn: function (e) {
    this.setData({
      classid: e.currentTarget.dataset.id
    })
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.classid == 1) {
      var that = this
      var url = app.globalData.url + '/cp/order/myList'
      var data = {

      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.code == 0) {
          if (res.data.all.length < 1) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          } else {
            that.setData({
              list: res.data.all,
              // paid: res.data.paid,
              // unPay: res.data.unPay
            })
          }
        } else {
          wx.showToast({
            title: '失败',
            icon: 'none'
          })
        }
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }
    if (this.data.classid == 2) {
      var that = this
      var url = app.globalData.url + '/cp/order/myList'
      var data = {

      }
      app.wxRequest('POST', url, data, (res) => {
        wx.hideLoading()
        console.log(res)
        if (res.code == 0) {
          if (res.data.paid.length < 1) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          } else {
            that.setData({
              // all: res.data.all,
              list: res.data.paid,
              // unPay: res.data.unPay
            })
          }
        } else {
          wx.showToast({
            title: '失败',
            icon: 'none'
          })
        }
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }
    if (this.data.classid == 3) {
      var that = this
      var url = app.globalData.url + '/cp/order/myList'
      var data = {

      }
      app.wxRequest('POST', url, data, (res) => {
        wx.hideLoading()
        console.log(res)
        if (res.code == 0) {
          if (res.data.unPay.length < 1) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          } else {
            that.setData({
              // all: res.data.all,
              // paid: res.data.paid,
              list: res.data.unPay
            })
          }
        } else {
          wx.showToast({
            title: '失败',
            icon: 'none'
          })
        }
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }

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