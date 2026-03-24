-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contactCode" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "location" TEXT,
    "topic" TEXT,
    "preferredContact" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'New',
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ContactSubmission" ("company", "contactCode", "email", "id", "location", "message", "name", "phone", "preferredContact", "status", "submittedAt", "topic") SELECT "company", "contactCode", "email", "id", "location", "message", "name", "phone", "preferredContact", "status", "submittedAt", "topic" FROM "ContactSubmission";
DROP TABLE "ContactSubmission";
ALTER TABLE "new_ContactSubmission" RENAME TO "ContactSubmission";
CREATE UNIQUE INDEX "ContactSubmission_contactCode_key" ON "ContactSubmission"("contactCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
