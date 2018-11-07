-- CREATE TABLE userinfo
-- (
--     id SERIAL PRIMARY KEY,
--     auth_id TEXT,
--     f_name VARCHAR(100),
--     l_name VARCHAR(100),
--     email TEXT,
--     country VARCHAR(100),
--     language VARCHAR(100),
--     age INTEGER

-- )

-- CREATE TABLE notes
-- (
--     note_id SERIAL PRIMARY KEY,
--     auth_id TEXT REFERENCES userinfo(auth_id),
--     type VARCHAR(100),
--     note_title VARCHAR(100),
--     note_content jsonb

-- )

-- CREATE TABLE vocab
-- (
--     word_id SERIAL PRIMARY KEY,
--     auth_id TEXT REFERENCES userinfo(auth_id),
--     lexcat VARCHAR(100)

-- )