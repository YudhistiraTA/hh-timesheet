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

func (r *TimesheetRepository) GetUser(ctx context.Context) (res model.User, err error) {
	query := "SELECT id, name, rate FROM users LIMIT 1"
	stmt, err := r.DB.PrepareContext(ctx, query)
	if err != nil {
		return model.User{}, err
	}
	row := stmt.QueryRowContext(ctx)
	res = model.User{}
	err = row.Scan(&res.ID, &res.Name, &res.Rate)

	return
}

func (r *TimesheetRepository) PutUser(ctx context.Context, id int, user *model.User) (err error) {
	query := "UPDATE users SET name = ?, rate = ? WHERE id = ?"
	stmt, err := r.DB.PrepareContext(ctx, query)
	if err != nil {
		return err
	}
	_, err = stmt.ExecContext(ctx, user.Name, user.Rate, id)

	return
}

func (r *TimesheetRepository) GetProjects(ctx context.Context) (res []model.Project, err error) {
	query := "SELECT id, name FROM projects"
	stmt, err := r.DB.PrepareContext(ctx, query)
	if err != nil {
		return []model.Project{}, err
	}
	rows, err := stmt.QueryContext(ctx)
	if err != nil {
		return []model.Project{}, err
	}
	defer rows.Close()

	for rows.Next() {
		var project model.Project
		err = rows.Scan(&project.ID, &project.Name)
		if err != nil {
			return []model.Project{}, err
		}
		res = append(res, project)
	}

	return
}
