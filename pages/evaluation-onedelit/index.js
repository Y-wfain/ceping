// pages/evaluation-Explain/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrar:[
      {
        title:'一',
        txt:'本套共162个问题，填答的方式是，对每个题目中所列举的事情是否符合你的情形，你必须做出选择回答：完全符合用“5”表示，比较符合用“4”表示，一般用“3”表示，不太符合 用“2”表示，完全不符合用“1”表示。'
      },
      {
        title: '二',
        txt: '本测试分两部分，答题方式相同，各42题。每道题都呈现两个职业或活动，让你比较回答哪个对你更具有吸引力。如果该题其中一种职业或活动你喜欢它远胜于另一职业或活动，你可以给它三分，给另一项零分；如果你不太确定是否喜欢，可以给它二分，给另一项一分。总之只要记住两个原则：一、较喜欢的职业或活动给较多的分；二、两个选项的总分一定是三分。<br/>例题一：<br/>翻译人员   <span style="color:red">3</span>   <br/>  园艺家 	<span style="color:red">0</span> <br/>  下面例题的回答，则显示答题者较难决定何种活动较为偏好，所以用以下的配分方式：<br/>例题二：<br/> 电影院经理   <span style="color:red">1</span> <br/>使用公式进行工作  	<span style="color:red">2</span>'
      },
      {
        title: '三',
        txt: ' 本套共90道题，下面的问题采用“七级量表法”，用“1、2、3、4、5、6、7”数字表示，越靠近数字“1“表示越不符合你，越靠近数字“7“表示越符合你，“4”表示中间状态，务必根据自己实际情况客观回答。<br/>非常不符合1    2     3     4     5     6     7非常符合'
      },
      {
        title: '四',
        txt: '这是最后一套题，共187题。下面每个问题，都有三个答案供你选择。 注意：本测试除了有关表示你态度方面的题目，还有一些题目要求你必须正确回答。例题：<br/>1、我所喜欢的人大都是：<br/>A.拘谨缄默的   　B.　介于A.与C.之间　   C.　善于交际的。<br/>2、“女人”与“儿童”，犹如“猫”与：<br/>A.　小猫  　B.　狗  　C.　男童。<br/>第2题的正确答复当为“小猫”。<br/>如果明白了，就可以开始回答。'
      },
    ],
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth,
    
    })
    if(options.id){
      this.setData({
        id: options.id - 1
      })
    }
    console.log(this.data.id)
    // this.setData({
    //   title_txt:this.data.arrar
    // })
  },
  godati:function(e){
    wx.redirectTo({
      url: '../evaluation-dati/index?id=' + parseInt(this.data.id  +1) ,
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