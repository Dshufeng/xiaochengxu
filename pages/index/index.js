//index.js
var app = getApp()
Page({
  data: {
    navbar: ['头条', '新闻', '财经', '体育','军事','教育','科技'],
    currentTabIte: '头条',
    currentTabIdx:0,
    articleLists:[],
  },
  navbarTap: function (e) {
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
        console.log(res.data.result.result.list);
        console.log(_this);
        if (res.statusCode == 200)
        {
          _this.setData({
            articleLists:res.data.result.result.list
          })
        }
      }
    })
  }
}) 