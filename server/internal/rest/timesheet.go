package rest

import (
	"net/http"
	"strconv"

	"github.com/YudhistiraTA/hh-timesheet/internal/logger"
	"github.com/YudhistiraTA/hh-timesheet/internal/middlewares"
	"github.com/YudhistiraTA/hh-timesheet/internal/response"
	"github.com/YudhistiraTA/hh-timesheet/service/timesheet"
	"github.com/go-chi/chi"
	"go.uber.org/zap"
)

type Handler struct {
	ts  *timesheet.TimesheetService
	log *zap.Logger
}

func TimesheetService(tr *timesheet.TimesheetService, log *zap.Logger) *Handler {
	return &Handler{
		ts:  tr,
		log: log,
	}
}

func Timesheet(r chi.Router, log *zap.Logger, ts *timesheet.TimesheetService) {
	h := TimesheetService(ts, log)
	r.Use(middlewares.IgnoreRequest, middlewares.Timeout, middlewares.CORS, logger.NewLoggingMiddleware(log))
	r.Get("/", h.root)
	r.Get("/{id}", h.GetArticle)
}

func (h *Handler) root(w http.ResponseWriter, r *http.Request) {
	response.WriteSuccess(w, nil, http.StatusOK)
}

func (h *Handler) GetArticle(w http.ResponseWriter, r *http.Request) {
	articleID, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request ID", nil)
		return
	}
	article, err := h.ts.FindByID(r.Context(), articleID)
	if err != nil {
		response.WriteError(w, err, "Article not found", nil)
		return
	}

	response.WriteSuccess(w, article, http.StatusOK)
}
