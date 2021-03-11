INSERT INTO trips (author_id, date, miles_traveled, outside_temp)
VALUES ($1, $2, $3, $4)
RETURNING *;