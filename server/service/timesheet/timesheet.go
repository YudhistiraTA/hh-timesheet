package timesheet

import (
	"context"

	"github.com/YudhistiraTA/hh-timesheet/model"
)

type TimesheetRepository interface {
	GetUser(ctx context.Context) (model.User, error)
	PutUser(ctx context.Context, id int, user *model.User) error
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
