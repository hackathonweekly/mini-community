const app = getApp()

Page({
  data: {
    webViewUrl: ''
  },
  onLoad: function () {
    // 页面加载时设置webview的URL
    this.setData({
      webViewUrl: app.globalData.webViewUrl
    })
  },
  // webview加载成功
  bindloadHandler: function (e) {
    console.log('webview加载成功', e)
  },
  // webview加载失败
  binderrorHandler: function (e) {
    console.error('webview加载失败', e)
  },
  // 监听网页消息
  bindmessageHandler: function (e) {
    console.log('来自网页的消息', e.detail)
  }
}) 