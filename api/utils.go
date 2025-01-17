package api

import "time"

type ScanReq struct {
	Type    string        `json:"scanType"`
	Test    string        `json:"scanTest"`
	Timeout time.Duration `json:"timeout"`
}

