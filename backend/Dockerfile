# ベースイメージ
FROM golang:1.22.1-alpine3.19

# 作業ディレクトリの設定
WORKDIR /app

# 必要なパッケージのインストール
RUN apk add --no-cache ca-certificates
RUN go install github.com/cosmtrek/air@latest

# プロジェクトのファイルをコピー
COPY . .
COPY .air.toml .

# Goモジュールの依存関係をダウンロード
RUN go mod download

# アプリケーションのポートを公開
EXPOSE 8080

# air コマンドを実行
CMD ["air", "-c", ".air.toml"]