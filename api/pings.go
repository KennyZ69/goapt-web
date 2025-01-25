package api

import (
	"fmt"
	"net"
	"sync"
	"time"

	netlibk "github.com/KennyZ69/netlibK"
)

func PingScan(IParr []net.IP, timeout time.Duration) (*ScanResult, error) {
	var wg sync.WaitGroup

	start := time.Now()
	activeHosts := make(chan string)

	resp, err := discoverHosts(IParr, activeHosts, timeout, &wg)
	if err != nil {
		return nil, err
	}

	resp += fmt.Sprintf("List of active hosts: \n")

	for h := range activeHosts {
		resp += fmt.Sprintf("%s, ", h)
	}

	return &ScanResult{
		Report:   resp,
		Duration: time.Since(start),
		Error:    err,
	}, nil
}
func discoverHosts(IParr []net.IP, activeHosts chan string, timeout time.Duration, wg *sync.WaitGroup) (string, error) {
	var active, notActive, failed int     // counters
	p := []byte("Running ping scan ... ") // payload for pings

	for _, ip := range IParr {
		wg.Add(1)
		go func(targetIP net.IP) {
			defer wg.Done()
			_, a, err := netlibk.HigherLvlPing(targetIP, p, timeout)
			if err != nil {
				failed++
			}
			if a {
				active++
				activeHosts <- targetIP.String()
			} else {
				notActive++
			}
		}(ip)
	}

	go func() {
		wg.Wait()
		close(activeHosts)
	}()

	if failed == len(IParr) {
		msg := fmt.Sprintf("All found IPs (%d) couldn't be reached for some unexpected error\n", len(IParr))
		return msg, fmt.Errorf(msg)
	}

	return fmt.Sprintf("Ping scan results:\n	Active: %d\n	Failed: %d\n	Inactive: %d\n", active, failed, notActive), nil
}
