FROM node:22

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Viteサーバーを起動
CMD ["npm", "run", "dev", "--", "--host"]