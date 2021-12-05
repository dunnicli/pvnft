//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();
import prisma from "../../../lib/prisma.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = JSON.parse(req.body);
  if (data.admin == "on") {
    data.admin = true;
  }

  const createdUser = await prisma.user.create({
    data,
  });

  res.json(createdUser);
};
