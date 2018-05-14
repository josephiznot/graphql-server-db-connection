INSERT INTO users
(user_name, user_email, first_name, last_name, phone_number, user_password)
VALUES($1, $2, $3, $4, $5, $6)
RETURNING *