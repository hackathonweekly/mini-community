# WebView 集成指南

本文档说明如何在 hackathonweekly.com 网站中集成微信小程序功能，实现更好的用户体验。

## 分享功能集成

### 1. 基本分享消息格式

在网页中，可以通过以下方式发送分享消息给小程序：

```javascript
// 发送分享消息
function shareToMiniProgram(title, description, imageUrl) {
    if (typeof window.wx !== 'undefined' && window.wx.miniProgram) {
        window.wx.miniProgram.postMessage({
            data: {
                type: 'share',
                title: title,
                desc: description,
                imageUrl: imageUrl
            }
        });
        
        window.wx.miniProgram.postMessage({
            data: {
                type: 'pageInfo',
                title: title,
                description: description,
                imageUrl: imageUrl
            }
        });
    }
}
```

### 2. 页面加载时自动设置分享内容

```javascript
// 页面加载完成后设置分享内容
document.addEventListener('DOMContentLoaded', function() {
    // 获取页面信息
    const title = document.querySelector('title')?.textContent || 'Hackathon Weekly';
    const description = document.querySelector('meta[name="description"]')?.content || '发现最新的黑客松活动和技术资讯';
    const imageUrl = document.querySelector('meta[property="og:image"]')?.content || '';
    
    // 发送页面信息给小程序
    shareToMiniProgram(title, description, imageUrl);
});
```

### 3. 文章页面分享集成

```javascript
// 文章页面分享功能
function shareArticle() {
    const articleTitle = document.querySelector('h1')?.textContent || document.title;
    const articleDesc = document.querySelector('meta[name="description"]')?.content || 
                       document.querySelector('.article-summary')?.textContent || 
                       '来自 Hackathon Weekly 的精彩内容';
    const articleImage = document.querySelector('.article-featured-image img')?.src || 
                        document.querySelector('meta[property="og:image"]')?.content || '';
    
    shareToMiniProgram(articleTitle, articleDesc, articleImage);
}

// 在分享按钮点击时调用
document.querySelectorAll('.share-button').forEach(button => {
    button.addEventListener('click', shareArticle);
});
```

## 检测小程序环境

```javascript
// 检测是否在微信小程序中
function isMiniProgram() {
    return typeof window.wx !== 'undefined' && 
           window.wx.miniProgram && 
           window.__wxjs_environment === 'miniprogram';
}

// 根据环境调整UI
if (isMiniProgram()) {
    // 在小程序环境中，隐藏一些不需要的元素
    document.body.classList.add('in-miniprogram');
    
    // 可以隐藏原生分享按钮，因为用户可以使用小程序的分享功能
    document.querySelectorAll('.native-share-button').forEach(el => {
        el.style.display = 'none';
    });
}
```

## CSS 适配

```css
/* 小程序环境适配 */
.in-miniprogram {
    /* 隐藏页面头部导航 */
    .main-navigation {
        display: none;
    }
    
    /* 调整内容区域 */
    .content-wrapper {
        padding-top: 0;
    }
    
    /* 隐藏不需要的元素 */
    .footer,
    .native-share-button,
    .external-links {
        display: none;
    }
}

/* 确保内容在小屏幕上显示良好 */
@media (max-width: 768px) {
    .in-miniprogram {
        font-size: 16px;
        line-height: 1.6;
    }
}
```

## 高级功能

### 1. 页面导航消息

```javascript
// 发送页面导航消息
function navigateInMiniProgram(url, type = 'navigate') {
    if (isMiniProgram()) {
        window.wx.miniProgram.postMessage({
            data: {
                type: 'navigate',
                url: url,
                navigateType: type // 'navigate', 'redirect', 'switchTab'
            }
        });
    }
}
```

### 2. 用户行为追踪

```javascript
// 发送用户行为数据
function trackUserAction(action, data = {}) {
    if (isMiniProgram()) {
        window.wx.miniProgram.postMessage({
            data: {
                type: 'analytics',
                action: action,
                data: data,
                timestamp: Date.now()
            }
        });
    }
}

// 使用示例
document.querySelectorAll('a[href^="/article/"]').forEach(link => {
    link.addEventListener('click', function() {
        trackUserAction('article_click', {
            articleId: this.href.split('/').pop(),
            title: this.textContent
        });
    });
});
```

## 测试建议

1. **开发环境测试**：在微信开发者工具中测试所有功能
2. **真机测试**：在真实设备上测试分享和交互功能
3. **网络测试**：测试不同网络条件下的加载表现
4. **兼容性测试**：确保在非小程序环境中正常工作

## 注意事项

1. 所有 postMessage 调用都应该检查小程序环境
2. 图片 URL 必须是 HTTPS 协议
3. 分享图片建议尺寸：500x400 或 1:1 比例
4. 描述文字建议控制在 50 字以内以获得最佳显示效果