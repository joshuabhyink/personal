UPDATE trips
SET (date, miles_traveled, outside_temp) = ($2, $3, $4)
WHERE trip_id = $1 
RETURNING *;