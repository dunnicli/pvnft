import prisma from "../../../lib/prisma.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = JSON.parse(req.body);
  const now = new Date();

  const createdPayment = await prisma.payment.create({
    data: {
      ownerId: +data.ownerId,
      pmtName: data.pmtName,
      amount: parseFloat(data.amount),
      currencyType: data.currencyType,
      methodOfPayment: data.methodOfPayment,
      notes: data.notes,
      dateReceived: now,
      createdBy: +data.createdBy,
    },
  });

  res.json(createdPayment);
};
