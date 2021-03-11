SELECT * FROM users
JOIN trips 
ON (users.user_id = trips.author_id)
WHERE trip_id = $1;