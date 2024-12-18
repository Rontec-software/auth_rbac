/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "usuario_nome_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "tokenRecuperacaoSenha" TEXT NOT NULL,
    "dataExpiracaoToken" DATETIME NOT NULL,
    "autenticacaoDoisFatoresAtiva" BOOLEAN NOT NULL DEFAULT true
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__PerfilToUsuario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PerfilToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "perfil" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PerfilToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__PerfilToUsuario" ("A", "B") SELECT "A", "B" FROM "_PerfilToUsuario";
DROP TABLE "_PerfilToUsuario";
ALTER TABLE "new__PerfilToUsuario" RENAME TO "_PerfilToUsuario";
CREATE UNIQUE INDEX "_PerfilToUsuario_AB_unique" ON "_PerfilToUsuario"("A", "B");
CREATE INDEX "_PerfilToUsuario_B_index" ON "_PerfilToUsuario"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_senha_key" ON "usuarios"("senha");
