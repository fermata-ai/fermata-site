"""Small checks for the static landing page's chosen headline."""
from html.parser import HTMLParser
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"


class HeadingText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.inside = False
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag == "h1":
            self.inside = True

    def handle_endtag(self, tag):
        if tag == "h1":
            self.inside = False

    def handle_data(self, data):
        if self.inside:
            self.parts.append(data)


class LandingHeadingTest(unittest.TestCase):
    def test_heading_ends_without_a_period(self):
        parser = HeadingText()
        parser.feed(HTML.read_text())
        self.assertEqual("".join(parser.parts).strip(), "Do research you fully understand")


    def test_heading_uses_plex_and_isolates_fully(self):
        source = HTML.read_text()
        self.assertRegex(source, r'h1\s*\{[^}]*font-family:\s*"IBM Plex Serif"')
        self.assertRegex(source, r'h1 em\s*\{[^}]*display:\s*block')
        for name in ("IBMPlexSerif-Medium.ttf", "IBMPlexSerif-MediumItalic.ttf", "IBMPlexSerif-OFL.txt"):
            self.assertTrue((ROOT / "assets" / name).is_file(), name)


if __name__ == "__main__":
    unittest.main()
