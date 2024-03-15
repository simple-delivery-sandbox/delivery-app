# ベースイメージ
FROM golang:1.22.1-alpine3.19

# 必要なパッケージのインストール
RUN apk --no-cache add ca-certificates && \
    go install github.com/cosmtrek/air@latest

# 作業ディレクトリの設定
WORKDIR /app

# プロジェクトのファイルをコピー
COPY . .

# Goモジュールの依存関係をダウンロード
RUN go mod download

# アプリケーションのポートを公開
EXPOSE 8080

# air コマンドを実行
CMD ["air", "-c", ".air.toml"]