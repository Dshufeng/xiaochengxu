//index.js
var app = getApp()
Page({
  data: {
    navbar: ['头条', '新闻', '财经', '体育', '军事', '教育', '科技','NBA','股票','星座','女性','健康','育儿'],
    currentTabIte: '头条',
    url: 'https://way.jd.com/jisuapi/get',
    appkey: 'fc4a06a254b6d27a0a94f0da15823181',
    currentTabIdx:0,
    articleLists:[],
    start:0,
    num:10,
    animationData: {}
  },
  getNews:function(start,num,type=1){
    var that = this;
    wx.request({
      url: that.data.url,
      data: {
        channel: that.data.currentTabIte,
        appkey: that.data.appkey,
        start: start,
        num: num
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        if (res.statusCode == 200) {
          var returnData = res.data.result.result.list;
          if(type==1){
            that.setData({
              articleLists: returnData.concat(that.data.articleLists),
            });
            that.showTip();
          }else{
            that.setData({
              articleLists: that.data.articleLists.concat(returnData),
            });
          }
          // 缓存
          wx.setStorage({
            key: "key",
            data: that.data.articleLists,
            success: function () {
              // console.log('strorage');
            }
          });
          wx.stopPullDownRefresh();
        }
      }
    });
  },
  onLoad:function(){
    this.getNews(0,10);
  },
  onReady: function () {
    
  },
  navbarTap: function (e) {
    wx.showNavigationBarLoading()
    
    this.setData({
      currentTabIdx: e.currentTarget.dataset.idx,
      currentTabIte: e.currentTarget.dataset.ite,
      articleLists:[],
      start:0
    });
    var _this = this;
    this.getNews(0,10);
  },
  detailsNews:function(e){
    console.log(e.currentTarget.dataset.newid);
    var id = e.currentTarget.dataset.newid;
    wx.navigateTo({
      url: '../details/details?id='+id,
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      start: this.data.start + 10
    });
    this.getNews(this.data.start, 10);
  },
  // xiahua
  onReachBottom: function () {
    this.setData({
      start: this.data.start + 10
    });
    this.getNews(this.data.start, 10,2);
  },

  // animation
  showTip: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.height(36).width('100%').opacity(1).step()
    
    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.height(0).width('80%').opacity(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 2000);
    
  }
}) 