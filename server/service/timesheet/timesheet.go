package timesheet

import (
	"context"

	"github.com/YudhistiraTA/hh-timesheet/model"
)

type TimesheetRepository interface {
	GetUser(ctx context.Context) (model.User, error)
	PutUser(ctx context.Context, id int, user *model.User) error
	GetProjects(ctx context.Context) ([]model.Project, error)
	GetActivities(ctx context.Context, projects []string, search string) ([]model.Activity, error)
	CreateActivity(ctx context.Context, activity *model.Activity) (err error)
}

type TimesheetService struct {
	Repo TimesheetRepository
}

func NewTimesheetService(repo TimesheetRepository) *TimesheetService {
	return &TimesheetService{Repo: repo}
}

func (s *TimesheetService) GetUser(ctx context.Context) (model.User, error) {
	return s.Repo.GetUser(ctx)
}

func (s *TimesheetService) PutUser(ctx context.Context, id int, user *model.User) error {
	return s.Repo.PutUser(ctx, id, user)
}

func (s *TimesheetService) GetProjects(ctx context.Context) ([]model.Project, error) {
	return s.Repo.GetProjects(ctx)
}

func (s *TimesheetService) GetActivities(ctx context.Context, projects []string, search string) ([]model.Activity, error) {
	return s.Repo.GetActivities(ctx, projects, search)
}

func (s *TimesheetService) CreateActivity(ctx context.Context, activity *model.Activity) error {
	return s.Repo.CreateActivity(ctx, activity)
}
