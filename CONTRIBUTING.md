# 参与贡献

感谢你愿意改进这个项目！提建议、报问题、改代码都很欢迎。

- 有新工具的想法：[提交新工具建议](https://github.com/dujingning/toolbox/issues/new?template=new-tool.yml)
- 发现问题：[反馈 Bug](https://github.com/dujingning/toolbox/issues/new?template=bug.yml)
- 想直接改代码：阅读下面的说明，然后提交 Pull Request

## 设计原则

提交改动前，请确认符合这几条，它们是这个项目存在的意义：

1. **纯本地运行**：不发起任何网络请求，不引入统计、广告或第三方脚本。
2. **零依赖**：不使用 CDN、npm 包或构建工具。需要的算法（比如二维码编码、MD5）直接写在页面里。
3. **单文件自包含**：每个工具页拷走后都能单独打开使用。
4. **即输即得**：能实时出结果的就不要让用户再点按钮；内容用 `TB.persist` 保存在本机，刷新不丢。
5. **照顾手机和深色模式**：在 390px 宽度下布局正常，颜色只用 `shared/base.css` 里定义的变量。
6. **界面文字使用简体中文**。

## 目录结构

```text
toolbox/
├── index.html              # 首页：工具卡片由 shared/base.js 中的 TOOLS 列表生成
├── tools/                  # 每个工具一个自包含的 HTML 文件
│   └── misc.html           # 旧地址跳转页（原「时间戳 / 哈希 / 密码」），请勿删除
├── shared/
│   ├── base.css            # 公共样式：颜色变量、主题、按钮、表单、卡片等
│   └── base.js             # 公共脚本：工具列表、顶栏导航、图标、提示、复制、草稿保存
├── scripts/
│   └── sync_shared.py      # 把 shared/ 内联进每个页面
└── assets/                 # README 使用的 Logo 和截图
```

## 公共样式与脚本

页面中 `/* @shared-css:start */` 到 `/* @shared-css:end */`、`/* @shared-js:start */` 到 `/* @shared-js:end */` 之间的内容由脚本生成，**不要直接修改**，请改 `shared/` 里的源文件，然后运行：

```bash
python3 scripts/sync_shared.py          # 同步到所有页面
python3 scripts/sync_shared.py --check  # 检查是否已同步（未同步时退出码为 1）
```

公共脚本提供的常用方法（全局对象 `TB`）：

| 方法 | 用途 |
| --- | --- |
| `TB.copy(text, 提示)` | 复制到剪贴板并显示提示，自动兼容旧浏览器 |
| `TB.toast(文字, "ok" \| "err")` | 底部轻提示 |
| `TB.persist(元素, 键名)` | 输入框 / 复选框内容自动保存在本机 |
| `TB.seg(元素, 回调, 键名)` | 分段选择控件，可选保存选项 |
| `TB.fileDrop(区域, input, 回调)` | 点击、拖放、粘贴选择文件 |
| `TB.download(数据, 文件名)` | 触发下载 |
| `TB.svg(TB.I.图标名)` | 内置 SVG 图标 |

## 添加新工具

1. 复制一个现有工具页（例如 `tools/password.html`）作为模板，修改 `<html>` 上的 `data-tool` 和页面内容。
2. 在 `shared/base.js` 的 `TOOLS` 列表中加入新工具（名称、简称、图标、描述、搜索关键词）。首页卡片和顶部导航会自动更新。
3. 运行 `python3 scripts/sync_shared.py`。
4. 在 `README.md` 的工具列表中补上一行。

## 本地预览与自测

直接用浏览器打开 `index.html` 即可，不需要启动服务。提交前请至少检查：

- 在 Chrome 和 Firefox 中打开，控制台没有报错；
- 浏览器窗口缩到手机宽度（约 390px）时布局正常；
- 切换到深色主题后文字清晰可读；
- 运行 `python3 scripts/sync_shared.py --check` 通过。

## 提交 Pull Request

- 一个 PR 只做一件事，标题简要说明改了什么，例如「新增：正则表达式测试工具」。
- 涉及界面的改动，请在描述中附上截图。
- 推送到 `main` 分支后，GitHub Pages 会自动更新在线版本。

提交代码即表示你同意以 [MIT 许可证](LICENSE) 发布你的贡献。
