const Database = require("better-sqlite3");
const dbpath = require.resolve("@mandel59/mojidata/dist/moji.db");
const db = new Database(dbpath);
console.log(db.prepare("select * from mjsm_JIS包摂規準UCS統合規則 limit 20").all());