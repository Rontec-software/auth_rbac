import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const permissions = [
  { name: "read_profile", description: "allow read user profiles" },
  { name: "create_profile", description: "allow create user profiles" },
  { name: "update_profile", description: "allow update user profiles" },
  { name: "delete_profile", description: "allow delete user profiles" },
  { name: "read_permission", description: "allow read permissions" },
  { name: "create_permission", description: "allow create permissions" },
  { name: "update_permission", description: "allow update permissions" },
  { name: "delete_permission", description: "allow delete permissions" },
  { name: "read_user", description: "allow read user data" },
  { name: "create_user", description: "allow create user data" },
  { name: "update_user", description: "allow update user data" },
  { name: "delete_user", description: "allow delete user data" },
];

function permissionsFactory() {
  return permissions.map((p) => {
    return {
      permission: { create: { name: p.name, descrition: p.description } },
    };
  });
}

(async () => {
  // limpa todas as tabelas
  await prisma.$queryRaw`delete from profiles_permission`;
  await prisma.$queryRaw`delete from users_profiles`;
  await prisma.$queryRaw`delete from permission`;
  await prisma.$queryRaw`delete from profiles`;
  await prisma.$queryRaw`delete from users`;

  const adminPermissions = permissionsFactory();

  const administrator = await prisma.user.create({
    data: {
      name: "administrador",
      email: "administrador@email.com",
      password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
      active: true,
      phoneNumber: "11912345678",
      profiles: {
        create: [
          {
            profile: {
              create: {
                name: "admin",
                description: "allow write and read data",
                permissions: {
                  create: [...adminPermissions],
                },
              },
            },
          },
        ],
      },
    },
  });
  console.log("usuario administrador criado: " + administrator.name);

  const readPermissions = permissionsFactory().filter((p) =>
    p.permission.create.name.includes("read")
  );

  const defaultUser = await prisma.user.create({
    data: {
      name: "usuario padrao",
      email: "usuariopadrao@email.com",
      password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
      active: true,
      phoneNumber: "11912345678",
      profiles: {
        create: [
          {
            profile: {
              create: {
                name: "default",
                description: "allow read data",
                permissions: {
                  create: [...readPermissions],
                },
              },
            },
          },
        ],
      },
    },
  });
  console.log("usuario padrao criado: " + defaultUser.name);
})();
