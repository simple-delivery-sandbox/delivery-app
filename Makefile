# Makefile

# マイグレーションファイルが存在するディレクトリ
MIGRATIONS_DIR = db/migrations 

# MySQL接続情報
# MYSQL_URL = mysql://user:pass@tcp(localhost:3306)/master

migration-create:
	migrate create -ext sql -dir $(MIGRATIONS_DIR) -seq $(name)

migration-up:
	migrate -path $(MIGRATIONS_DIR) -database "mysql://user:pass@tcp(localhost:3306)/master" up

migration-down:
	migrate -path $(MIGRATIONS_DIR) -database "mysql://user:pass@tcp(localhost:3306)/master" down

.PHONY: migration-create migration-up migration-down