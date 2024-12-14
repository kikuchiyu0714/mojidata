const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

// SQLiteデータベースを開く
const dbpath = require.resolve("@mandel59/mojidata/dist/moji.db");
const db = new Database(dbpath);

// CSV出力関数
function exportTableToCSV(tableName, outputFilePath) {
    // テーブルのデータを取得
    const rows = db.prepare(`SELECT * FROM ${tableName}`).all();
    if (rows.length === 0) {
        console.log(`テーブル "${tableName}" は空です。`);
        return;
    }

    // ヘッダー行を作成
    const headers = Object.keys(rows[0]);
    const csvContent = [
        headers.join(","), // ヘッダーをCSV形式に変換
        ...rows.map(row =>
            headers.map(header => JSON.stringify(row[header] || "")).join(",")
        )
    ].join("\n");

    // CSVファイルに書き出し
    fs.writeFileSync(outputFilePath, csvContent, "utf8");
    console.log(`テーブル "${tableName}" を ${outputFilePath} にエクスポートしました。`);
}

// エクスポートするテーブル名（例: joyo）
const tableName = "joyo";

// CSV出力先ファイルパス
const outputFilePath = path.resolve(__dirname, `${tableName}.csv`);

// エクスポート実行
exportTableToCSV(tableName, outputFilePath);