import time
from playwright.sync_api import sync_playwright

def run_benchmark():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Block external requests to avoid timeouts
        page.route("**/*", lambda route: route.continue_() if route.request.url.startswith("file://") else route.fulfill(status=200, body=""))

        import os
        filepath = "file://" + os.path.abspath("Simple_Past_Interactive_Practice_by_lovable.html")
        page.goto(filepath)

        # We need to run refreshProgressBar many times

        js_code = """
        () => {
            const start = performance.now();
            for (let i = 0; i < 100000; i++) {
                sessionState.refreshProgressBar();
            }
            return performance.now() - start;
        }
        """

        time_taken = page.evaluate(js_code)
        print(f"Time taken for 100,000 calls: {time_taken:.2f} ms")

        browser.close()

if __name__ == "__main__":
    run_benchmark()