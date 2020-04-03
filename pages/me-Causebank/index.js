// pages/me-Causebank/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerProData: {
      index: 0,
      items: ['请选择', '   支付宝   ', '  银行卡   ']
    },
    isShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pickerProChange: function (e) {
    this.setData({
      'pickerProData.index': e.detail.value
    })
    var that = this;
    console.log(that.data.pickerProData.index)
    console.log(that.data.pickerProData.items[that.data.pickerProData.index])

  },
  delet:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除么？',
      success(res) {
        if (res.cancel) {
          // 用户点击了取消属性的按钮，对应选择了'女'

        } else if (res.confirm) {
          // 用户点击了确定属性的按钮，对应选择了'男'
          wx.showToast({
            title: '删除成功'
          })
          that.onLoad()
         
        }
      }
    })
  },
  clickaddFn:function(e){
    this.setData({
      isShow:true
    })
  },
  gunabiShow:function(e){
    this.setData({
      isShow: false
    })
  },
  sub_btn:function(e){
    this.setData({
      isShow:false
    })
    wx.showToast({
      title: '保存成功',
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

  }
})