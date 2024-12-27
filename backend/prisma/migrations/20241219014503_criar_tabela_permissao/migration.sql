-- CreateTable
CREATE TABLE "permition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "descrition" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "profiles_permission" (
    "profileId" TEXT NOT NULL,
    "permitionId" TEXT NOT NULL,

    PRIMARY KEY ("profileId", "permitionId"),
    CONSTRAINT "profiles_permission_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "profiles_permission_permitionId_fkey" FOREIGN KEY ("permitionId") REFERENCES "permition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
