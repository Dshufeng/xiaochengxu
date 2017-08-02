//index.js
var app = getApp()
Page({
  data: {
    navbar: ['头条', '新闻', '财经', '体育','军事','教育','科技'],
    currentTabIte: '头条',
    currentTabIdx:0,
    
  },
  navbarTap: function (e) {
    console.log(e.currentTarget.dataset.ite);
    this.setData({
      currentTabIdx: e.currentTarget.dataset.idx,
      currentTabIte: e.currentTarget.dataset.ite
    });
    
    wx.request({
      url: 'https://way.jd.com/jisuapi/get',
      data: {
        channel: '头条',
        appkey: 'fc4a06a254b6d27a0a94f0da15823181'
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200)
        {

        }
      }
    })
  }
}) 