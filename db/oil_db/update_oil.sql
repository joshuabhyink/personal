UPDATE oil 
SET oil_miles = oil_miles - $2
WHERE user_id = $1
RETURNING *;