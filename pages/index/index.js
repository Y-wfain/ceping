var app = getApp()
var httpUtils = require('../../js/httpUtils.js');
// var Map = require('../../js/qqmap-wx-jssdk');
// var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
// Component({
//   pageLifetimes: {
//     show() {
//       if (typeof this.getTabBar === 'function' &&
//         this.getTabBar()) {
//         this.getTabBar().setData({
//           selected: 0
//         })
//       }
//     }
//   }
// })

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    img: [{
      imgs: 'http://47.94.12.97:8099/img/338e8f0f9528bb3514b235ef8e554f0.png',
      id: 1
    },
    {
      imgs: 'http://47.94.12.97:8099/img/a2ae0d6b4b06777a7c6f00cbfe5f458.png',
      id: 1
    },

    ],
    nav_cont: [
      //   {
      //   imgcont: '../../image/chubanshuji@2x.png',
      //   txt: '出版书籍',
      //   id: 1
      // },
      {
        imgcont: '../../image/chubanshuji@2x.png',
        txt: '发展历程',
        id: 1
      },
      {
        imgcont: '../../image/keyanyuandi@2x.png',
        txt: '科研园地',
        id: 2
      },
      // {
      //   imgcont: '../../image/shengyashiping@2x.png',
      //   txt: '生涯视频',
      //   id: 3
      // },
      {
        imgcont: '../../image/76d212f82fdeeac2debf5f721497d19.png',
        txt: '专家寄语',
        id: 3
      },
      {
        imgcont: '../../image/kaohenglaiixn@2x.png',
        txt: '考生来信',
        id: 4
      },
      {
        imgcont: '../../image/hezuohuoban@2x.png',
        txt: '合作伙伴',
        id: 5
      },
      {
        imgcont: '../../image/meiti.png',
        txt: '媒体视频',
        id: 6
      },
      {
        imgcont: '../../image/xiangmujianjie@2x.png',
        txt: '项目简介',
        id: 7
      },
      {
        imgcont: '../../image/guanyuwomen@2x.png',
        txt: '关于我们',
        id: 8
      },
    ],
    bac: [{
      img: '../../image/93458bd6fcba69ea215c3ee0b0cbc25.png',
      id: 1
    },
    {
      img: '../../image/7676d69564e918427f0c7b5d2be89e7.png',
      id: 2
    },
    {
      img: '../../image/93458bd6fcba69ea215c3ee0b0cbc25.png',
      id: 1
    },
    {
      img: '../../image/7676d69564e918427f0c7b5d2be89e7.png',
      id: 2
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1q1')
    var that = this;
    setTimeout(function () {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false,
          isUser: false
        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isUser: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          isUser: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.MyUserInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            isUser: true
          })
        }
      })
    }
  },
  zizhiFn: function (e) {
    wx.navigateTo({
      url: '../indexzizhi/index',
    })
  },
  cctvfn: function (e) {
    wx.navigateTo({
      url: '../indexcctv/index',
    })
  },
  cepfn: function (e) {
    wx.redirectTo({
      url: '../evaluation/index',
    })
  },
  meFn: function (e) {
    wx.redirectTo({
      url: '../me/index',
    })
  },
  mjbind: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../index-person/index?id=' + e.currentTarget.dataset.id
    })
  },
  godelit: function (e) {
    wx.navigateTo({
      url: '../index-Consultation/index?id=' + e.currentTarget.dataset.id
    })
  },
  bintnav: function (e) {
    // console.log(e)
    if (e.currentTarget.dataset.id == 1) {
      wx.navigateTo({
        // url: '../index-books/index'
        url: '../index-licheng/index'
      })
    }
    if (e.currentTarget.dataset.id == 2) {
      wx.navigateTo({
        url: '../index-research/index'
      })
    }
    if (e.currentTarget.dataset.id == 3) {
      //生涯视频
      // wx.navigateTo({
      //   url: '../index-video/index'
      // })
      wx.navigateTo({
        url: '../index-jiyu/index'
      })
    }
    if (e.currentTarget.dataset.id == 4) {
      wx.navigateTo({
        url: '../index-listletter/index'
      })
    }
    if (e.currentTarget.dataset.id == 5) {
      wx.navigateTo({
        url: '../index-cooperation/index'
      })
    }
    if (e.currentTarget.dataset.id == 6) {
      wx.navigateTo({
        url: '../index-media/index'
      })
    }
    if (e.currentTarget.dataset.id == 7) {
      wx.navigateTo({
        url: '../index-introduction/index'
      })
    }
    if (e.currentTarget.dataset.id == 8) {
      wx.navigateTo({
        url: '../index-about/index'
      })
    }

  },
  cepingFN: function (e) {
    wx.redirectTo({
      url: '../evaluation/index',
    })
  },
  getUserInfo(e) {

    console.log("ok")
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        
        app.globalData.userInfo = res.userInfo
        that.setData({
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          wxuser: res.userInfo,
          signature: res.signature,
          hasUserInfo: true,
          canIUse: true,
          isUser: true,
          isSiuser: false,
          headimg: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
        that.getloge()
      },
      fail: function () { },
      
    })
   
 
    // getOpenid(that)
  },
  //点击授权执行
  getloge:function(e){

    var that = this
    var url = app.globalData.url + '/cp/wx/auth';
    console.log(url)
    var wxlogin = httpUtils.httpPromise(wx.login);
    wxlogin().then(function (res) {
      console.log(res)
      console.log(1)
      var data={
        code: res.code,
        encryptedData : that.data.encryptedData,
        rawData: that.data.rawData,
        signature :that.data.signature,
        iv: that.data.iv
      }
      // var header = {}
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        app.globalData.openid = res.data.user.openId,
          app.globalData.cookie = res.data.user.cookie,
         
          app.globalData.userInfo = res.data.user
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    })
  },
  getuser:function(e){
    var that = this
    var url = app.globalData.url + '/cp/wx/auth';
    console.log(url)
    var wxlogin = httpUtils.httpPromise(wx.login);
    wxlogin().then(function (res) {
      console.log(res)
      console.log(1)
      var data = {
        code: res.code,
      
      }
      console.log(2)
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        app.globalData.openid = res.data.user.openId,
          app.globalData.cookie = res.data.user.cookie,
          app.globalData.userInfo = res.data.user
        // wx.setStorage({
        //   key: 'sessionId',
        //   data: 'JSESSIONID=' + res.data.user.openId,
        //   success: function (res) {
        //     console.log(res)
        //   }
        // })
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    })
  },
  ggopfn: function (e) {
    this.setData({
      hasUserInfo: true
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
    if (this.data.hasUserInfo){
      this.getuser()
    }
  
    // this.getloge
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
function getOpenid(that) {
  var url = app.globalData.url + '/api/index/getOpenid';
  var url1 = app.globalData.url + '/api/user/getUserInfo';
  var url2 = app.globalData.url + '/api/user/addUser';
  // var url = 
  console.log(that)
  var params = {};
  params.appId = 'wxf90793b6b6ec6236';
  console.log(params.appId);
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function (res) {
    console.log(res)
    params.code = res.code;
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      // var that = this;
      app.globalData.openId = res.data.openid
      that.setData({
        session_key: res.data.session_key
      })
      params.openid = res.data.openid;
      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)
        if (res.code == '1') {

          app.globalData.user_id = res.data.id
          app.globalData.user_name = res.data.name
          app.globalData.head_img = res.data.head_img
          app.globalData.all_price = res.data.all_price
          that.setData({
            headimg: res.data.head_img,
            nickName: res.data.name,
            birthday: res.data.birthday,
            phone: res.data.phone,
            real_name: res.data.real_name,
            all_price: res.data.all_price
          })
        }
        if (res.code == '0') {
          console.log(app.globalData.userInfo)
          // var params1 = {

          // };
          app.globalData.head_img = app.globalData.userInfo.avatarUrl
          params.openid = app.globalData.openId;
          params.headimg = app.globalData.userInfo.avatarUrl;
          params.user_name = app.globalData.userInfo.nickName;
          params.sex = app.globalData.userInfo.gender;
          console.log(params.headimg)
          console.log(params.user_name)
          app.wxRequest('POST', url2, params, (res) => {
            console.log(res)
            app.wxRequest('POST', url1, params, (res) => {
              console.log(res)
              app.globalData.user_id = res.data.id
              app.globalData.user_name = res.data.name
              app.globalData.head_img = res.data.head_img
            }, (err) => {
              wx.showToast({
                title: '提交失败',
              })
              console.log(err.errMsg)
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }

      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var params1 = {
      openid: app.globalData.openId
    }


  })

}