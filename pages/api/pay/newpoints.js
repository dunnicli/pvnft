import prisma from "../../../lib/prisma.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = JSON.parse(req.body);
  const now = new Date();

  const createdPoint = await prisma.point.create({
    data: {
      ownerId: +data.ownerId,
      paymentId: +data.paymentId,
      amount: parseFloat(data.amount),
      notes: data.notes,
      dateReceived: now,
      createdBy: +data.createdBy,
    },
  });

  res.json(createdPoint);
};
