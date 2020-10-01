const puppeteer = require("puppeteer");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const pAll = require("p-all");

const hosts = require("./hosts.json");

const analyseUrl = require("./src/analyseUrl");

const startScan = async () => {
  // open the database
  const db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  await db.run(
    "CREATE TABLE IF NOT EXISTS urls (url TEXT PRIMARY KEY UNIQUE, valid BOOL DEFAULT FALSE, updated_at text DEFAULT (strftime('%Y-%m-%d %H:%M:%S:%s','now', 'localtime')));"
  );

  await db.run(
    "CREATE TABLE IF NOT EXISTS trackers (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, type TEXT, value TEXT, updated_at text DEFAULT (strftime('%Y-%m-%d %H:%M:%S:%s','now', 'localtime')));"
  );

  // start scanning and persit results in sqlite
  return puppeteer.launch().then(async (browser) => {
    await pAll(
      hosts.map((url) => async () => {
        console.log("url", url);

        const exist = await db.get(
          "select count(url) as count from urls where url = ?",
          [url]
        );

        if (exist.count > 0) {
          // skip existing urls in DB
          return Promise.resolve();
        }

        await db.get(
          `INSERT INTO urls(url) VALUES(?) ON CONFLICT(url) DO UPDATE SET url=excluded.url;`,
          [url]
        );

        await db.run("DELETE from trackers where URL = ?", [url]);

        const { trackers, cookies } = await analyseUrl(browser, url);

        if (!trackers) {
          return Promise.resolve();
        } else {
          await db.run(`UPDATE urls set valid=TRUE where url=?;`, [url]);
          return pAll(
            trackers.map((track) => () =>
              db.run(
                `INSERT INTO trackers (url, type, value) VALUES(?, ?, ?);`,
                [url, track.type, track.value]
              )
            ),
            { concurrency: 1, stopOnError: false }
          );
        }
      }),
      { concurrency: 5, stopOnError: false }
    );
    browser.close();
  });

  db.close();
};

if (require.main === module) {
  startScan();
}
