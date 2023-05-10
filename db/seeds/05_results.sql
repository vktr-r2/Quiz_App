-- CREATE TABLE results (
--   id SERIAL PRIMARY KEY NOT NULL,
--   quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   result SMALLINT NOT NULL,
--   created_at TIMESTAMP NOT NULL DEFAULT Now()
-- );

INSERT INTO results (quiz_id, user_id, result) VALUES (4, 1, 4);
INSERT INTO results (quiz_id, user_id, result) VALUES (3, 2, 2);
INSERT INTO results (quiz_id, user_id, result) VALUES (1, 3, 3);
