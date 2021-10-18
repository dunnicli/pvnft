//import { PrismaClient } from '@prisma/client'
import prisma from "../../../lib/prisma.ts";
//const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = JSON.parse(req.body);

  const createdNote = await prisma.note.create({
    data,
  });

  res.json(createdNote);
};
