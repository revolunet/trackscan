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
];

const hostname = (url) => url.replace(/^https?:\/\/([^/]+)\/?.*/, "$1");

const checkUrl = (requestUrl) => {
  const matches = trackers
    .filter((tracker) => tracker.check(requestUrl))
    .map((tracker) => `${tracker.id}: "${requestUrl}" : ${tracker.message}`);

  if (matches.length) {
    console.log(matches.join("\n"));
  } else {
    console.log("Unknown source:", requestUrl);
  }
};

const testUrl = (url) => {
  puppeteer.launch().then(async (browser) => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", (interceptedRequest) => {
      const requestUrl = interceptedRequest.url();
      if (hostname(url) !== hostname(requestUrl)) {
        checkUrl(requestUrl);
      }
      interceptedRequest.continue();
    });
    await page.goto(url);
    await browser.close();
  });
};

testUrl(
  "https://www.prefecturedepolice.interieur.gouv.fr/Demarches/Particulier/Documents-d-identite-et-de-voyage/Carte-nationale-d-identite-Passeport"
);
