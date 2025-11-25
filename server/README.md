## Organ Donation & Procurement Network – Backend

### Setup

1. Copy `.env.example` to `.env` and provide database + JWT values:
   ```
   PORT=5000
   JWT_SECRET=supersecretkey
   JWT_EXPIRES_IN=1d
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=organ_network
   DB_PORT=3306
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the API:
   ```bash
   npm run dev
   ```

### Database Schema

Each table uses the `id` column as PRIMARY KEY. `Donors.id` and `Recipients.id` reference the corresponding `Users.id`. Simplified DDL:

```sql
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  role ENUM('donor','recipient','admin','hospital') NOT NULL,
  age INT,
  blood_group VARCHAR(5)
);

CREATE TABLE Donors (
  id INT PRIMARY KEY,
  organ_type VARCHAR(50) NOT NULL,
  availability ENUM('available','matched','completed') DEFAULT 'available',
  medical_history TEXT,
  status ENUM('active','inactive') DEFAULT 'active',
  FOREIGN KEY (id) REFERENCES Users(id)
);

CREATE TABLE Recipients (
  id INT PRIMARY KEY,
  organ_required VARCHAR(50) NOT NULL,
  urgency ENUM('low','medium','high') DEFAULT 'medium',
  status ENUM('waiting','matched','completed') DEFAULT 'waiting',
  FOREIGN KEY (id) REFERENCES Users(id)
);

CREATE TABLE Hospitals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  location VARCHAR(150)
);

CREATE TABLE Matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT NOT NULL,
  recipient_id INT NOT NULL,
  compatibility_score INT,
  status ENUM('initiated','quality_check','scheduled','completed','failed') DEFAULT 'initiated',
  FOREIGN KEY (donor_id) REFERENCES Donors(id),
  FOREIGN KEY (recipient_id) REFERENCES Recipients(id)
);

CREATE TABLE QualityChecks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  match_id INT NOT NULL,
  result ENUM('pending','approved','rejected') DEFAULT 'pending',
  reason TEXT,
  FOREIGN KEY (match_id) REFERENCES Matches(id)
);

CREATE TABLE Notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message VARCHAR(255),
  status ENUM('unread','read') DEFAULT 'unread',
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

### Scripts

- `npm run dev` – Start server with nodemon.
- `npm start` – Start production server.

### Core Endpoints

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Create a new user | Public |
| POST | `/api/auth/login` | Login + JWT issue | Public |
| POST | `/api/donors/register` | Donor creates donation profile | Donor |
| PATCH | `/api/donors/:id/availability` | Update availability/status | Donor/Admin |
| GET | `/api/donors/:id/status` | View donor status | Authenticated |
| POST | `/api/recipients/register` | Recipient request organ | Recipient |
| GET | `/api/recipients/me/notifications` | View notifications | Recipient |
| GET | `/api/recipients/:id/status` | View recipient status | Authenticated |
| POST | `/api/matches` | Run donor-recipient matching flow | Admin |
| GET | `/api/matches` | List matches | Admin |
| GET | `/api/matches/:matchId/quality-check` | View QC result | Auth |
| GET | `/api/admin/donors` | List donors | Admin |
| GET | `/api/admin/recipients` | List recipients | Admin |
| GET | `/api/admin/quality-checks` | View quality checks | Admin |
| PATCH | `/api/admin/quality-checks/:qualityId` | Approve/reject QC | Admin |
| PATCH | `/api/admin/matches/:matchId/complete` | Mark transplant complete | Admin |

