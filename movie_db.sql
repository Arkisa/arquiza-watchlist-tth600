CREATE DATABASE IF NOT EXISTS movie_db;
USE movie_db;

CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  `year` INT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Plan to Watch',
  rating INT NOT NULL DEFAULT 0
);

INSERT INTO movies (title, genre, `year`, status, rating) VALUES
('Spiderman: Brand New Day', 'Action', 2026, 'Completed', 9),
('How to train your Dragon', 'Adventure', 2010, 'Completed', 10),
('Weapons', 'Horror', 2025, 'Watching', 10),
('Your Name', 'Romance', 2016, 'Watching', 0);