CREATE TABLE IF NOT EXISTS customer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customer (name, email) VALUES ('John Doe', 'john@example.com');
INSERT INTO customer (name, email) VALUES ('Jane Smith', 'jane@example.com');