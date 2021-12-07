//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();
//import { useSession } from "next-auth/client";

import prisma from "../../../lib/prisma.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  //const [session, loading] = useSession();
  const data = JSON.parse(req.body);
  const now = new Date();

  const createdPayment = await prisma.payment.create({
    data: {
      ownerId: parseInt(2),
      pmtName: data.pmtName,
      amount: parseFloat(data.amount),
      currencyType: data.currencyType,
      methodOfPayment: data.methodOfPayment,
      notes: data.notes,
      dateReceived: now,
      createdBy: parseInt(2),
    },
  });

  res.json(createdPayment);
};
