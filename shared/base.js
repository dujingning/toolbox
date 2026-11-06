/* 工具集公共脚本：主题、顶栏导航、图标、轻提示、复制、本地草稿。修改后运行 python3 scripts/sync_shared.py */
const TB = (() => {
  const root = document.documentElement;
  const store = {
    get(k, d) { try { const v = localStorage.getItem("tb:" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("tb:" + k, JSON.stringify(v)); } catch {} },
  };
  const applyTheme = m => { if (m === "light" || m === "dark") root.dataset.theme = m; else delete root.dataset.theme; };
  applyTheme(store.get("theme", "auto")); // 尽早设置，避免闪烁

  const I = {
    box: '<path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M4 13h16"/>',
    qrcode: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 14v.01M14 21h.01M17.5 21H21v-3.5"/>',
    json: '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/>',
    codec: '<path d="M4 7h14l-3-3M20 17H6l3 3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    droplet: '<path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11z"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    download: '<path d="M12 4v11m-5-5 5 5 5-5M5 20h14"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
    swap: '<path d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    pick: '<path d="m15 6 3 3M4 20l1.5-4.5L14 7a2.1 2.1 0 0 1 3 3l-8.5 8.5z"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 15h.01M15 9h.01M9 15h.01"/>',
    file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    auto: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
  };
  const TOOLS = [
    { id: "qrcode", name: "文本转二维码", short: "二维码", icon: I.qrcode, desc: "支持中文与 emoji，可调纠错、尺寸与颜色，导出 PNG / SVG", keys: "二维码 qr qrcode 文本 链接 生成" },
    { id: "json", name: "JSON 格式化", short: "JSON", icon: I.json, desc: "美化、压缩、转义，实时校验并定位错误行列", keys: "json 格式化 校验 压缩 美化 转义" },
    { id: "base64-url", name: "Base64 / URL 编解码", short: "编解码", icon: I.codec, desc: "实时转换，UTF-8 安全，支持 URL-safe、文件与二进制结果", keys: "base64 url 编码 解码 encode decode" },
    { id: "timestamp", name: "时间戳转换", short: "时间戳", icon: I.clock, desc: "时间戳与日期互转，自动识别秒 / 毫秒 / 微秒", keys: "时间戳 timestamp unix 日期 时间 时区" },
    { id: "hash", name: "哈希计算", short: "哈希", icon: I.hash, desc: "MD5、SHA-1 / 256 / 384 / 512，支持文本和文件，可比对校验值", keys: "哈希 hash md5 sha sha1 sha256 校验 摘要 文件" },
    { id: "password", name: "随机密码", short: "密码", icon: I.lock, desc: "加密安全的随机密码，强度提示，可批量生成", keys: "密码 password 随机 生成 强度" },
    { id: "color", name: "颜色转换 / 取色", short: "颜色", icon: I.droplet, desc: "HEX / RGB / HSL / CMYK 互转，屏幕与图片取色，对比度检查", keys: "颜色 color 取色 吸管 hex rgb hsl cmyk 对比度 配色" },
    { id: "image-base64", name: "图片转 Base64", short: "图片 Base64", icon: I.image, desc: "图片与 Data URI 互转，可压缩、转格式、缩放", keys: "图片 image base64 data uri 压缩 转换 图片转" },
  ].map(t => ({ ...t, href: `tools/${t.id}.html` }));

  const svg = (p, cls = "ic") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const debounce = (fn, ms = 200) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const isDesktop = () => matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isNarrow = () => matchMedia("(max-width: 760px)").matches;
  const fmtSize = n => n < 1024 ? n + " B" : n < 1048576 ? (n / 1024).toFixed(1) + " KB" : (n / 1048576).toFixed(2) + " MB";

  let wrap;
  function toast(msg, type = "ok", ms = 1800) {
    if (!wrap) {
      wrap = document.createElement("div"); wrap.className = "toast-wrap";
      wrap.setAttribute("role", "status"); wrap.setAttribute("aria-live", "polite"); document.body.appendChild(wrap);
    }
    const t = document.createElement("div"); t.className = "toast " + type;
    t.innerHTML = svg(type === "err" ? I.alert : I.check) + "<span></span>"; t.lastChild.textContent = msg;
    wrap.appendChild(t);
    while (wrap.children.length > 3) wrap.firstChild.remove();
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 250); }, ms);
  }
  async function copy(text, label = "已复制到剪贴板") {
    if (text == null || text === "") { toast("没有可复制的内容", "err"); return false; }
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea"); ta.value = text; ta.style.cssText = "position:fixed;top:0;opacity:0";
      document.body.appendChild(ta); ta.select(); const ok = document.execCommand("copy"); ta.remove();
      if (!ok) { toast("复制失败，请手动选择后复制", "err"); return false; }
    }
    toast(label); return true;
  }
  function download(data, name, type) {
    const blob = data instanceof Blob ? data : new Blob([data], { type: type || "application/octet-stream" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  }
  // 输入内容自动保存在本机浏览器，刷新不丢
  function persist(el, key) {
    const v = store.get(key);
    if (v !== undefined) { if (el.type === "checkbox") el.checked = v; else el.value = v; }
    const save = debounce(() => store.set(key, el.type === "checkbox" ? el.checked : el.value), 300);
    el.addEventListener("input", save); el.addEventListener("change", save);
  }
  // 分段选择控件：<div class="seg" data-value="默认"><button data-v="a">…</button></div>
  function seg(el, onChange, key) {
    const btns = [...el.querySelectorAll("button[data-v]")];
    const api = {
      value: null,
      set(v, silent) {
        if (!btns.some(b => b.dataset.v === v)) v = btns[0].dataset.v;
        api.value = v;
        btns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.v === v)));
        if (key) store.set(key, v);
        if (!silent && onChange) onChange(v);
      },
    };
    btns.forEach(b => { b.type = "button"; b.addEventListener("click", () => api.set(b.dataset.v)); });
    api.set(key ? store.get(key, el.dataset.value) : el.dataset.value, true);
    return api;
  }
  // 拖放 / 点击 / 粘贴 选择文件
  function fileDrop(el, input, onFiles, { paste = true } = {}) {
    el.addEventListener("click", () => input.click());
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); } });
    input.addEventListener("change", () => { if (input.files.length) onFiles([...input.files]); input.value = ""; });
    ["dragenter", "dragover"].forEach(t => el.addEventListener(t, e => { e.preventDefault(); el.classList.add("over"); }));
    ["dragleave", "drop"].forEach(t => el.addEventListener(t, () => el.classList.remove("over")));
    el.addEventListener("drop", e => { e.preventDefault(); if (e.dataTransfer.files.length) onFiles([...e.dataTransfer.files]); });
    if (paste) document.addEventListener("paste", e => {
      if (typeof paste === "function" && !paste()) return;
      const fs = [...(e.clipboardData?.items || [])].filter(i => i.kind === "file").map(i => i.getAsFile()).filter(Boolean);
      if (fs.length) { e.preventDefault(); onFiles(fs); }
    });
  }

  const THEMES = { auto: ["跟随系统", I.auto], light: ["浅色", I.sun], dark: ["深色", I.moon] };
  function buildHeader() {
    const h = document.getElementById("tb-header"); if (!h) return;
    const cur = root.dataset.tool, base = root.dataset.root || "";
    const nav = cur
      ? `<nav class="toolnav" aria-label="切换工具">${TOOLS.map(t => `<a href="${base}${t.href}"${t.id === cur ? ' aria-current="page"' : ""}>${svg(t.icon)}<span>${t.short}</span></a>`).join("")}</nav>`
      : '<div class="spacer"></div>';
    h.innerHTML = `<a class="brand" href="${base}index.html" aria-label="返回工具集首页"><span class="logo">${svg(I.box)}</span><span class="brand-text">工具集</span></a>${nav}<button class="btn btn-ghost btn-icon" id="tb-theme" type="button"></button>`;
    const btn = h.querySelector("#tb-theme");
    const paint = () => { const m = store.get("theme", "auto"), [n, ic] = THEMES[m] || THEMES.auto; btn.innerHTML = svg(ic); btn.title = btn.ariaLabel = `主题：${n}（点击切换）`; };
    btn.onclick = () => { const order = ["auto", "light", "dark"], m = order[(order.indexOf(store.get("theme", "auto")) + 1) % 3]; store.set("theme", m); applyTheme(m); paint(); toast("主题：" + THEMES[m][0]); };
    paint();
    const a = h.querySelector("[aria-current]"), n = h.querySelector(".toolnav");
    if (a && n) n.scrollLeft = a.offsetLeft - n.clientWidth / 2 + a.offsetWidth / 2;
  }
  function favicon() {
    const t = TOOLS.find(x => x.id === root.dataset.tool), p = t ? t.icon : I.box;
    const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2563eb"/><g transform="translate(5 5) scale(.917)" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${p.replace(/currentColor/g, "#fff")}</g></svg>`;
    const l = document.createElement("link"); l.rel = "icon"; l.href = "data:image/svg+xml," + encodeURIComponent(s); document.head.appendChild(l);
  }
  favicon();
  document.addEventListener("DOMContentLoaded", () => {
    buildHeader();
    const af = document.querySelector("[data-autofocus]");
    if (af && isDesktop()) af.focus({ preventScroll: true }); // 手机上不自动弹出键盘
  });

  return { TOOLS, I, svg, esc, debounce, isDesktop, isNarrow, fmtSize, store, toast, copy, download, persist, seg, fileDrop };
})();
