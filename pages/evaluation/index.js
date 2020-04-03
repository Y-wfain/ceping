// pages/evaluation/index.js
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
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })
    console.log(this.data.height)
    // var that = this
    // var url = app.globalData.url + '/cp/test/checkExist';
    // console.log(url)

    // var data = {
     
    // }
    // app.wxRequest('POST', url, data, (res_data) => {
    //   console.log(res_data)
    //   if (res_data.code == 0) {
    //     if (res_data.data.test_code || res_data.data.test_code!=""){
    //       that.setData({
    //         test_code: res_data.data.test_code
    //       })
          
    //       wx.showModal({
    //         title: '提示',
    //         content: '您有未完成的测评,是否继续答题?',
    //         success(res) {
    //           if (res.cancel) {
    //             // 用户点击了取消属性的按钮，对应选择了'女'

    //           } else if (res.confirm) {
    //             // 用户点击了确定属性的按钮，对应选择了'男'
    //             var url = app.globalData.url + '/cp/test/continueTest';
               
    //             var data = {
    //               testCode: res_data.data.test_code
    //             }
    //             console.log(data)
    //             // console.log(res_data.data.test_code)
    //             // console.log(that.data.test_code)
    //             app.wxRequest('POST', url, data, (res) => {
    //               console.log(res)
    //               if (res.code == 0) {
    //                 wx.navigateTo({
    //                   // url: '../evaluation-delit/index',
    //                   url: '../evaluation-dati/index?quesNo=' + res.data.quesNo + '&stem=' + res.data.stem + '&opA=' + res.data.opA + '&opB=' + res.data.opB + '&opC=' + res.data.opC + '&qucode_id=1' + '&testCode=' + res_data.data.test_code   ,
    //                 })
    //               } else {
    //                 wx.showToast({
    //                   title: '提交失败',
    //                   icon: 'none'
    //                 })
    //               }
    //             }, (err) => {
    //               wx.showToast({
    //                 title: '提交失败',
    //               })
    //               console.log(err.errMsg)
    //             })
    //           }
    //         }
    //       })
    //     }else{
    //       that.setData({
    //         test_code: 0
    //       })
    //     }
      
    //   } else {
    //     wx.showToast({
    //       title: '提交失败',
    //       icon: 'none'
    //     })
    //   }
    // }, (err) => {
    //   wx.showToast({
    //     title: '提交失败',
    //   })
    //   console.log(err.errMsg)
    // })
    // })
  },
  goshop: function (e) {
    wx.navigateTo({
      // url: '../evaluationshop/index',
      url: '../shopdelit/index',

    })
  },
  indexFn: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  meFn: function (e) {
    wx.redirectTo({
      url: '../me/index',
    })
  },
  cepinbind: function (e) {
    var that = this
    if (that.data.test_code || that.data.test_code != ""){
      wx.showModal({
        title: '提示',
        content: '您有未完成的测评,是否继续答题?',
        success(res) {
          if (res.cancel) {
            // 用户点击了取消属性的按钮，对应选择了'女'

          } else if (res.confirm) {
            // 用户点击了确定属性的按钮，对应选择了'男'
            var url = app.globalData.url + '/cp/test/continueTest';

            var data = {
              testCode: that.data.test_code
            }
            wx.setStorageSync('evaluation_code',that.data.test_code)
            app.wxRequest('POST', url, data, (res) => {
              console.log(res)
              if (res.code == 0) {
                wx.navigateTo({
                  url: '../evaluation-dati/index?quesNo=' + res.data.quesNo + '&stem=' + res.data.stem + '&opA=' + res.data.opA + '&opB=' + res.data.opB + '&opC=' + res.data.opC + '&qucode_id=1' + '&testCode=' + that.data.test_code,
                })
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
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../evaluation-Explaindelituser/index',
        // url: '../evaluation-Explain/index',
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('设置选中项 0')
      this.getTabBar().setData({
        selected: 1
      })
    }
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500
    })
    var that = this
    var url = app.globalData.url + '/cp/test/checkExist';
    console.log(url)

    var data = {

    }
    app.wxRequest('POST', url, data, (res_data) => {
      console.log(res_data)
      wx.setStorageSync('evaluation_code', res_data.data.test_code)
      if (res_data.code == 0) {
        if (res_data.data.test_code || res_data.data.test_code != "") {
          that.setData({
            test_code: res_data.data.test_code
          })

          wx.showModal({
            title: '提示',
            content: '您有未完成的测评,是否继续答题?',
            success(res) {
              if (res.cancel) {
                // 用户点击了取消属性的按钮，对应选择了'女'

              } else if (res.confirm) {
                // 用户点击了确定属性的按钮，对应选择了'男'
                var url = app.globalData.url + '/cp/test/continueTest';

                var data = {
                  testCode: res_data.data.test_code
                }
                console.log(data)
                // console.log(res_data.data.test_code)
                // console.log(that.data.test_code)
                app.wxRequest('POST', url, data, (res) => {
                  console.log(res)
                  if (res.code == 0) {

                    wx.navigateTo({
                      // url: '../evaluation-delit/index',
                      url: '../evaluation-dati/index?quesNo=' + res.data.quesNo + '&stem=' + res.data.stem + '&opA=' + res.data.opA + '&opB=' + res.data.opB + '&opC=' + res.data.opC + '&qucode_id=1' + '&testCode=' + res_data.data.test_code,
                    })
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
              }
            }
          })
        } else {
          that.setData({
            test_code: 0
          })
        }

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