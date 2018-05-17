SELECT *
FROM cart
WHERE user_id IN
    (SELECT user_id
    FROM users_t
    WHERE user_id = $1
    )
ORDER BY product_price DESC