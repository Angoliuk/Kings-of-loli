-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "profile_picture" TEXT,
    "sound" INTEGER NOT NULL DEFAULT 100,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "name", "password", "profile_picture", "sound") SELECT "id", "name", "password", "profile_picture", "sound" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
