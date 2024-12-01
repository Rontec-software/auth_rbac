-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "passwordResetToken" TEXT NOT NULL,
    "expPasswordResetToken" DATETIME NOT NULL,
    "twoFactorAuthEnable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
