package infrastructure

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
)

type LocalStorage struct{}

func NewLocalStorage() *LocalStorage {
	return &LocalStorage{}
}

func (s LocalStorage) UploadFile(file io.Reader, filename string) (*string, error) {
	savePath := filepath.Join("static", filename)
	out, err := os.Create(savePath)
	if err != nil {
		return nil, err
	}
	defer out.Close()

	_, err = io.Copy(out, file)
	if err != nil {
		return nil, err
	}

	fileURL := fmt.Sprintf("http://localhost:80/static/%s", filename)
	return &fileURL, nil
}
