-- Organ Donation & Procurement Network Database Schema
-- Drop database if exists and create fresh
DROP DATABASE IF EXISTS organ_network;
CREATE DATABASE organ_network CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE organ_network;

-- Users Table
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  role ENUM('donor','recipient','admin','hospital') NOT NULL,
  age INT,
  blood_group VARCHAR(5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Donors Table
CREATE TABLE Donors (
  id INT PRIMARY KEY,
  organ_type VARCHAR(50) NOT NULL,
  availability ENUM('available','matched','completed') DEFAULT 'available',
  medical_history TEXT,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_availability (availability),
  INDEX idx_status (status),
  INDEX idx_organ_type (organ_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Recipients Table
CREATE TABLE Recipients (
  id INT PRIMARY KEY,
  organ_required VARCHAR(50) NOT NULL,
  urgency ENUM('low','medium','high') DEFAULT 'medium',
  status ENUM('waiting','matched','completed') DEFAULT 'waiting',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_urgency (urgency),
  INDEX idx_status (status),
  INDEX idx_organ_required (organ_required)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Hospitals Table
CREATE TABLE Hospitals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  location VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Matches Table
CREATE TABLE Matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT NOT NULL,
  recipient_id INT NOT NULL,
  compatibility_score INT,
  status ENUM('initiated','quality_check','scheduled','completed','failed') DEFAULT 'initiated',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES Donors(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES Recipients(id) ON DELETE CASCADE,
  INDEX idx_donor_id (donor_id),
  INDEX idx_recipient_id (recipient_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- QualityChecks Table
CREATE TABLE QualityChecks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  match_id INT NOT NULL,
  result ENUM('pending','approved','rejected') DEFAULT 'pending',
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES Matches(id) ON DELETE CASCADE,
  INDEX idx_match_id (match_id),
  INDEX idx_result (result)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications Table
CREATE TABLE Notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message VARCHAR(255),
  status ENUM('unread','read') DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample admin user (password: admin123)
INSERT INTO Users (name, email, password, role, age, blood_group) 
VALUES ('Admin User', 'admin@organ-network.com', '$2a$10$YourHashedPasswordHere', 'admin', 35, 'O+');

-- Display success message
SELECT 'Database schema created successfully!' AS status;
