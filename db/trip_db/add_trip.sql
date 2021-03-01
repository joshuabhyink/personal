INSERT INTO trips (date, miles_traveled, outside_temp)
VALUES ($1, $2, $3)
RETURNING *;