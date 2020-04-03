var app = getApp();
Component({

  data: {
    selected: app.globalData.selected,
    color: "#D8BFD8",
    selectedColor: "#FF8145",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/image/a118a27a33aed1027665beee654c999.png",
      selectedIconPath: "/image/shouye@2x.png",
      text: "首页"
    }, {
        pagePath: "/pages/evaluation/index",
        iconPath: "/image/cep@2x.png",
        selectedIconPath: "/image/cep@2x.png",
      text: "测评"
    }, {
        pagePath: "/pages/me/index",
        iconPath: "/image/wode@2x.png",
        selectedIconPath: "/image/fcaa740cfb93231c08ac5687d6fe709.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      console.log(data.index)
      app.globalData.selected= data.index
      this.setData({
        selected: data.index
      })
    }
  }
})