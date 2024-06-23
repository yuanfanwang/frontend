# ベースイメージ
FROM node:14

# 作業ディレクトリの設定
WORKDIR /app

# パッケージファイルをコピーしてインストール
COPY package.json ./
RUN npm install
RUN npm install axios

# アプリケーションファイルをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# アプリケーションを起動
CMD ["npm", "start"]

# ポート3000を公開
EXPOSE 3000