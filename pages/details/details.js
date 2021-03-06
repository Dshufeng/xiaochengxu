var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    time:'',
    auth:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id,
        _this = this;
    wx.getStorage({
      key: 'key',
      success: function (res) {
        // console.log(res.data[id])
        _this.setData({
          title: res.data[id].title,
          auth: res.data[id].src,
          time: res.data[id].time,
        });
        WxParse.wxParse('content', 'html', res.data[id].content, _this,20)
      }
    });
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