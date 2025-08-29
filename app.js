// app.js
App({
  onLaunch: function () {
    // 小程序启动时执行的逻辑
    console.log('Hackathon Weekly 小程序启动 - 版本：', this.globalData.version);
    console.log('目标网站：', this.globalData.webViewUrl);
  },
  globalData: {
    // 全局数据
    version: '1.0.0',
    webViewUrl: 'https://hackathonweekly.com/',
    buildTime: '2024-12-XX',
    description: 'Hackathon Weekly 微信小程序 - 发现最新黑客松活动'
  }
}) 