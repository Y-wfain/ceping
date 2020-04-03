// pages/me-Presentation/index.js
var app = getApp()
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
    var that = this
    var url = app.globalData.url + '/cp/pdf/list'

    var data = {
      // testCode: options.testCode
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.data.list.length > 0) {
        var num = res.data.list.length - 1
        console.log(num)
        if (res.code == 0) {
          that.setData({
            list: res.data.list
          })

        } else {
          wx.showToast({
            title: '失败',
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: '暂无数据',
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
  copy: function (e) {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: e.currentTarget.dataset.pdf,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  btn: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.downloadFile({
      url: e.currentTarget.dataset.pdf,
      success: function (res) {
        console.log(res)
        var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
        wx.openDocument({
          filePath: Path,
          success: function (res) {
            wx.hideLoading()
            console.log('打开成功');
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
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