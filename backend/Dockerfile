FROM node:22

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# TypeScriptのコンパイル
COPY tsconfig.json ./
COPY ./src ./src
RUN npx tsc

# TypeScriptのソースコードをコピー
COPY ./tsconfig.json ./
COPY ./src ./src

# 開発サーバーを起動
CMD ["npm", "run", "dev"]