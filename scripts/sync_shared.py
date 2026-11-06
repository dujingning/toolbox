#!/usr/bin/env python3
"""把 shared/base.css 和 shared/base.js 内联到各页面的标记区间。

每个页面因此仍是自包含的单文件（可单独拷走、离线使用），公共部分只需在 shared/ 里改一处。

用法：
    python3 scripts/sync_shared.py          # 同步
    python3 scripts/sync_shared.py --check  # 只检查是否已同步，未同步时退出码为 1
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
BLOCKS = {
    "shared-css": (ROOT / "shared" / "base.css").read_text(encoding="utf-8").strip(),
    "shared-js": (ROOT / "shared" / "base.js").read_text(encoding="utf-8").strip(),
}
PAGES = [ROOT / "index.html", *sorted((ROOT / "tools").glob("*.html"))]


def fill(text: str) -> tuple[str, int]:
    total = 0
    for name, body in BLOCKS.items():
        pattern = re.compile(rf"(/\* @{name}:start \*/).*?(/\* @{name}:end \*/)", re.S)
        text, n = pattern.subn(lambda m: f"{m.group(1)}\n{body}\n{m.group(2)}", text)
        total += n
    return text, total


def main() -> int:
    check = "--check" in sys.argv
    stale = []
    for page in PAGES:
        old = page.read_text(encoding="utf-8")
        new, n = fill(old)
        if n and new != old:
            stale.append(page.relative_to(ROOT).as_posix())
            if not check:
                page.write_text(new, encoding="utf-8")
    if check:
        if stale:
            print("以下页面未同步，请运行 python3 scripts/sync_shared.py：", *stale, sep="\n  ")
            return 1
        print("所有页面均已同步")
        return 0
    print("已同步：" + "、".join(stale) if stale else "所有页面均已是最新")
    return 0


if __name__ == "__main__":
    sys.exit(main())
