CREATE TABLE users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY;
  email VARCHAR(345) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);