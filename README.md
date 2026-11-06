# 在线工具集

纯前端的小工具合集。每个工具都是独立的单文件 HTML，无任何外部依赖，可离线使用，数据不会上传。

| 工具 | 文件 | 功能 |
| --- | --- | --- |
| 文本转二维码 | `tools/qrcode.html` | 支持中文 / emoji，可调纠错级别、尺寸、颜色，下载 PNG / SVG |
| JSON 格式化 / 校验 | `tools/json.html` | 美化、压缩、键排序，语法错误定位到行列 |
| Base64 / URL 编解码 | `tools/base64-url.html` | UTF-8 安全，支持 URL-safe Base64 |
| 时间戳 / 哈希 / 密码 | `tools/misc.html` | 秒 / 毫秒自动识别，MD5 / SHA-1 / SHA-256 / SHA-384 / SHA-512，安全随机密码 |

## 使用

- 本地：直接用浏览器打开 `index.html`。
- 在线：开启 GitHub Pages（Settings → Pages → 从 `main` 分支根目录部署）。

## 添加新工具

1. 在 `tools/` 下新建一个自包含的 `.html` 文件，顶部加 `<a href="../index.html">← 返回工具集</a>`。
2. 在 `index.html` 的工具列表里加一张卡片（`data-k` 填搜索关键词）。
