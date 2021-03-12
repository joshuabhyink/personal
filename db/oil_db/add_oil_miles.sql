INSERT INTO oil (oil_miles, user_id)
VALUES ($1, $2)
RETURNING *;