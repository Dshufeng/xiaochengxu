//index.js
var app = getApp()
Page({
  data: {
    navbar: ['头条', '新闻', '财经', '体育', '军事', '教育', '科技','NBA','股票','星座','女性','健康','育儿'],
    currentTabIte: '头条',
    currentTabIdx:0,
    articleLists:[],
    isHideLoadMore:true,
    start:0,
    num:10
  },
  getNews:function(start,num){
    var that = this;
    wx.request({
      url: 'https://way.jd.com/jisuapi/get',
      data: {
        channel: that.data.currentTabIte,
        appkey: 'fc4a06a254b6d27a0a94f0da15823181',
        start: start,
        num: num
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        if (res.statusCode == 200) {
          that.setData({
            articleLists: res.data.result.result.list.concat(that.data.articleLists),
            isHideLoadMore: false
          });

          // 缓存
          wx.setStorage({
            key: "key",
            data: that.data.articleLists,
            success: function () {
              console.log('strorage');
            }
          });
          wx.stopPullDownRefresh();
          
          setTimeout(function(){
            that.setData({
              isHideLoadMore:true
            })
          },1500);
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
    // console.log(this.data.start);
    this.setData({
      start: this.data.start + 10
    });
    this.getNews(this.data.start, 10);
  },
  // xiahua
  onReachBottom: function () {
    this.setData({
      isHideLoadMore:true
    });
    // this.setData({
    //   start: this.data.start+10
    // });
    // this.getNews(this.data.start,10);
    this.setData({
      isHideLoadMore:false
    });
  },

}) 