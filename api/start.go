package api

import (
	"encoding/json"
	"net/http"
)

func StartScanHandle(w http.ResponseWriter, r *http.Request) {
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
	resp := scan(req)

	w.Header().Set("Content-Type", "application/json")
	// TODO: I need to get the result of given scan as json response and provide that to my frontend
	json.NewEncoder(w).Encode(resp)
}
