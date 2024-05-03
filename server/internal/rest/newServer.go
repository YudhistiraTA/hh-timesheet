package rest

import (
	"net/http"
	"time"

	"github.com/YudhistiraTA/hh-timesheet/model"
	"github.com/YudhistiraTA/hh-timesheet/service/timesheet"
	"github.com/go-chi/chi"
)

// NewServer creates a new HTTP server.
// It returns a pointer to the http.Server.
// Consumes the services to be started
// and the configuration for the server.
//
// It currently only accepts the user service.
func NewServer(conf model.ServerConfig, ts *timesheet.TimesheetService) *http.Server {
	r := chi.NewRouter()

	Timesheet(r, conf.Log, ts)

	return &http.Server{
		Addr:         conf.Addr,
		Handler:      r,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
}
