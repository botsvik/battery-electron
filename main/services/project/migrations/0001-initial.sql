--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE Settings (
  id INTEGER NOT NULL CONSTRAINT Settings_pk PRIMARY KEY,
  port TEXT DEFAULT NULL,
  baudRate INTEGER DEFAULT 9600,
  minCharge INTEGER DEFAULT NULL,
  maxCharge INTEGER DEFAULT NULL
);

INSERT INTO
  Settings (id, port, baudRate, minCharge, maxCharge)
VALUES
  (1, NULL, 9600, NULL, NULL);

CREATE TABLE VoltageHistory (
  id INTEGER NOT NULL CONSTRAINT VoltageHistory_pk PRIMARY KEY,
  batteryId INTEGER NOT NULL,
  value REAL NOT NULL,
  timestamp INTEGER NOT NULL DEFAULT (unixepoch('subsec') * 1000)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE VoltageHistory;

DROP TABLE Settings;