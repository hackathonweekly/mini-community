const app = getApp()

Page({
  data: {
    webViewUrl: '',
    isLoading: true,
    hasError: false,
    errorMessage: '',
    currentUrl: ''
  },
  
  onLoad: function (options) {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    console.log('系统信息:', systemInfo)
    
    // 检查是否有URL参数传递
    let targetUrl = app.globalData.webViewUrl
    if (options && options.url) {
      try {
        targetUrl = decodeURIComponent(options.url)
        console.log('从分享链接获取URL:', targetUrl)
      } catch (e) {
        console.error('URL解码失败:', e)
        targetUrl = app.globalData.webViewUrl
      }
    }
    
    // 页面加载时设置webview的URL
    this.setData({
      webViewUrl: targetUrl,
      currentUrl: targetUrl,
      isLoading: true,
      hasError: false
    })
    
    // 显示加载提示
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  },
  
  // webview加载成功
  bindloadHandler: function (e) {
    console.log('webview加载成功', e)
    this.setData({
      isLoading: false,
      hasError: false
    })
    wx.hideLoading()
    wx.showToast({
      title: '加载完成',
      icon: 'success',
      duration: 1500
    })
  },
  
  // webview加载失败
  binderrorHandler: function (e) {
    console.error('webview加载失败', e)
    this.setData({
      isLoading: false,
      hasError: true,
      errorMessage: '网页加载失败，请检查网络连接'
    })
    wx.hideLoading()
    wx.showModal({
      title: '加载失败',
      content: '网页加载失败，请检查网络连接后重试',
      showCancel: true,
      cancelText: '返回',
      confirmText: '重试',
      success: (res) => {
        if (res.confirm) {
          this.retryLoad()
        } else if (res.cancel) {
          wx.navigateBack()
        }
      }
    })
  },
  
  // 重试加载
  retryLoad: function() {
    this.setData({
      isLoading: true,
      hasError: false
    })
    wx.showLoading({
      title: '重新加载中...',
      mask: true
    })
    // 重新设置URL触发重新加载
    const url = this.data.webViewUrl
    this.setData({
      webViewUrl: ''
    })
    setTimeout(() => {
      this.setData({
        webViewUrl: url
      })
    }, 100)
  },
  
  // 监听网页消息
  bindmessageHandler: function (e) {
    console.log('来自网页的消息', e.detail)
    // 可以在这里处理来自hackathonweekly.com的消息
    const data = e.detail.data
    if (data && data.length > 0) {
      const message = data[data.length - 1] // 获取最新消息
      if (message.type) {
        this.handleWebMessage(message)
      }
    }
  },
  
  // 处理网页消息
  handleWebMessage: function(message) {
    switch (message.type) {
      case 'share':
        // 处理分享消息
        this.shareContent(message.data)
        break
      case 'navigate':
        // 处理导航消息
        this.navigateToPage(message.data)
        break
      case 'urlChange':
        // 处理URL变化消息
        this.updateCurrentUrl(message.url)
        break
      default:
        console.log('未知消息类型:', message)
    }
  },
  
  // 更新当前URL
  updateCurrentUrl: function(url) {
    if (url && typeof url === 'string') {
      this.setData({
        currentUrl: url
      })
      console.log('URL已更新:', url)
    }
  },
  
  // 分享功能
  shareContent: function(data) {
    // 可以实现自定义分享逻辑
    console.log('分享内容:', data)
  },
  
  // 页面导航
  navigateToPage: function(data) {
    // 可以实现页面导航逻辑
    console.log('导航到:', data)
  },
  
  // 分享给朋友
  onShareAppMessage: function (options) {
    // options.webViewUrl 是微信原生提供的当前webview页面URL
    const currentUrl = options.webViewUrl || this.data.currentUrl || app.globalData.webViewUrl
    console.log('分享时的webViewUrl:', options.webViewUrl)
    console.log('最终分享URL:', currentUrl)
    
    return {
      title: 'Hackathon Weekly - 周周黑客松',
      desc: 'AI 产品创造者社区，在这里从 0 到 1 创造你的 MVP',
      path: `/pages/index/index?url=${encodeURIComponent(currentUrl)}`
    }
  },
  
  // 分享到朋友圈
  onShareTimeline: function () {
    return {
      title: 'Hackathon Weekly - 周周黑客松'
    }
  }
}) 