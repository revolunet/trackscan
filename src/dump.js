const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const dump = async () => {
  // open the database
  const db = await open({
    filename: "../db.sqlite",
    driver: sqlite3.Database,
  });

  const trackers = await db.all(
    `SELECT urls.url,trackers.type,trackers.value FROM urls, trackers where trackers.url=urls.url and trackers.type!="unknown" order by urls.url;`
  );
  const separator = "\t";
  const rows = [
    `url${separator}type${separator}value`,
    ...trackers.map(
      (t) => `${t.url}${separator}${t.type}${separator}${t.value}`
    ),
  ].join("\n");
  console.log(rows);
  db.close();
};

dump();
