DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    private BOOLEAN NOT NULL DEFAULT FALSE,
    private_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT Now()
  );