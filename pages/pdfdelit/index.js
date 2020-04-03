// pages/pdfdelit/index.js
var app = getApp();
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
    var that = this;
    if (options.pdf){
     
      that.setData({
        pdf:options.pdf
      })
      wx.showLoading({
        title: 'pdf生成中...',
      })
      setTimeout(function () {
            wx.downloadFile({
              url:options.pdf ,
              success: function (res) {
                console.log(res)
                var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
                wx.openDocument({
                  filePath: Path,
                  success: function (res) {
                    console.log('打开成功');
                    wx.hideLoading()
                  },
                  fail: function (res) {
                    console.log("fail");
                    console.log(res)
                  },
                  complete: function (res) {
                    console.log("complete");
                    console.log(res)
                  }
                })
              },
              fail: function (res) {
                console.log(res);
              }
            })
         
      },5000)
      return
    }
    this.setData({
      testCode: options.testCode
    })
    wx.showLoading({
      title: 'pdf生成中...',
    })
    setTimeout(function(){
      var url = app.globalData.url + '/cp/pdf/list'

      var data = {
        // testCode: options.testCode
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        var num = res.data.list.length-1
        console.log(num)
        if (res.code == 0) {
          that.setData({
            pdf: res.data.list[num].path
          })
          wx.downloadFile({
            url: res.data.list[num].path,
            success: function (res) {
              console.log(res)
              var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
              wx.openDocument({
                filePath: Path,
                success: function (res) {
                  console.log('打开成功');
                  wx.hideLoading()
                },  
                fail: function (res) {
                  console.log("fail");
                  console.log(res)
                },
                complete: function (res) {
                  console.log("complete");
                  console.log(res)
                }
              })
            },
            fail: function (res) {
              console.log(res);
            }
          })
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
    },10000)
  },
  btn_web:function(e){
    wx.showToast({
      title: '复制成功',
    })
    var that = this
    wx.setClipboardData({
      data: that.data.pdf,
      success: function (res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  btn:function(e){
    var that = this
    wx.showLoading({
      title: 'pdf生成中...',
    })
    console.log(that.data.pdf)
    console.log(e.currentTarget.dataset.pdf)
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
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "心智栋梁专业权威",    // 默认是小程序的名称(可以写slogan等)
      path: '/pages/pdfdelit/index?pdf=' + that.data.pdf ,    // 默认是当前页面，必须是以‘/'开头的完整路径
      imageUrl: '',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
    }
  }
})