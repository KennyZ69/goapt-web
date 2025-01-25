package api

import (
	"fmt"
	"time"
)

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
	start := time.Now()

	switch req.Type {
	case "network":
		switch req.Test {
		case "port-scan":
		case "ping-scan":
			res, err := PingScan(req.NetOptions.TargetIPs, req.Timeout)
			if err != nil {
				resp.Error = err
				resp.Report = fmt.Sprintf("Some error occured during scan, please check the error logs\n")
			} else {
				resp = *res
			}
		case "mapper":
		case "general-scan":
		}
	}
	// Here I need to decide on what scan to run based on the request sent
	// and make response as json for it

	resp.Duration = time.Since(start) // Get the duration of ran tests

	return resp
}
