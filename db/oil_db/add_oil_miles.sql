INSERT INTO oil (oil_miles)
VALUES ($1)
RETURNING *;