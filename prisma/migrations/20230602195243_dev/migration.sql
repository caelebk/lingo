/*
  Warnings:

  - Added the required column `order` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deckId" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("createdAt", "deckId", "definition", "id", "term", "updatedAt") SELECT "createdAt", "deckId", "definition", "id", "term", "updatedAt" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
