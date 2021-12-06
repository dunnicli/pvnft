import prisma from "../../../../lib/prisma.ts";

export default async function handle(req, res) {
  const tokenId = req.query.id;
  const data = JSON.parse(req.body);

  if (data.display == "on") {
    data.display = true;
  }

  if (data.forSale == "on") {
    data.forSale = true;
  }

  const now = new Date();
  const token = await prisma.token.update({
    where: { id: +tokenId },
    data: {
      updatedBy: +data.updatedBy,
      notes: data.notes,
      display: data.display,
      forSale: data.forSale,
      salePrice: Number(data.salePrice),
      updatedAt: now,
    },
  });
  res.json(token);
  //res.JSON.stringify(note);
}
