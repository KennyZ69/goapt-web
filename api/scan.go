package api

import "time"

type ScanResult struct {
	Report   string        `json:"report"`
	Source   string        `json:"source"`
	Duration time.Duration `json:"duration"`
	Error    error         `json:"error"`
}

type NetScan struct {
	SourceIP string        `json:"source_ip"`
	Timeout  time.Duration `json:"timeout"`
}

func scan(req ScanReq) ScanResult {
	resp := ScanResult{}

	switch req.Type {
	case "network":
		switch req.Test {
		case "port-scan":
		case "ping-scan":
		case "mapper":
		case "general-scan":
		}
	}
	// Here I need to decide on what scan to run based on the request sent
	// and make response as json for it
}
