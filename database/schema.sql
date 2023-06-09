DROP DATABASE LOTR;
CREATE DATABASE LOTR;
USE LOTR;

CREATE TABLE characters(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  race VARCHAR(20) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  birth VARCHAR(100) NOT NULL,
  death VARCHAR(100) NOT NULL,
  hair VARCHAR(20) NOT NULL,
  height VARCHAR(20) NOT NULL,
  spouse VARCHAR(20) NOT NULL,
  realm VARCHAR(50) NOT NULL,
  wikiUrl VARCHAR(200) NOT NULL,
  UNIQUE (name)
)