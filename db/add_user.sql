INSERT INTO users
(user_name, user_email, first_name, last_name, phone_number)
VALUES($1, $2, $3, $4, $5)
RETURNING *