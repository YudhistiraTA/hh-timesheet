package model

type User struct {
	ID   int    `json:"id,omitempty"`
	Name string `json:"name,omitempty" validate:"required,min=1"`
	Rate int    `json:"rate,omitempty" validate:"required,min=1"`
}

type Project struct {
	ID   int    `json:"id,omitempty"`
	Name string `json:"name,omitempty" validate:"required,min=1"`
}

type Activity struct {
	ID        int    `json:"id,omitempty"`
	Name      string `json:"name,omitempty" validate:"required,min=1"`
	DateStart string `json:"date_start,omitempty" validate:"required,min=1"`
	DateEnd   string `json:"date_end,omitempty" validate:"required,min=1"`
	ProjectID int    `json:"project_id,omitempty" validate:"required,min=1"`
	UserID    int    `json:"user_id,omitempty" validate:"required,min=1"`
}
