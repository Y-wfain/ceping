// pages/me-codedelit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // dataop:'erkhuuru',
    ridos: '1',
    select_all: false,
    listData: [{
      code: 'ZZBY201903231110'
    },
    {
      code: 'ZZBY201903236510'
    },
    {
      code: 'ZZBY201903255510'
    },
    {
      code: 'ZZBY201903852969'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  riods: function (e) {
    // console.log('1')
    this.setData({
      ridos: '1'
    })
    console.log(this.data.ridos)
  },
  selectall: function (e) {

    this.setData({
      ridos: '2'
    })
    console.log(this.data.ridos)
    var that = this;
    var arr = []; //存放选中id的数组
    for (let i = 0; i < that.data.listData.length; i++) {

      that.data.listData[i].checked = (!that.data.select_all)

      if (that.data.listData[i].checked == true) {
        // 全选获取选中的值
        arr = arr.concat(that.data.listData[i].code);
      }
    }
    console.log(arr)
    that.setData({
      listData: that.data.listData,
      select_all: (!that.data.select_all),
      batchIds: arr
    })
    console.log(this.data.batchIds)
  },
  checkboxChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      batchIds: e.detail.value //单个选中的值
    })
    console.log(this.data.batchIds)
  },
  goclick: function (e) {
    console.log(e)
    this.setData({
      codeid: e
    })
  },
  copyText: function (e) {

    if (!this.data.batchIds || this.data.batchIds == [] || this.data.batchIds == "undefined" || this.data.batchIds == undefined || this.data.batchIds == false || this.data.batchIds == "false") {
      wx.showToast({
        title: '请选择复制内容',
        icon:'none'
      })

    } else {
      console.log(this.data.batchIds)
      var that = this
      var code_all = this.data.batchIds.join('、')
      console.log(code_all)
      wx.setClipboardData({
        data: code_all,
        success: function (res) {
          console.log(res)
         wx.showToast({
           title: '复制成功',
           icon:'none'
         })
        }
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