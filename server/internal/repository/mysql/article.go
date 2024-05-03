package mysql

import (
	"context"
	"database/sql"

	"github.com/YudhistiraTA/hh-timesheet/model"
)

type TimesheetRepository struct {
	DB *sql.DB
}

func NewTimesheetRepository(db *sql.DB) *TimesheetRepository {
	return &TimesheetRepository{DB: db}
}

func (r *TimesheetRepository) FindByID(ctx context.Context, id int) (res model.Timesheet, err error) {
	query := "SELECT id, title, content, category, created_at, updated_at, status FROM posts WHERE id = ?"
	stmt, err := r.DB.PrepareContext(ctx, query)
	if err != nil {
		return model.Timesheet{}, err
	}
	row := stmt.QueryRowContext(ctx, id)
	res = model.Timesheet{}
	err = row.Scan(&res.ID, &res.Title, &res.Content, &res.Category, &res.CreatedAt, &res.UpdatedAt, &res.Status)

	return
}
