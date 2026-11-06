# 🧰 在线工具集

[![在线访问](https://img.shields.io/badge/在线访问-dujingning.github.io%2Ftoolbox-2563eb?style=flat-square)](https://dujingning.github.io/toolbox/)
![纯前端](https://img.shields.io/badge/纯前端-零依赖-16a34a?style=flat-square)
![离线可用](https://img.shields.io/badge/离线-可用-16a34a?style=flat-square)

一组开箱即用的浏览器小工具。所有计算都在本地完成，**不联网、不上传任何数据**。

👉 **在线使用：<https://dujingning.github.io/toolbox/>**

## 工具列表

| 工具 | 在线打开 | 主要功能 |
| --- | --- | --- |
| ▦ 文本转二维码 | [打开](https://dujingning.github.io/toolbox/tools/qrcode.html) | 支持中文 / emoji，可调纠错级别、尺寸、边距、颜色；下载 PNG / SVG，复制图片 |
| { } JSON 格式化 / 校验 | [打开](https://dujingning.github.io/toolbox/tools/json.html) | 美化、压缩、键排序；语法错误精确到行列 |
| ⇄ Base64 / URL 编解码 | [打开](https://dujingning.github.io/toolbox/tools/base64-url.html) | UTF-8 安全，支持 URL-safe Base64，组件 / 整个 URL 两种编码方式 |
| ⚙ 时间戳 / 哈希 / 密码 | [打开](https://dujingning.github.io/toolbox/tools/misc.html) | 时间戳与日期互转（秒 / 毫秒自动识别）；MD5、SHA-1/256/384/512；安全随机密码 |
| 🎨 颜色转换 / 取色 | [打开](https://dujingning.github.io/toolbox/tools/color.html) | HEX / RGB / HSL / HSV / CMYK 互转；屏幕吸管、图片取色；色阶配色；WCAG 对比度检查 |
| 🖼 图片转 Base64 | [打开](https://dujingning.github.io/toolbox/tools/image-base64.html) | 批量生成 Data URI / CSS / HTML / Markdown；可转格式、压缩、限宽；Base64 还原图片 |

## 特点

- **隐私安全**：没有后端，也没有统计脚本，输入的内容不会离开你的浏览器。
- **零依赖**：每个工具都是一个自包含的 HTML 文件，不加载任何 CDN 资源，断网也能用。
- **随取随用**：单个文件可以直接拷走、发给别人，或放进内网使用。
- **深色模式**：自动跟随系统主题，手机上也能正常使用。

## 本地使用

```bash
git clone https://github.com/dujingning/toolbox.git
```

然后用浏览器直接打开 `index.html`，或者打开 `tools/` 下的任意单个工具，不需要安装或构建。

## 浏览器兼容

推荐使用最新版 Chrome、Edge、Firefox 或 Safari。以下功能依赖浏览器支持：

| 功能 | 说明 |
| --- | --- |
| 屏幕取色 | 使用 EyeDropper API，仅 Chrome / Edge 支持；其他浏览器可以用图片取色代替 |
| 复制图片到剪贴板 | 部分浏览器不支持，可以改用下载 |
| SHA 系列哈希 | 需要 Web Crypto，通过 `file://` 或 HTTPS 打开都可以使用 |

## 目录结构

```text
toolbox/
├── index.html            # 首页：工具导航与搜索
└── tools/
    ├── qrcode.html       # 文本转二维码
    ├── json.html         # JSON 格式化 / 校验
    ├── base64-url.html   # Base64 / URL 编解码
    ├── misc.html         # 时间戳 / 哈希 / 密码
    ├── color.html        # 颜色转换 / 取色
    └── image-base64.html # 图片转 Base64
```

## 添加新工具

1. 在 `tools/` 下新建一个自包含的 `.html` 文件，样式和脚本都写在文件内，不引用外部资源。
2. 页面顶部加上返回链接：`<a class="back" href="../index.html">← 返回工具集</a>`。
3. 在 `index.html` 的工具列表中加一张卡片，`data-k` 填写搜索关键词。
4. 在本 README 的工具列表中补上一行。

推送到 `main` 分支后，GitHub Pages 会自动更新。
