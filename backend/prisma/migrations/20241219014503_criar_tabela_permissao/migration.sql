-- CreateTable
CREATE TABLE "permission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "descrition" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "profiles_permission" (
    "profileId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    PRIMARY KEY ("profileId", "permissionId"),
    CONSTRAINT "profiles_permission_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "profiles_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
