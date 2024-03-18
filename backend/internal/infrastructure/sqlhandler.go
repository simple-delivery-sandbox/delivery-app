package infrastructure

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

type SqlHandler struct {
	Conn *sql.DB
}

func NewSqlHandler() *SqlHandler {
	connStr := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True",
		"user",    // MYSQL_USER
		"pass",    // MYSQL_PASSWORD
		"db:3306", // ホスト名とポート番号
		"master",  // MYSQL_DATABASE
	)
	conn, err := sql.Open("mysql", connStr)
	if err != nil {
		panic(err)
	}
	if err = conn.Ping(); err != nil {
		panic(err)
	}
	return &SqlHandler{Conn: conn}
}

func (handler *SqlHandler) Execute(statement string, args ...interface{}) (sql.Result, error) {
	res, err := handler.Conn.Exec(statement, args...)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (handler *SqlHandler) Query(statement string, args ...interface{}) (*sql.Rows, error) {
	rows, err := handler.Conn.Query(statement, args...)
	if err != nil {
		return nil, err
	}
	return rows, nil
}

func (handler *SqlHandler) QueryRow(statement string, args ...interface{}) *sql.Row {
	return handler.Conn.QueryRow(statement, args...)
}
