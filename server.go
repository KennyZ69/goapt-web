package main

import (
	"log/slog"
	"net/http"
	"path/filepath"
	"text/template"

	"github.com/KennyZ69/goapt-web.git/api"
)

func main() {
	mux := http.NewServeMux()

	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmpl := filepath.Join("templates", "index.html")
		t, err := template.ParseFiles(tmpl)
		if err != nil || t == nil {
			http.Error(w, "Unable to load a template", http.StatusInternalServerError)
		}

		t.Execute(w, nil)
	})

	mux.HandleFunc("/start", api.StartScanHandle)

	slog.Info("Starting server on :1769")
	http.ListenAndServe(":1769", mux)
}
