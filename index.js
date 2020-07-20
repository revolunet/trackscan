const puppeteer = require("puppeteer");

const trackers = [
  {
    id: "google fonts",
    check: (url) =>
      url.match(/fonts\.googleapis\.com/) || url.match(/fonts\.gstatic\.com/),
    message:
      "Host the font locally with https://github.com/neverpanic/google-font-download",
  },
  {
    id: "google maps",
    check: (url) =>
      url.match(/maps\.googleapis\.com/) || url.match(/maps\.gstatic\.com/),
    message: "Use OpenStreetMap with https://switch2osm.org/the-basics/",
  },
  {
    id: "google tag manager",
    check: (url) => url.match(/www\.googletagmanager\.com/),
    message: "Use hosted Matomo instance",
  },
  {
    id: "google analytics",
    check: (url) => url.match(/www\.google-analytics\.com/),
    message: "Use hosted Matomo instance",
  },
  {
    id: "google",
    check: (url) => url.match(/google\.com/) || url.match(/gstatic\.com/),
    message: "Use hosted Matomo instance",
  },
  {
    id: "xiti",
    check: (url) => url.match(/logs\d*\.xiti\.com/),
    message: "Use hosted Matomo instance",
  },
  {
    id: "6tzen",
    check: (url) => url.match(/stats\.6tzen\.fr/),
    message: "Use hosted Matomo instance",
  },
  {
    id: "jsdelivr",
    check: (url) => url.match(/cdn\.jsdelivr\.net/),
    message: "Host files locally",
  },
  {
    id: "apple",
    check: (url) => url.match(/static\.cdn-apple\.com/),
    message: "Host files locally",
  },
  {
    id: "batch push notifications",
    check: (url) => url.match(/cdn\.jsdelivr\.net/),
    message: "Load on demand only",
  },
  {
    id: "polyfill.io",
    check: (url) => url.match(/polyfill\.io/),
    message: "Bundle your polyfills and host locally",
  },
  {
    id: "amplitude.com",
    check: (url) => url.match(/amplitude\.com/),
    message: "Use hosted Matomo instance",
  },
  {
    id: "faktor.io",
    check: (url) => url.match(/faktor\.io/),
    message: "Use hosted Matomo instance",
  },
];

const hostname = (url) => url.replace(/^https?:\/\/([^/]+)\/?.*/, "$1");

const checkUrl = (requestUrl) => {
  const match = trackers.find((tracker) => tracker.check(requestUrl));
  if (match) {
    return `${match.id}: "${requestUrl}" : ${match.message}`;
  } else {
    return "Unknown source: " + requestUrl;
  }
};

const testUrl = (url) => {
  puppeteer.launch().then(async (browser) => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    const results = [];
    page.on("request", (interceptedRequest) => {
      const requestUrl = interceptedRequest.url();
      if (
        !requestUrl.match(/^data:/) &&
        hostname(url) !== hostname(requestUrl)
      ) {
        results.push(checkUrl(requestUrl));
      }
      interceptedRequest.continue();
    });
    const response = await page.goto(url);
    const headers = response.headers();
    console.log("response headers", headers);
    const cookies = await page.cookies();
    console.log("cookies", cookies);
    console.log(results.join("\n"));
    await browser.close();
  });
};

if (require.main === module) {
  // "https://www.liberation.fr"
  testUrl(process.argv[2]);
}
