package rest

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/YudhistiraTA/hh-timesheet/internal/helper"
	"github.com/YudhistiraTA/hh-timesheet/internal/logger"
	"github.com/YudhistiraTA/hh-timesheet/internal/middlewares"
	"github.com/YudhistiraTA/hh-timesheet/internal/response"
	"github.com/YudhistiraTA/hh-timesheet/internal/validation"
	"github.com/YudhistiraTA/hh-timesheet/model"
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
	r.Get("/user", h.GetUser)
	r.Put("/user/{id}", h.PutUser)
	r.Get("/projects", h.GetProjects)
	r.Get("/activities", h.GetActivities)
	r.Post("/activities", h.CreateActivity)
	r.Put("/activities/{id}", h.UpdateActivity)
	r.Delete("/activities/{id}", h.DeleteActivity)
}

func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
	user, err := h.ts.GetUser(r.Context())
	if err != nil {
		h.log.Error("Failed to get user", zap.Error(err))
		response.WriteError(w, err, "User not found", nil)
		return
	}
	response.WriteSuccess(w, user, http.StatusOK)
}

func (h *Handler) PutUser(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		h.log.Error("Invalid request ID", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request ID", nil)
		return
	}
	var user model.User
	err = json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		h.log.Error("Invalid request body", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request body", nil)
		return
	}
	validationError := validation.ValidateStruct(user)
	if validationError != nil {
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request body", validationError)
		return
	}

	err = h.ts.PutUser(r.Context(), userId, &user)
	if err != nil {
		h.log.Error("Failed to update user", zap.Error(err))
		response.WriteError(w, err, "Failed to update user", nil)
		return
	}

	response.WriteSuccess(w, nil, http.StatusOK)
}

func (h *Handler) GetProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := h.ts.GetProjects(r.Context())
	if err != nil {
		h.log.Error("Failed to get projects", zap.Error(err))
		response.WriteError(w, err, "Projects not found", nil)
		return
	}
	response.WriteSuccess(w, projects, http.StatusOK)
}

func (h *Handler) GetActivities(w http.ResponseWriter, r *http.Request) {
	projectsParam := r.URL.Query().Get("projects")
	var projects []string
	if projectsParam != "" {
		projects = strings.Split(projectsParam, ",")
	}
	search := r.URL.Query().Get("search")
	activities, err := h.ts.GetActivities(r.Context(), projects, search)
	if err != nil {
		h.log.Error("Failed to get activities", zap.Error(err))
		response.WriteError(w, err, "Activities not found", nil)
		return
	}
	response.WriteSuccess(w, activities, http.StatusOK)
}

func (h *Handler) CreateActivity(w http.ResponseWriter, r *http.Request) {
	var activity model.Activity
	err := json.NewDecoder(r.Body).Decode(&activity)
	if err != nil {
		h.log.Error("Invalid request body", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request body", nil)
		return
	}
	activity.DateStart, err = helper.TimeFormat(activity.DateStart)
	if err != nil {
		h.log.Error("Invalid date format", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid date format", nil)
		return
	}
	activity.DateEnd, err = helper.TimeFormat(activity.DateEnd)
	if err != nil {
		h.log.Error("Invalid date format", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid date format", nil)
		return
	}
	validationError := validation.ValidateStruct(activity)
	if validationError != nil {
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request body", validationError)
		return
	}
	err = h.ts.CreateActivity(r.Context(), &activity)
	if err != nil {
		h.log.Error("Failed to create activity", zap.Error(err))
		response.WriteError(w, err, "Failed to create activity", nil)
		return
	}

	response.WriteSuccess(w, nil, http.StatusCreated)
}

func (h *Handler) UpdateActivity(w http.ResponseWriter, r *http.Request) {
	activityId, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		h.log.Error("Invalid request ID", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request ID", nil)
		return
	}
	var activity model.Activity
	err = json.NewDecoder(r.Body).Decode(&activity)
	if err != nil {
		h.log.Error("Invalid request body", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request body", nil)
		return
	}
	activity.DateStart, err = helper.TimeFormat(activity.DateStart)
	if err != nil {
		h.log.Error("Invalid date format", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid date format", nil)
		return
	}
	activity.DateEnd, err = helper.TimeFormat(activity.DateEnd)
	if err != nil {
		h.log.Error("Invalid date format", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid date format", nil)
		return
	}
	validationError := validation.ValidateStruct(activity)
	if validationError != nil {
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request body", validationError)
		return
	}
	err = h.ts.UpdateActivity(r.Context(), activityId, &activity)
	if err != nil {
		h.log.Error("Failed to update activity", zap.Error(err))
		response.WriteError(w, err, "Failed to update activity", nil)
		return
	}

	response.WriteSuccess(w, nil, http.StatusOK)
}

func (h *Handler) DeleteActivity(w http.ResponseWriter, r *http.Request) {
	activityId, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		h.log.Error("Invalid request ID", zap.Error(err))
		response.WriteError(w, response.ErrInvalidRequest, "Invalid request ID", nil)
		return
	}
	err = h.ts.DeleteActivity(r.Context(), activityId)
	if err != nil {
		h.log.Error("Failed to delete activity", zap.Error(err))
		response.WriteError(w, err, "Failed to delete activity", nil)
		return
	}

	response.WriteSuccess(w, nil, http.StatusOK)
}
