const trackers = [
  {
    id: "google fonts",
    check: (url) =>
      url.match(/fonts\.googleapis\.com/i) || url.match(/fonts\.gstatic\.com/i),
    message:
      "Host the font locally with https://github.com/neverpanic/google-font-download",
  },
  {
    id: "google maps",
    check: (url) =>
      url.match(/maps\.googleapis\.com/i) || url.match(/maps\.gstatic\.com/i),
    message: "Use OpenStreetMap with https://switch2osm.org/the-basics/",
  },
  {
    id: "google tag manager",
    check: (url) => url.match(/www\.googletagmanager\.com/i),
    message: "Use hosted Matomo instance",
  },
  {
    id: "google analytics",
    check: (url) =>
      url.match(/www\.google-analytics\.com/i) ||
      url.match(/ssl\.google-analytics\.com/i) ||
      url.match(/doubleclick\.net/i),
    message: "Use hosted Matomo instance",
  },
  {
    id: "google",
    check: (url) =>
      url.match(/google\.com/) ||
      url.match(/googleapis\.com/) ||
      url.match(/gstatic\.com/),
    message: "Use hosted Matomo instance",
  },
  {
    id: "xiti",
    check: (url) => url.match(/log\w\d*\.xiti\.com/i),
    message: "Use hosted Matomo instance",
  },
  {
    id: "6tzen",
    check: (url) => url.match(/stats\.6tzen\.fr/i),
    message: "Use hosted Matomo instance",
  },
  {
    id: "jsdelivr",
    check: (url) => url.match(/cdn\.jsdelivr\.net/i),
    message: "Host files locally",
  },
  {
    id: "cloudflare",
    check: (url) => url.match(/cdnjs\.cloudflare\.com/i),
    message: "Host files locally",
  },
  {
    id: "bootstrapcdn",
    check: (url) => url.match(/bootstrapcdn\.com/i),
    message: "Host files locally",
  },
  {
    id: "apple",
    check: (url) => url.match(/static\.cdn-apple\.com/i),
    message: "Host files locally",
  },
  {
    id: "batch push notifications",
    check: (url) => url.match(/cdn\.jsdelivr\.net/i),
    message: "Load on demand only",
  },
  {
    id: "polyfill.io",
    check: (url) => url.match(/polyfill\.io/i),
    message: "Bundle your polyfills and host locally",
  },
  {
    id: "amplitude.com",
    check: (url) => url.match(/amplitude\.com/i),
    message: "Use hosted Matomo instance",
  },
  {
    id: "faktor.io",
    check: (url) => url.match(/faktor\.io/i),
    message: "Use hosted Matomo instance",
  },
  {
    id: "twitter",
    check: (url) => url.match(/twitter\.com/i) || url.match(/twimg\.com/i),
    message: "Dont embed twitter scripts, use your own tweet embed",
  },
  {
    id: "instagram",
    check: (url) =>
      url.match(/instagram\.com/i) || url.match(/instagram\.com/i),
    message: "Dont embed instagram scripts, use your own embed",
  },
  {
    id: "facebook",
    check: (url) => url.match(/facebook\.com/i) || url.match(/facebook\.net/i),
    message: "Dont embed facebook scripts, use your own tweet embed",
  },
  {
    id: "youtube",
    check: (url) =>
      url.match(/youtube\.com/i) ||
      url.match(/youtu\.be/i) ||
      url.match(/ytimg\.com/i) ||
      url.match(/ggpht\.com/i) ||
      url.match(/youtube-nocookie\.com/i),
    message: "Dont embed youtube scripts, use peertube",
  },
  {
    id: "github",
    check: (url) => url.match(/githubusercontent\.com/i),
    message: "Dont link GitHub ressources, host them directly",
  },
  {
    id: "hotjar",
    check: (url) => url.match(/hotjar\.com/i),
    message: "Dont use HotJar",
  },
  {
    id: "FontAwesome",
    check: (url) => url.match(/fontawesome\.com/i),
    message: "Host fonts directly",
  },
  {
    id: "Wordpress",
    check: (url) => url.match(/\.wp\.com/i),
    message: "Use hosted Matomo instance",
  },
  {
    id: "Mailjet",
    check: (url) => url.match(/\.mailjet\.com/i),
    message: "Use hosted Matomo instance",
  },
  {
    id: "jQuery",
    check: (url) => url.match(/\.jquery\.com/i),
    message: "Hosts files directly",
  },
  {
    id: "addThis",
    check: (url) => url.match(/\.addthis\.com/i),
    message: "Hosts files directly",
  },
  {
    id: "vimeo",
    check: (url) => url.match(/\.vimeocdn\.com/i),
    message: "use peertube",
  },
];

module.exports = trackers;

if (require.main === module) {
  console.log(`id`);
  console.log(`---`);
  console.log(
    trackers
      .map((t) => t.id)
      .sort()
      .join("\n")
  );
}
