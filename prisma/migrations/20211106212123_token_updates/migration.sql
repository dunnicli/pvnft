/*
  Warnings:

  - You are about to drop the column `contractScanUrl` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `networkName` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `tokenName` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `tokenSymbol` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `tokens` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contractId" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "metaName" TEXT,
    "metaDescription" TEXT,
    "metaImageUrl" TEXT NOT NULL,
    "tokenJsonUri" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "notes" TEXT,
    "display" BOOLEAN,
    "forSale" BOOLEAN,
    "salePrice" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "deleted" BOOLEAN,
    CONSTRAINT "tokens_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tokens_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tokens" ("contractId", "createdAt", "createdBy", "deleted", "display", "forSale", "id", "metaDescription", "metaImageUrl", "metaName", "notes", "ownerAddress", "ownerId", "salePrice", "tokenId", "tokenJsonUri", "updatedAt", "updatedBy") SELECT "contractId", "createdAt", "createdBy", "deleted", "display", "forSale", "id", "metaDescription", "metaImageUrl", "metaName", "notes", "ownerAddress", "ownerId", "salePrice", "tokenId", "tokenJsonUri", "updatedAt", "updatedBy" FROM "tokens";
DROP TABLE "tokens";
ALTER TABLE "new_tokens" RENAME TO "tokens";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
