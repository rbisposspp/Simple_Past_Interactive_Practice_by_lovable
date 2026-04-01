import os
from playwright.sync_api import sync_playwright

def check_errors():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        errors = []
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda exc: errors.append(str(exc)))

        filepath = "file://" + os.path.abspath("Simple_Past_Interactive_Practice_by_lovable.html")
        page.goto(filepath)

        # Give it a second to render
        page.wait_for_timeout(1000)

        if errors:
            print("Errors found:")
            for err in errors:
                print(err)
            exit(1)
        else:
            print("No errors found.")

        browser.close()

if __name__ == "__main__":
    check_errors()