package main

import (
	"encoding/json"
	"net/http"
	"time"
)

type ScanReq struct {
	Type    string        `json:"scanType"`
	Test    string        `json:"scanTest"`
	Timeout time.Duration `json:"timeout"`
}

func startScanHandle(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ScanReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request structure", http.StatusBadRequest)
		return
	}

	// somehow implement in here the scan logic and also resulting it on the web
}

func main() {
	http.HandleFunc("/start", startScanHandle)
	http.ListenAndServe(":1769", nil)
}
