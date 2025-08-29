# Hackathon Weekly 微信小程序

这是一个使用 WebView 显示 Hackathon Weekly 网站（https://hackathonweekly.com/）的微信小程序，专为开发者和创新者打造。

## 🚀 项目概述

本小程序通过 WebView 组件无缝嵌入 Hackathon Weekly 网站，为用户提供最新的黑客松活动信息、技术资讯和创新项目展示。

## 📁 项目结构

```
├── app.js                 // 小程序全局逻辑和配置
├── app.json               // 小程序全局配置（页面路由、窗口设置等）
├── app.wxss               // 小程序全局样式
├── images/                // 图片资源文件夹
├── pages/                 // 页面文件夹
│   └── index/             // 首页（主要 WebView 页面）
│       ├── index.js       // 首页逻辑（包含加载、错误处理、消息通信）
│       ├── index.json     // 首页配置
│       ├── index.wxml     // 首页结构（WebView 和状态显示）
│       └── index.wxss     // 首页样式（加载动画、错误提示等）
├── project.config.json    // 开发工具项目配置
├── project.private.config.json // 私有配置（不会被版本控制）
├── sitemap.json           // 站点地图配置
└── README.md              // 项目说明文档
```

## 🛠️ 快速开始

### 1. 环境要求

- 微信开发者工具 (最新版本)
- 微信小程序开发账号
- 已认证的服务号（用于 WebView 功能）

### 2. 项目配置

#### 步骤一：设置 AppID
1. 打开 `project.config.json` 文件
2. 将 `"appid": "wxxxxxx"` 替换为你的小程序 AppID
3. 保存文件

#### 步骤二：配置业务域名
1. 登录 [微信公众平台](https://mp.weixin.qq.com/)
2. 进入 **设置** → **开发设置** → **业务域名**
3. 添加域名：`hackathonweekly.com`
4. 下载校验文件并上传至网站根目录
5. 点击保存

#### 步骤三：导入项目
1. 打开微信开发者工具
2. 选择 **导入项目**
3. 选择项目目录：`/path/to/mini-community`
4. 填入 AppID
5. 点击 **导入**

### 3. 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd mini-community

# 在微信开发者工具中打开项目
# 工具 → 项目 → 新建 → 导入项目
```

## ✨ 功能特性

### 核心功能
- 📱 **WebView 嵌入**：无缝显示 Hackathon Weekly 网站
- 🔄 **智能加载**：带有加载动画和进度提示
- ❌ **错误处理**：网络错误时显示友好提示和重试功能
- 🔗 **消息通信**：支持网页与小程序之间的双向通信
- 📤 **分享功能**：支持分享给好友和朋友圈

### 用户体验优化
- 🎨 **现代化 UI**：简洁美观的加载和错误状态界面
- ⚡ **性能优化**：启用了多项性能优化配置
- 📲 **响应式设计**：适配各种屏幕尺寸
- 🔧 **开发友好**：完整的错误日志和调试信息

## 🔧 配置说明

### app.json 配置项

```json
{
  "window": {
    "navigationBarTitleText": "Hackathon Weekly",  // 导航栏标题
    "backgroundColor": "#f8f9fa",                   // 页面背景色
    "enablePullDownRefresh": false                  // 禁用下拉刷新
  },
  "permission": {
    "scope.userLocation": {
      "desc": "位置信息用于优化用户体验"            // 位置权限说明
    }
  },
  "networkTimeout": {
    "request": 10000,                               // 网络请求超时时间
    "downloadFile": 10000                           // 下载超时时间
  }
}
```

### project.config.json 关键配置

```json
{
  "setting": {
    "urlCheck": false,        // 关闭域名校验（开发阶段）
    "enhance": true,          // 启用增强编译
    "es6": true,             // 启用 ES6 转换
    "compileHotReLoad": true, // 启用热重载
    "useMultiFrameRuntime": true  // 启用多线程运行时
  }
}
```

## 🌐 WebView 最佳实践

### 1. 域名配置
确保在微信公众平台配置了正确的业务域名：
- 主域名：`hackathonweekly.com`
- 支持 HTTPS 协议
- 域名需要已备案

### 2. 消息通信
网页可以通过以下方式与小程序通信：

```javascript
// 在网页中发送消息给小程序
window.postMessage({
  type: 'share',
  data: {
    title: '文章标题',
    url: 'https://hackathonweekly.com/article/123'
  }
}, '*');
```

小程序接收消息：
```javascript
// 在 pages/index/index.js 中
bindmessageHandler: function (e) {
  const data = e.detail.data;
  // 处理来自网页的消息
}
```

### 3. 性能优化建议
- 网页应当适配移动端显示
- 优化图片和资源加载
- 使用 CDN 加速静态资源
- 精简 CSS 和 JavaScript

## 🔍 调试指南

### 1. 常见问题

**问题：WebView 显示空白**
- 检查域名是否已在微信公众平台配置
- 确认网站支持 HTTPS
- 查看开发者工具控制台错误信息

**问题：加载失败**
- 检查网络连接
- 确认目标网站可正常访问
- 查看 `binderrorHandler` 回调中的错误信息

**问题：无法分享**
- 确保已实现 `onShareAppMessage` 函数
- 检查分享数据格式是否正确

### 2. 调试工具
- 使用微信开发者工具的调试面板
- 启用 `debug: true` 查看详细日志
- 使用真机调试测试实际效果

## 📱 发布上线

### 1. 提交审核前检查
- [ ] 更新 `project.config.json` 中的 AppID
- [ ] 确认所有业务域名已配置
- [ ] 测试各种网络环境下的表现
- [ ] 检查分享功能是否正常
- [ ] 验证用户权限申请流程

### 2. 版本管理
建议在 `app.js` 中添加版本信息：

```javascript
App({
  globalData: {
    version: '1.0.0',
    webViewUrl: 'https://hackathonweekly.com/'
  }
})
```

### 3. 监控和分析
- 配置小程序数据助手
- 监控 WebView 加载成功率
- 分析用户使用路径

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 技术支持

如有问题或建议，请通过以下方式联系：

- 提交 [GitHub Issue](../../issues)
- 发送邮件至：[你的邮箱]
- 微信群：[群号或二维码]

## 🎯 更新日志

### v1.0.0 (2024-12-XX)
- ✨ 初始版本发布
- 🚀 支持 hackathonweekly.com 网站嵌入
- 💫 添加加载状态和错误处理
- 📤 实现分享功能
- 🎨 优化用户界面

---

**开发团队**：Hackathon Weekly 团队  
**创建日期**：2024-12-XX  
**最后更新**：2024-12-XX 