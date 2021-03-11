SELECT * FROM cart_items
JOIN items ON cart_items.id = items.id
WHERE cart_items.cart_id = $1;