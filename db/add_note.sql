INSERT INTO notes
    (auth_id,
    note_type,
    note_title,
    note_content
    )

VALUES( $1, $2, $3, $4);

SELECT MAX(note_id)
FROM notes