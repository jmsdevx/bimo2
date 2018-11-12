SELECT userinfo.f_name, userinfo.auth_id, notes.note_title, notes.note_content, notes.note_id
FROM userinfo
    JOIN notes
    ON userinfo.auth_id = notes.auth_id
-- WHERE userinfo.auth_id = $1
ORDER BY note_id DESC;