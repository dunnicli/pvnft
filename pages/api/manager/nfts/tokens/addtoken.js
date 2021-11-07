//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();
import prisma from "../../../../../lib/prisma.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = JSON.parse(req.body);
  const now = new Date();

  const createdToken = await prisma.token.create({
    data: {
      contractId: parseInt(data.contractId),
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
      createdAt: now,
      createdBy: parseInt(data.createdBy),
    },
  });

  res.json(createdToken);
};