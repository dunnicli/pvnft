//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();
import prisma from "../../../lib/prisma.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const bcrypt = require("bcryptjs");
  const data = JSON.parse(req.body);
  // hash password
  const hashedPassword = await bcrypt.hashSync(data.password, 10);

  if (data.admin == "on") {
    data.admin = true;
  }

  const createdUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      name: data.name,
      username: data.email,
      email: data.email,
      passwordHash: hashedPassword,
      admin: data.admin,
    },
  });

  res.json(createdUser);
};
