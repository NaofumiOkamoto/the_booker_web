import express, { Request, Response } from 'express';
import mysql from 'mysql2';

const app = express();
const port = 8080;

// データベース接続の設定
// const db = mysql.createConnection({
//   host: 'db',
//   user: 'root',
//   password: 'password',
//   database: 'mydb',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('データベース接続エラー:', err);
//   } else {
//     console.log('データベースに接続しました');
//   }
// });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});