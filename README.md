# 🧰 在线工具集

[![在线访问](https://img.shields.io/badge/在线访问-dujingning.github.io%2Ftoolbox-2563eb?style=flat-square)](https://dujingning.github.io/toolbox/)
![纯前端](https://img.shields.io/badge/纯前端-零依赖-16a34a?style=flat-square)
![离线可用](https://img.shields.io/badge/离线-可用-16a34a?style=flat-square)

一组开箱即用的浏览器小工具。所有计算都在本地完成，**不联网、不上传任何数据**。

👉 **在线使用：<https://dujingning.github.io/toolbox/>**

## 工具列表

| 工具 | 在线打开 | 主要功能 |
| --- | --- | --- |
| ▦ 文本转二维码 | [打开](https://dujingning.github.io/toolbox/tools/qrcode.html) | 支持中文 / emoji，可调纠错级别、尺寸、颜色；导出 PNG / SVG、复制图片，生成分享链接 |
| { } JSON 格式化 | [打开](https://dujingning.github.io/toolbox/tools/json.html) | 粘贴即格式化，实时校验，错误定位到行列并给出中文说明；压缩、键排序、转义 |
| ⇄ Base64 / URL 编解码 | [打开](https://dujingning.github.io/toolbox/tools/base64-url.html) | 输入即转换，UTF-8 安全，支持 URL-safe、文件编码；二进制结果可预览并下载 |
| 🕒 时间戳转换 | [打开](https://dujingning.github.io/toolbox/tools/timestamp.html) | 时间戳与日期互转，自动识别秒 / 毫秒 / 微秒，支持日期选择器与多种格式 |
| # 哈希计算 | [打开](https://dujingning.github.io/toolbox/tools/hash.html) | MD5、SHA-1 / 256 / 384 / 512，支持文本和文件，可粘贴校验值自动比对 |
| 🔒 随机密码 | [打开](https://dujingning.github.io/toolbox/tools/password.html) | 加密安全随机数生成，强度提示，可排除易混淆字符，可批量生成 |
| 🎨 颜色转换 / 取色 | [打开](https://dujingning.github.io/toolbox/tools/color.html) | HEX / RGB / HSL / HSV / CMYK 互转；屏幕吸管、图片取色（支持触屏）；色阶配色；WCAG 对比度检查 |
| 🖼 图片转 Base64 | [打开](https://dujingning.github.io/toolbox/tools/image-base64.html) | 批量生成 Data URI / CSS / HTML / Markdown；可转格式、压缩、限宽；Base64 还原图片 |

## 特点

- **隐私安全**：没有后端，也没有统计脚本，输入的内容不会离开你的浏览器。
- **零依赖**：每个工具都是一个自包含的 HTML 文件，不加载任何 CDN 资源，断网也能用。
- **随取随用**：单个文件可以直接拷走、发给别人，或放进内网使用。
- **好用**：输入即出结果；内容自动保存在本机，刷新不丢；顶部导航可在工具间直接切换。
- **深色模式**：默认跟随系统，也可以在右上角手动切换；手机、平板上都能正常使用。

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
| 本地草稿保存 | 使用浏览器 localStorage，隐私模式下可能不会保留 |
| SHA 系列哈希 | 需要 Web Crypto，通过 `file://` 或 HTTPS 打开都可以使用 |

## 目录结构

```text
toolbox/
├── index.html              # 首页：工具导航与搜索
├── tools/
│   ├── qrcode.html         # 文本转二维码
│   ├── json.html           # JSON 格式化
│   ├── base64-url.html     # Base64 / URL 编解码
│   ├── timestamp.html      # 时间戳转换
│   ├── hash.html           # 哈希计算
│   ├── password.html       # 随机密码
│   ├── color.html          # 颜色转换 / 取色
│   ├── image-base64.html   # 图片转 Base64
│   └── misc.html           # 旧地址跳转页（原「时间戳 / 哈希 / 密码」）
├── shared/
│   ├── base.css            # 公共样式：主题、按钮、表单、卡片等
│   └── base.js             # 公共脚本：顶栏导航、工具列表、提示、复制、草稿保存
└── scripts/
    └── sync_shared.py      # 把 shared/ 内联进每个页面
```

## 维护说明

每个页面都是自包含的单文件，但公共的样式和脚本只在 `shared/` 里维护一份。页面中 `/* @shared-css:start */` 与 `/* @shared-js:start */` 标记之间的内容由脚本生成，**不要直接修改**。

```bash
python3 scripts/sync_shared.py          # 修改 shared/ 后，同步到所有页面
python3 scripts/sync_shared.py --check  # 检查是否已同步（未同步时退出码为 1）
```

## 添加新工具

1. 复制一个现有工具页（例如 `tools/password.html`）作为模板，修改 `<html>` 上的 `data-tool` 和页面内容。
2. 在 `shared/base.js` 的 `TOOLS` 列表中加入新工具（名称、简称、图标、描述、搜索关键词）。首页卡片和顶部导航会自动更新。
3. 运行 `python3 scripts/sync_shared.py`。
4. 在本 README 的工具列表中补上一行。

推送到 `main` 分支后，GitHub Pages 会自动更新。
