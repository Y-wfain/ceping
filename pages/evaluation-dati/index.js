// pages/evaluation-dati/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conut_Ti: 1,//第几题
    conut_Tii:0,
    cont: 1,//第几套题
    nums: 1,//第几页
    codeTxte: [
      {
        txtNum: 162,
        code_delit: 'I',
        id: 1,
        txt:'你已完成第一套，还有三套，请点击确定开始下一套'
      },
      {
        txtNum: 84,
        code_delit_1: 'M',
        code_delit_2: 'N',
        id: 2,
        txt:'你已完成第二套，还有两套，请点击确定开始下一套'
      },
      {
        txtNum: 90,
        code_delit: 'A',
        id: 3,
        txt:'你已完成第三套，还有一套，请点击确定开始下一套'

      },
      {
        txtNum: 187,
        code_delit: 'P',
        id: 4
      }
    ],
    evaluation_code: '',//测评码

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })
    wx.showToast({
      title: '尽量在最短的时间完成作答，以免影响最终结果',
      icon: 'none',
      duration: 2500
    })

    var that = this
    console.log(wx.getStorageSync('evaluation_code'))
    if (wx.getStorageSync('evaluation_code') && !options.qucode_id) {
      that.setData({
        evaluation_code: wx.getStorageSync('evaluation_code')
      })
      if (options.id) {
        this.setData({
          cont: options.id,
        })
        if (this.data.cont == 2) {
          var data = {
            testCode: this.data.evaluation_code,
            quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit_1) + String(this.data.conut_Ti)
          }
        } else {
          var data = {
            testCode: this.data.evaluation_code,
            quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
          }
        }
      } else {
        var data = {
          testCode: this.data.evaluation_code,
          quesNo: 'I1'
        }
      }

      var url = app.globalData.url + '/cp/test/getQuestion'

      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            cont_txt: res.data.question.stem,
            opA: res.data.question.opA,
            opB: res.data.question.opB,
            opC: res.data.question.opC,
          })
          // wx.showToast({
          //   title: '提交成功',
          //   icon: 'none'
          // })
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
    } else {
      wx.setStorageSync('evaluation_code', options.testCode)
      var str_ = options.quesNo
      console.log(str_)
      console.log(str_.substring(0,1))
      console.log(parseInt(str_.substring(1)) )
      console.log(this.data.cont)
      console.log(this.data.conut_Ti )
      that.setData({
        evaluation_code: options.testCode,
        cont_txt: options.stem,
        opA: options.opA,
        opB: options.opB,
        opC: options.opC,
      })

      if (str_.substring(0, 1) == 'N' && parseInt(str_.substring(1))){
        that.setData({
          conut_Ti: parseInt(str_.substring(1))+42,
          nums: parseInt(str_.substring(1)) + 42
        })
      }else{
        that.setData({
          conut_Ti: parseInt(str_.substring(1)),
          nums: parseInt(str_.substring(1)) 
        })
      }
      if (str_.substring(0, 1) == 'I'){
        that.setData({
          cont:1
        })
      }
      if (str_.substring(0, 1) == 'M' || str_.substring(0, 1) == 'N'){
        that.setData({
          cont: 2
        })
      }
      if (str_.substring(0, 1) == 'A'){
        that.setData({
          cont: 3
        })
      }
      if (str_.substring(0, 1) == 'P') {
        that.setData({
          cont: 4
        })
      }
    }
  },
  delit_title: function (e) {

  },
  // 第一套
  clickFn: function (e) {

    console.log(this.data.cont)
    console.log(this.data.codeTxte[0].code_delit)
    console.log(this.data.codeTxte[this.data.cont - 1].code_delit)//
    console.log(this.data.conut_Ti)
    console.log(String(this.data.codeTxte[0].code_delit_1) + String(this.data.conut_Ti))
    console.log(e)

    this.setData({
      tid: e.currentTarget.dataset.id
    })
    var that = this
    var url = app.globalData.url + '/cp/test/commitAnswer'

    var data = {
      testCode: this.data.evaluation_code,
      quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti),
      answer: e.currentTarget.dataset.a,
      scoreA: e.currentTarget.dataset.id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {
      
        setTimeout(function () {
          console.log('11')
          that.pagebot()//执行下一题并判断当前提是否答题
          that.setData({
            tid: ''
          })
          // var num = that.data.nums;
          // num++
          // that.setData({
          //   nums
          // })
          console.log(that.data.classid)
        }, 100)
      } else {
        wx.showToast({
          title: res.msg,
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
  // 第二套
  navFn: function (e) {
    this.setData({
      classid: e.currentTarget.dataset.classid,
      oid: e.currentTarget.dataset.oid,
      fid: e.currentTarget.dataset.fid
    })
    var that = this
    var url = app.globalData.url + '/cp/test/commitAnswer'
    if (this.data.conut_Ti <= 42) {
      var data = {
        testCode: this.data.evaluation_code,//测评码
        quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit_1) + String(this.data.conut_Ti),//题号
        scoreA: e.currentTarget.dataset.oid,//第一个分数
        scoreB: e.currentTarget.dataset.fid,//第二个分数
        answer: 'A',//写死的A
        num: this.data.conut_Ti//num 变量
      }
    } else {
      // this.setData({
      //   conut_Tii: 1
      // })
      var data = {
        testCode: this.data.evaluation_code,
        quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit_2) + String(this.data.conut_Ti),
        scoreA: e.currentTarget.dataset.oid,
        scoreB: e.currentTarget.dataset.fid,
        answer: 'A',
        num: this.data.conut_Ti
      }
    }

    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {
        // that.setData({
        //   cont_txt: res.data.question.stem
        // })
        setTimeout(function () {
          that.pagebot()
          that.setData({
            classid: 8,
            oid: '',
            fid: ''
          })

        }, 100)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })

    console.log(this.data.classid)
  },
  clickFn3: function (e) {
    console.log(e)
    this.setData({
      tid3: e.currentTarget.dataset.id
    })
    var that = this
    var url = app.globalData.url + '/cp/test/commitAnswer'

    var data = {
      testCode: this.data.evaluation_code,
      quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti),
      answer: e.currentTarget.dataset.a,
      scoreA: e.currentTarget.dataset.id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {
        // that.setData({
        //   cont_txt: res.data.question.stem
        // })
        setTimeout(function () {
          that.pagebot()
          that.setData({
            tid3: ''
          })
        }, 100)
      } else {
        wx.showToast({
          title: res.msg,
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
  clickFn4: function (e) {
    console.log(e)
    this.setData({
      tid4: e.currentTarget.dataset.a
    })
    var that = this
    var url = app.globalData.url + '/cp/test/commitAnswer'

    var data = {
      testCode: this.data.evaluation_code,
      quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti),
      answer: e.currentTarget.dataset.a,
      scoreA: e.currentTarget.dataset.id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {
        // that.setData({
        //   cont_txt: res.data.question.stem
        // })
        setTimeout(function () {
          that.pagebot()
          that.setData({
            tid4: ''
          })
          // wx.showModal({
          //   title: '提示',
          //   content: '您已完成所有测试,下一步将为您生成pdf，点击确定开始生成',
          //   cancelText: '取消',
          //   confirmText: '确定',
          //   success: function (res) {
          //     if (res.cancel) {
          //       //点击取消,默认隐藏弹框
          //       // wx.navigateTo({
          //       //   url: '../me-user/index',
          //       // })
          //     } else {
          //       //点击确定
          //       wx.showLoading({
          //         title: 'pdf生成中...',
          //         duration: 2000
          //       })
          //     }
          //   },
          // })
        }, 100)
      } else {
        wx.showToast({
          title: res.msg,
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    this.setData({
      timeInevr:setInterval(function(){
        if (that.data.cont < 4 ){
           wx.showModal({
            title: '提示',
             content: '你目前答题过慢，请尽量提高答题速度以免影响测试结果',
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
              if (res.cancel) {
                //点击取消,默认隐藏弹框
                // wx.navigateTo({
                //   url: '../me-user/index',
                // })
              } else {
                //点击确定
              }
            },
          })
        }
        if (that.data.cont == 4 && that.data.conut_Ti<187){
          wx.showModal({
            title: '提示',
            content: '你目前答题过慢，请尽量提高答题速度以免影响测试结果',
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
              if (res.cancel) {
                //点击取消,默认隐藏弹框
                // wx.navigateTo({
                //   url: '../me-user/index',
                // })
              } else {
                //点击确定
              }
            },
          })
        }
      }, 3600000)
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
    // wx.showModal({
    //   title: '提示',
    //   content: '您有未完成的测评,确定要退出答题，时间过久会影响最终结果(现效果只是用来测试)',
    //   success(res) {
    //     if (res.cancel) {
    //       // 用户点击了取消属性的按钮，对应选择了'女'
    //       wx.redirectTo({
    //         url: '../evaluation-dati/index',
    //       })
    //     } else if (res.confirm) {
    //       // 用户点击了确定属性的按钮，对应选择了'男'
    //       wx.redirectTo({
    //         url: '../index/index',
    //       })
    //       wx.setStorageSync('evaluation_code',null)
    //     }
    //   }
    // })
  },
  toppage: function () {
    var that = this;
   
    
    var conut_Ti = this.data.conut_Ti
   
    conut_Ti--
   
    this.setData({
      conut_Ti: conut_Ti,
    })
    this.setData({
      nums: this.data.conut_Ti
    })
   
    if (conut_Ti <= 1) {
      wx.showToast({
        title: '已经是第一页了',
      })
      this.setData({
        conut_Ti: 1
      })
      this.setData({
        nums: this.data.conut_Ti
      })
    }
    console.log(this.data.cont)
    console.log(this.data.codeTxte[0].code_delit)
    console.log(this.data.codeTxte[this.data.cont - 1].code_delit)//
    console.log(this.data.conut_Ti)
    var url = app.globalData.url + '/cp/test/getQuestion'
    if (this.data.cont == 1) {
      var data = {
        testCode: this.data.evaluation_code,
        quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
      }
    }
    if (this.data.cont == 2) {
      if (this.data.conut_Ti <= 42) {
        var data = {
          testCode: this.data.evaluation_code,
          quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit_1) + String(this.data.conut_Ti),
          num: this.data.conut_Ti
        }
      } else {
      
        // if (this.data.cont == 2 && this.data.conut_Ti > 42) {
          var data = {
            testCode: this.data.evaluation_code,
            quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit_2) + String(this.data.conut_Ti),
            num: this.data.conut_Ti
          }
        // }
      }

    }
    if (this.data.cont == 3) {
      var data = {
        testCode: this.data.evaluation_code,
        quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
      }
    }
    if (this.data.cont == 4) {
      var data = {
        testCode: this.data.evaluation_code,
        quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
      }
    }

    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {
        that.setData({
          cont_txt: res.data.question.stem,
          opA: res.data.question.opA,
          opB: res.data.question.opB,
          opC: res.data.question.opC,
        })
        if (res.data.answer.length > 0) {
          console.log('11ehnjk')
          if (res.data.answer.length == 1) {
            if (this.data.cont == 1) {
              that.setData({
                tid: res.data.answer[0].score,
              })
            }
            if (this.data.cont == 3) {
              that.setData({
                tid3: res.data.answer[0].score,
              })
            }
            if (this.data.cont == 4) {
              that.setData({
                tid4: res.data.answer[0].answer,
              })
            }
          }
          if (res.data.answer.length == 2) {
            if (this.data.cont == 2) {
              that.setData({
                classid: res.data.answer[0].score,
               
               
              })
              if (res.data.answer[0].score==0){
                that.setData({
                  oid:'0'
                })
              }else{
                that.setData({
                  oid: res.data.answer[0].score,
                })
              }
              if (res.data.answer[1].score == 0) {
                that.setData({
                  fid: '0'
                })
              } else {
                that.setData({
                  fid: res.data.answer[1].score
                })
              }
            }
          }

        } else {
          that.setData({
            tid: '',
            tid3: '',
            tid4: '',
            classid: 8,
            oid:'',
            fid:''
          })
        }
        // wx.showToast({
        //   title: '提交成功',
        //   icon: 'none'
        // })
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
    console.log(this.data.cont)
  },
  pagebot: function (e) {
    var that = this;
    var url = app.globalData.url + '/cp/test/getQuestion'
    if (this.data.cont == 1) {
      var data = {
        testCode: this.data.evaluation_code,
        // quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
        quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
      }
      console.log(String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti))
    }
    if (this.data.cont == 2) {
      if (this.data.conut_Ti <= 42) {
        var data = {
          testCode: this.data.evaluation_code,
          quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit_1) + String(this.data.conut_Ti),
          num: this.data.conut_Ti
        }
      } else {
        // if (this.data.cont == 2 && this.data.conut_Ti > 42) {
        var data = {
          testCode: this.data.evaluation_code,
          quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit_2) + String(this.data.conut_Ti),
          num: this.data.conut_Ti
        }
        // }

      }

    }
    if (this.data.cont == 3) {
      var data = {
        testCode: this.data.evaluation_code,
        quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
      }
    }
    if (this.data.cont == 4) {
      var data = {
        testCode: this.data.evaluation_code,
        quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
      }
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 0) {
        if (!res.data.answer || res.data.answer.length<1){
          wx.showToast({
            title: '请先答完本题',
            icon:'none'
          })
        }else{
        
          var conut_Ti = that.data.conut_Ti
          conut_Ti++
          that.setData({
            conut_Ti: conut_Ti
          })
          if (that.data.conut_Ti > this.data.codeTxte[this.data.cont - 1].txtNum) {
            that.setData({
              nums: that.data.conut_Ti-1
            })
          } else if (this.data.cont == 4 && that.data.conut_Ti==188){
            that.setData({
              nums: this.data.codeTxte[this.data.cont - 1].txtNum,
              conut_Ti: this.data.codeTxte[this.data.cont - 1].txtNum,
            })
          }
          else{
            that.setData({
              nums: that.data.conut_Ti
            })
          }
         
          if (that.data.conut_Ti > this.data.codeTxte[this.data.cont - 1].txtNum && this.data.cont == 1) {
            wx.showModal({
              title: '提示',
              content: '你已完成第一套，还有三套，请点击确定开始下一套',
              success(res) {
                if (res.cancel) {
                  // 用户点击了取消属性的按钮，对应选择了'女'
                  that.setData({
                    conut_Ti: that.data.conut_Ti - 1
                  })
                  this.setData({
                    nums: this.data.conut_Ti
                  })
                  return
                } else if (res.confirm) {
                  // 用户点击了确定属性的按钮，对应选择了'男'
                  if (that.data.conut_Ti > that.data.codeTxte[that.data.cont - 1].txtNum) {
                    console.log(that.data.cont)
                    // this.data.cont
                    var nucont = that.data.cont
                    nucont++
                    that.setData({
                      cont: nucont
                    })
                    wx.redirectTo({
                      url: '../evaluation-onedelit/index?id=' + that.data.cont,
                    })
                  }
                }
              }
            })

            return
          }
          if (that.data.conut_Ti > this.data.codeTxte[this.data.cont - 1].txtNum && this.data.cont == 2) {
            wx.showModal({
              title: '提示',
              content: '你已完成第二套，还有两套，请点击确定开始下一套',
              success(res) {
                if (res.cancel) {
                  // 用户点击了取消属性的按钮，对应选择了'女'
                  that.setData({
                    conut_Ti: that.data.conut_Ti - 1
                  })
                  this.setData({
                    nums: this.data.conut_Ti
                  })
                  return
                } else if (res.confirm) {
                  // 用户点击了确定属性的按钮，对应选择了'男'
                  if (that.data.conut_Ti > that.data.codeTxte[that.data.cont - 1].txtNum) {
                    console.log(that.data.cont)
                    // this.data.cont
                    var nucont = that.data.cont
                    nucont++
                    that.setData({
                      cont: nucont
                    })
                    wx.redirectTo({
                      url: '../evaluation-onedelit/index?id=' + that.data.cont,
                    })
                  }
                }
              }
            })

            return
          }
          if (that.data.conut_Ti > this.data.codeTxte[this.data.cont - 1].txtNum && this.data.cont == 3) {
            wx.showModal({
              title: '提示',
              content: '你已完成第三套，还有一套，请点击确定开始下一套',
              success(res) {
                if (res.cancel) {
                  // 用户点击了取消属性的按钮，对应选择了'女'
                  that.setData({
                    conut_Ti: that.data.conut_Ti - 1
                  })
                  this.setData({
                    nums: this.data.conut_Ti
                  })
                  return
                } else if (res.confirm) {
                  // 用户点击了确定属性的按钮，对应选择了'男'
                  if (that.data.conut_Ti > that.data.codeTxte[that.data.cont - 1].txtNum) {
                    console.log(that.data.cont)
                    // this.data.cont
                    var nucont = that.data.cont
                    nucont++
                    that.setData({
                      cont: nucont
                    })
                    wx.redirectTo({
                      url: '../evaluation-onedelit/index?id=' + that.data.cont,
                    })
                  }
                }
              }
            })

            return
          }

          if (this.data.conut_Ti > this.data.codeTxte[this.data.cont - 1].txtNum && this.data.cont == 4) {
            wx.showModal({
              title: '提示',
              content: '您已完成所有测试,下一步将为您生成分析报告，点击确定开始生成',
              cancelText: '取消',
              confirmText: '确定',
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                  // wx.navigateTo({
                  //   url: '../me-user/index',
                  // })
                } else {
                  wx.showLoading({
                    title: '加载中...',
                  })
                  var url = app.globalData.url + '/cp/test/commitTest'

                  var data = {
                    testCode: that.data.evaluation_code
                  }
                  app.wxRequest('POST', url, data, (res) => {
                    console.log(res)
                    if (res.code == 0) {
                      wx.hideLoading()
                      wx.redirectTo({
                        url: '../pdfdelit/index?testCode=' + that.data.evaluation_code,
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
                  console.log(123)
                }
              },
            })
            return
          }



          console.log(this.data.cont)
          console.log(this.data.codeTxte[0].code_delit)
          console.log(this.data.codeTxte[this.data.cont - 1].code_delit)//
          console.log(this.data.conut_Ti)
          var url = app.globalData.url + '/cp/test/getQuestion'
          if (this.data.cont == 1) {
            var data = {
              testCode: this.data.evaluation_code,
              // quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
              quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
            }
            console.log(String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti))
          }
          if (this.data.cont == 2) {
            if (this.data.conut_Ti <= 42) {
              var data = {
                testCode: this.data.evaluation_code,
                quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit_1) + String(this.data.conut_Ti),
                num: this.data.conut_Ti
              }
            } else {

              var data = {
                testCode: this.data.evaluation_code,
                quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit_2) + String(this.data.conut_Ti),
                num: this.data.conut_Ti
              }

            }

          }
          if (this.data.cont == 3) {
            var data = {
              testCode: this.data.evaluation_code,
              quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
            }
          }
          if (this.data.cont == 4) {
            var data = {
              testCode: this.data.evaluation_code,
              quesNo: String(this.data.codeTxte[this.data.cont - 1].code_delit) + String(this.data.conut_Ti)
            }
          }

          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            if (res.code == 0) {
              that.setData({
                cont_txt: res.data.question.stem,
                opA: res.data.question.opA,
                opB: res.data.question.opB,
                opC: res.data.question.opC,
              })
              if (res.data.answer.length > 0) {
                console.log('11ehnjk')
                if (res.data.answer.length == 1) {
                  if (this.data.cont == 1) {
                    that.setData({
                      tid: res.data.answer[0].score,
                    })
                  }
                  if (this.data.cont == 3) {
                    that.setData({
                      tid3: res.data.answer[0].score,
                    })
                  }
                  if (this.data.cont == 4) {
                    that.setData({
                      tid4: res.data.answer[0].answer,
                    })
                  }
                }
                if (res.data.answer.length == 2) {
                  if (this.data.cont == 2) {
                    that.setData({
                      classid: res.data.answer[0].score,


                    })
                    if (res.data.answer[0].score == 0) {
                      that.setData({
                        oid: '0'
                      })
                    } else {
                      that.setData({
                        oid: res.data.answer[0].score,
                      })
                    }
                    if (res.data.answer[1].score == 0) {
                      that.setData({
                        fid: '0'
                      })
                    } else {
                      that.setData({
                        fid: res.data.answer[1].score
                      })
                    }
                  }
                }
                console.log(that.data.classid)
              } else {
                that.setData({
                  tid: '',
                  tid3: '',
                  tid4: '',
                  classid: 8,
                  oid: '',
                  fid: ''
                })
              }
              console.log(that.data.classid)

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
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
   

    
    console.log(this.data.cont)
    console.log(this.data.codeTxte[this.data.cont - 1].txtNum)
    console.log(this.data.conut_Ti)
    
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