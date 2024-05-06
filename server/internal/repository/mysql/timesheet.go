package mysql

import (
	"context"
	"database/sql"
	"strings"

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

func (r *TimesheetRepository) GetActivities(ctx context.Context, projects []string, search string) (res []model.Activity, err error) {
	baseQuery := "SELECT a.id, a.name, a.date_start, a.date_end, a.time_start, a.time_end, a.project_id, p.name FROM activities AS a JOIN projects AS p ON a.project_id = p.id"
	var query string
	var args []interface{}
	if len(projects) > 0 {
		placeholders := strings.Repeat("?,", len(projects)-1) + "?"
		query = baseQuery + " WHERE p.name IN (" + placeholders + ")"
		for _, project := range projects {
			args = append(args, project)
		}
	} else {
		query = baseQuery
	}
	if search != "" {
		if len(projects) > 0 {
			query += " AND a.name LIKE ?"
		} else {
			query += " WHERE a.name LIKE ?"
		}
		args = append(args, "%"+search+"%")
	}
	stmt, err := r.DB.PrepareContext(ctx, query)
	if err != nil {
		return []model.Activity{}, err
	}
	rows, err := stmt.QueryContext(ctx, args...)
	if err != nil {
		return []model.Activity{}, err
	}
	defer rows.Close()
	for rows.Next() {
		var activity model.Activity
		err = rows.Scan(&activity.ID, &activity.Name, &activity.DateStart, &activity.DateEnd, &activity.TimeStart, &activity.TimeEnd, &activity.ProjectID, &activity.ProjectName)
		if err != nil {
			return []model.Activity{}, err
		}
		res = append(res, activity)
	}

	return
}
