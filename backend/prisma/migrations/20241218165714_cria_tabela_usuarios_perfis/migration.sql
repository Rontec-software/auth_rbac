-- CreateTable
CREATE TABLE "users_profiles" (
    "userId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "profileId"),
    CONSTRAINT "users_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_profiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
