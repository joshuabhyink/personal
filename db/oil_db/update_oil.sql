UPDATE oil 
SET oil_miles = oil_miles - $1
RETURNING *;