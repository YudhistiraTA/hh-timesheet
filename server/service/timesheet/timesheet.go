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
	UpdateActivity(ctx context.Context, id int, activity *model.Activity) (err error)
	DeleteActivity(ctx context.Context, id int) (err error)
	PostProject(ctx context.Context, project *model.Project) (err error)
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

func (s *TimesheetService) UpdateActivity(ctx context.Context, id int, activity *model.Activity) error {
	return s.Repo.UpdateActivity(ctx, id, activity)
}

func (s *TimesheetService) DeleteActivity(ctx context.Context, id int) error {
	return s.Repo.DeleteActivity(ctx, id)
}

func (s *TimesheetService) PostProject(ctx context.Context, project *model.Project) error {
	return s.Repo.PostProject(ctx, project)
}
