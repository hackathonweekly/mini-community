# 🔧 故障排除指南

本指南帮助开发者快速诊断和解决 Hackathon Weekly 微信小程序的常见问题。

## 🚨 常见问题速查

### 1. WebView 相关问题

#### 问题：WebView 显示空白页面
**症状：** 小程序加载后显示空白，没有任何内容

**可能原因和解决方案：**

✅ **检查业务域名配置**
```bash
# 确认域名已在微信公众平台配置
域名：hackathonweekly.com
状态：已验证 ✓
校验文件：已上传 ✓
```

✅ **检查网络连接**
```javascript
// 在开发者工具控制台运行
wx.request({
  url: 'https://hackathonweekly.com',
  success: (res) => console.log('网站可访问', res),
  fail: (err) => console.error('网站无法访问', err)
})
```

✅ **检查 HTTPS 支持**
- 确认目标网站支持 HTTPS
- 检查 SSL 证书是否有效
- 验证网站是否允许在 iframe 中显示

#### 问题：WebView 加载失败
**症状：** 显示"加载失败"错误提示

**解决步骤：**
1. 检查 `binderrorHandler` 回调中的错误信息
2. 验证网络环境（尝试其他网站）
3. 检查目标网站的可用性
4. 确认小程序版本是否支持当前域名

### 2. 配置相关问题

#### 问题：AppID 配置错误
**症状：** 开发者工具报错 "AppID 不正确"

**解决方案：**
```json
// 检查 project.config.json
{
  "appid": "wxabcdef1234567890",  // 确保是正确的 AppID
  "projectname": "hackathon-weekly-miniprogram"
}
```

#### 问题：域名校验失败
**症状：** 微信公众平台提示"域名校验失败"

**解决步骤：**
1. 确认校验文件已上传至网站根目录
2. 测试文件可访问性：`https://hackathonweekly.com/MP_verify_xxx.txt`
3. 检查文件权限和编码格式
4. 联系网站管理员确认服务器配置

### 3. 开发环境问题

#### 问题：开发者工具无法预览
**症状：** 点击预览按钮后无响应或报错

**解决方案：**
```javascript
// 1. 检查项目配置
// 确保所有必需文件存在：
- app.js
- app.json
- app.wxss
- pages/index/index.js
- pages/index/index.wxml

// 2. 检查代码语法错误
// 在开发者工具控制台查看错误信息
```

#### 问题：真机调试异常
**症状：** 开发者工具正常，但真机上异常

**解决步骤：**
1. 确认手机微信版本是否支持
2. 检查网络环境（WiFi vs 4G/5G）
3. 启用远程调试查看控制台信息
4. 测试不同设备和操作系统

### 4. 功能相关问题

#### 问题：分享功能不工作
**症状：** 点击分享按钮无响应或内容错误

**检查清单：**
```javascript
// 确认分享函数正确实现
onShareAppMessage: function () {
  return {
    title: 'Hackathon Weekly - 黑客松周刊',
    desc: '发现最新的黑客松活动和技术资讯',
    path: '/pages/index/index'  // 确保路径正确
  }
}

// 检查分享到朋友圈功能
onShareTimeline: function () {
  return {
    title: 'Hackathon Weekly - 黑客松周刊'
  }
}
```

#### 问题：消息通信失败
**症状：** 网页无法与小程序通信

**调试方法：**
```javascript
// 在网页中添加调试代码
window.postMessage({
  type: 'test',
  data: { message: 'Hello from webpage' }
}, '*');

// 在小程序中检查接收
bindmessageHandler: function (e) {
  console.log('收到消息：', e.detail.data);
}
```

## 🔍 调试工具和方法

### 1. 开发者工具调试

#### 控制台调试
```javascript
// 添加调试日志
console.log('WebView URL:', this.data.webViewUrl);
console.log('Loading state:', this.data.isLoading);
console.log('Error state:', this.data.hasError);
```

#### 网络面板
1. 打开开发者工具的 **Network** 面板
2. 监控所有网络请求
3. 检查请求状态和响应时间
4. 查看是否有失败的请求

#### 存储面板
1. 检查本地存储数据
2. 验证用户设置和缓存
3. 清理存储数据测试

### 2. 真机调试

#### 远程调试
1. 开启真机调试模式
2. 连接开发者工具
3. 查看真实环境下的日志
4. 测试网络相关功能

#### 性能监控
```javascript
// 添加性能监控
wx.reportPerformance(1101, {
  networkType: 'wifi',
  costTime: Date.now() - startTime
});
```

### 3. 日志收集

#### 错误日志
```javascript
// 在 app.js 中添加全局错误处理
App({
  onError: function(err) {
    console.error('小程序错误：', err);
    // 可以上报到错误监控服务
  }
})
```

#### 用户行为日志
```javascript
// 记录关键用户操作
wx.reportAnalytics('webview_load_success', {
  url: this.data.webViewUrl,
  timestamp: Date.now()
});
```

## 🛠️ 性能优化建议

### 1. 加载速度优化
- 启用 WebView 预加载
- 优化网页资源大小
- 使用 CDN 加速静态资源

### 2. 用户体验优化
```javascript
// 添加加载进度提示
wx.showLoading({
  title: '加载中...',
  mask: true
});

// 超时处理
setTimeout(() => {
  if (this.data.isLoading) {
    wx.hideLoading();
    this.setData({ hasError: true });
  }
}, 15000); // 15秒超时
```

### 3. 内存管理
```javascript
// 页面卸载时清理资源
onUnload: function() {
  // 清理定时器
  if (this.loadingTimer) {
    clearTimeout(this.loadingTimer);
  }
  // 清理其他资源
}
```

## 📊 监控和报警

### 1. 关键指标监控
- WebView 加载成功率 > 95%
- 页面响应时间 < 3秒
- 用户停留时间 > 30秒
- 分享转化率 > 5%

### 2. 错误监控
```javascript
// 设置错误阈值报警
const ERROR_THRESHOLD = 0.05; // 5% 错误率

// 定期检查错误率
if (errorRate > ERROR_THRESHOLD) {
  // 发送报警通知
  console.error(`错误率过高: ${errorRate * 100}%`);
}
```

## 🆘 紧急情况处理

### 1. 紧急回滚
如果线上版本出现严重问题：
1. 登录微信公众平台
2. 进入版本管理
3. 选择上一个稳定版本
4. 点击"设为线上版本"

### 2. 临时修复
```javascript
// 在网页中添加兼容性处理
if (typeof wx !== 'undefined') {
  // 小程序环境
  window.isInMiniProgram = true;
} else {
  // 浏览器环境
  window.isInMiniProgram = false;
}
```

## 📞 获取技术支持

### 1. 自助排查
- 查阅本故障排除指南
- 参考微信官方文档
- 搜索开发者社区

### 2. 社区求助
- 微信开发者社区：[链接]
- GitHub Issues：[链接]
- 技术交流群：[群号]

### 3. 专业支持
- 团队邮箱：[邮箱地址]
- 技术热线：[电话号码]
- 在线客服：[客服链接]

---

**记住：** 大部分问题都有标准解决方案，遇到问题时保持冷静，按照本指南逐步排查，通常能快速解决问题。

如果本指南没有覆盖你遇到的问题，请联系技术支持团队，我们会及时更新这份文档。
