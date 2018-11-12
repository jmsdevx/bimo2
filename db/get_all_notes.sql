select *
from notes
WHERE auth_id = $1
ORDER BY note_id DESC