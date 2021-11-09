import prisma from "../../../../../../lib/prisma.ts";

export default async function handle(req, res) {
  const tokenId = req.query.id;
  const data = JSON.parse(req.body);
  const now = new Date();
  const token = await prisma.token.update({
    where: { id: +tokenId },
    data: {
      contractId: +data.contractId,
      updatedBy: +data.updatedBy,
      tokenId: +data.tokenId,
      metaName: data.metaName,
      metaDescription: data.metaDescription,
      metaImageUrl: data.metaImageUrl,
      tokenJsonUri: data.tokenJsonUri,
      ownerAddress: data.ownerAddress,
      ownerId: +data.ownerId,
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
