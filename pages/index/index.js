//index.js
var app = getApp()
Page({
  data: {
    navbar: ['头条', '新闻', '财经', '体育', '军事', '教育', '科技','NBA','股票','星座','女性','健康','育儿'],
    currentTabIte: '头条',
    currentTabIdx:0,
    articleLists:[],
    isHideLoadMore:false,
    start:0,
    num:10
  },
  onLoad:function(){
    var _this = this;

    wx.request({
      url: 'https://way.jd.com/jisuapi/get',
      data: {
        channel: this.data.currentTabIte,
        appkey: 'fc4a06a254b6d27a0a94f0da15823181',
        start: this.data.start,
        num: this.data.num
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        if (res.statusCode == 200) {
          _this.setData({
            articleLists: res.data.result.result.list
          });

          // 缓存
          wx.setStorage({
            key: "key",
            data: res.data.result.result.list,
            success: function () {
              console.log('strorage');
            }
          });
        }
      }
    });

  },
  onReady: function () {
    
  },
  navbarTap: function (e) {
    wx.showNavigationBarLoading()
    console.log(e.currentTarget.dataset.ite);
    this.setData({
      currentTabIdx: e.currentTarget.dataset.idx,
      currentTabIte: e.currentTarget.dataset.ite
    });
    var _this = this;
    wx.request({
      url: 'https://way.jd.com/jisuapi/get',
      data: {
        channel: this.data.currentTabIte,
        appkey: 'fc4a06a254b6d27a0a94f0da15823181'
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        
        if (res.statusCode == 200)
        {
          _this.setData({
            articleLists:res.data.result.result.list
          });

          // 缓存
          wx.setStorage({
            key: "key",
            data: res.data.result.result.list,
            success:function(){
              console.log(123)
            }
          });
        }
      }
    })
  },
  detailsNews:function(e){
    console.log(e.currentTarget.dataset.newid);
    var id = e.currentTarget.dataset.newid;
    wx.navigateTo({
      url: '../details/details?id='+id,
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    console.log(111);
  },
  // xiahua
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    //total += count;
    // 网络请求
    //this.periphery();
    this.setData({
      isHideLoadMore:true
    });
    console.log(1112);
    this.setData({
      isHideLoadMore:false
    });
  },

}) 