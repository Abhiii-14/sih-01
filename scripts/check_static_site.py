from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
HTML_DIR = ROOT / "html"


class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        attribute = "href" if tag in {"a", "link"} else "src" if tag == "script" else None
        if attribute and values.get(attribute):
            self.assets.append((attribute, values[attribute]))


errors = []
html_files = sorted(HTML_DIR.glob("*.html"))

if not html_files:
    errors.append("No HTML pages found in html/")

for html_file in html_files:
    parser = AssetParser()
    parser.feed(html_file.read_text(encoding="utf-8"))

    for attribute, reference in parser.assets:
        parsed = urlsplit(reference)
        if parsed.scheme or parsed.netloc or reference.startswith(("mailto:", "tel:", "#")):
            continue

        relative_path = unquote(parsed.path)
        if not relative_path:
            continue

        target = (html_file.parent / relative_path).resolve()
        if not target.is_relative_to(ROOT.resolve()):
            errors.append(f"{html_file.relative_to(ROOT)}: asset escapes repository: {reference}")
        elif not target.exists():
            errors.append(f"{html_file.relative_to(ROOT)}: missing {attribute}: {reference}")

if errors:
    print("Static site validation failed:")
    for error in errors:
        print(f"- {error}")
    raise SystemExit(1)

print(f"Static site validation passed: {len(html_files)} HTML pages checked.")
