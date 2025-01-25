package api

import (
	"net"
	"time"
)

type ScanReq struct {
	Type       string        `json:"scanType"`
	Test       string        `json:"scanTest"`
	Timeout    time.Duration `json:"timeout"`
	NetOptions NetOp         `json:"netOptions"`
}

type NetOp struct {
	SourceIP  net.IP        `json:"sourceIP"`
	Ifi       net.Interface `json:"netifi"`
	TargetIPs []net.IP      `json:"targetIPs"`
	Ports     []int         `json:"ports"`
}

func parseIPs() []net.IP {

}
