from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.rglob("*.html"))
BROKEN_TEXT_MARKERS = (
    "\ufffd",
    "\u00c3",
    "\u00e2\u20ac\u0153",
    "\u00e2\u20ac",
    "\u00ec",
    "\u00f0\u0178",
)
URL_ATTR_RE = re.compile(r"""(?:href|src)=["']([^"']+)["']""", re.IGNORECASE)


def is_external(value: str) -> bool:
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https", "mailto", "tel", "javascript", "data"} or value.startswith("//")


def resolve_local_url(source: Path, value: str) -> Path | None:
    value = value.strip()
    if not value or value.startswith("#") or is_external(value):
        return None

    path_part = unquote(value.split("#", 1)[0].split("?", 1)[0])
    if not path_part:
        return None
    if path_part.startswith("/myyoungji_new/"):
        path_part = "/" + path_part.removeprefix("/myyoungji_new/")

    if path_part.startswith("/"):
        candidate = ROOT / path_part.lstrip("/")
    else:
        candidate = source.parent / path_part

    if value.endswith("/") or candidate.is_dir():
        candidate = candidate / "index.html"

    return candidate.resolve()


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    for html_file in HTML_FILES:
        text = html_file.read_text(encoding="utf-8", errors="replace")
        rel_html = html_file.relative_to(ROOT)

        for marker in BROKEN_TEXT_MARKERS:
            if marker in text:
                warnings.append(f"{rel_html}: possible broken text marker {marker!r}")

        for match in URL_ATTR_RE.finditer(text):
            value = match.group(1)
            candidate = resolve_local_url(html_file, value)
            if candidate is None:
                continue
            try:
                candidate.relative_to(ROOT)
            except ValueError:
                errors.append(f"{rel_html}: link escapes repo: {value}")
                continue
            if not candidate.exists():
                errors.append(f"{rel_html}: missing local target: {value}")

    if warnings:
        print("Warnings:")
        for warning in warnings:
            print(f"  - {warning}")

    if errors:
        print("Errors:")
        for error in errors:
            print(f"  - {error}")
        return 1

    print(f"OK: checked {len(HTML_FILES)} HTML files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
