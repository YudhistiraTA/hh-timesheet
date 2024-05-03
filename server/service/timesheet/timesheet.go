package timesheet

import (
	"context"

	"github.com/YudhistiraTA/hh-timesheet/model"
)

type TimesheetRepository interface {
	FindByID(ctx context.Context, id int) (model.Timesheet, error)
}

type TimesheetService struct {
	Repo TimesheetRepository
}

func NewTimesheetService(repo TimesheetRepository) *TimesheetService {
	return &TimesheetService{Repo: repo}
}

func (s *TimesheetService) FindByID(ctx context.Context, id int) (model.Timesheet, error) {
	return s.Repo.FindByID(ctx, id)
}
