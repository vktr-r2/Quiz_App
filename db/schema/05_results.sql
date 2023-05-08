DROP TABLE IF EXISTS results CASCADE;

CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  result SMALLINT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT Now()
);