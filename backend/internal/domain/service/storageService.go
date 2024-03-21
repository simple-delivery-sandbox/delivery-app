package service

import "io"

type StorageService interface {
	UploadFile(file io.Reader, fileName string) (*string, error)
}
