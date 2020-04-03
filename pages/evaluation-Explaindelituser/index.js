// pages/me-user/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerProData: {
      index: 0,
      items: ['请选择', '   男   ', '   女   ']
    },
    pickerProDatanum: {
      index: 0,
      items: [ '请选择', '   16岁以下   ', '   17岁   ', '   18岁   ', '   19岁以上   ' ]
    },
    region: "",
    usernum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  nameuser:function(e){
    console.log(e.detail.value)
    this.setData({
      username:e.detail.value
    })
  },
  agefn:function(e){
    this.setData({
      niannum:e.detail.value
    })
  },
  phone:function(e){
    this.setData({
      userphone: e.detail.value
    })
  },
  addFn:function(e){
    this.setData({
      usershcool: e.detail.value
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
  pickerProChangenum: function (e) {
    console.log(e.detail.value)
    if (e.detail.value==0){
      this.setData({
        'pickerProDatanum.index': e.detail.value,
        usernum:0
      })
    }
    if (e.detail.value == 1){
      this.setData({
        'pickerProDatanum.index': e.detail.value ,
        usernum: 16
      })
    }
    if (e.detail.value == 2) {
      this.setData({
        'pickerProDatanum.index': e.detail.value,
        usernum: 17
      })
    }
    if (e.detail.value == 3) {
      this.setData({
        'pickerProDatanum.index': e.detail.value,
        usernum: 18
      })
    }
    if (e.detail.value == 4) {
      this.setData({
        'pickerProDatanum.index': e.detail.value,
        usernum: 19
      })
    }
    
    var that = this;
    console.log(that.data.pickerProDatanum.index)
    console.log(that.data.pickerProDatanum.items[that.data.pickerProDatanum.index])

  },
  bindRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      areaCode:e.detail.code[2]
    })
  },
  submit: function (e) {
    if (!this.data.username) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
      return
    }
    if (this.data.usernum==0) {
      wx.showToast({
        title: '年龄不能为空',
        icon: 'none'
      })
      return
    }
    console.log(this.data.pickerProData.index)
    if (this.data.pickerProData.index == 0) {
      wx.showToast({
        title: '性别不能为空',
        icon: 'none'
      })
      return
    }
    if (!this.data.region) {
      wx.showToast({
        title: '地址不能为空',
        icon: 'none'
      })
      return
    }
    if (!this.data.userphone) {
      wx.showToast({
        title: '电话不能为空',
        icon: 'none'
      })
      return
    }
    
 
    if (!this.data.usershcool) {
      wx.showToast({
        title: '学校不能为空',
        icon: 'none'
      })
      return
    }
    if (this.data.niannum < 16 || this.data.niannum>19){
      wx.showToast({
        title: '年龄为16-19岁之间（包含16、19）',
        icon: 'none'
      })
      return
    }
    var that = this
    var url = app.globalData.url + '/cp/user/editUserInfo';
    console.log(url)
    // var wxlogin = httpUtils.httpPromise(wx.login);
    // wxlogin().then(function (res) {
    if (that.data.sexname) {
      var sexName_user = that.data.sexname
    } else {
      var sexName_user = this.data.pickerProData.items[that.data.pickerProData.index]
    }
    var data = {

      name: this.data.username,
      sex: sexName_user,
      age: this.data.usernum,
      school: this.data.usershcool,
      mobile: this.data.userphone,
      province: this.data.region[0],
      city: this.data.region[1],
      area: this.data.region[2],
      areaCode: String(this.data.areaCode)

    }
    console.log(2)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
        wx.redirectTo({
          url: '../evaluation-Explain/index',

          
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
    // })
   
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