INSERT INTO userinfo
    (auth_id, f_name, l_name, email)
VALUES($1, $2, $3, $4);
SELECT *
FROM userinfo
WHERE auth_id = $1;