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

# コンパイルされたJavaScriptを実行
CMD ["node", "dist/index.js"]