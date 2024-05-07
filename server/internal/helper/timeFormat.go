package helper

import "time"

func TimeFormat(utc string) (string, error) {
	t, err := time.Parse(time.RFC3339, utc)
	if err != nil {
		return "", err
	}
	return t.Format("2006-01-02"), nil
}
