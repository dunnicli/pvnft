//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();
import prisma from "../../../../../lib/prisma.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = JSON.parse(req.body);
  const now = new Date();

  const createdContract = await prisma.contract.create({
    data: {
      contractName: data.contractName,
      tokenType: data.tokenType,
      address: data.address,
      tokenName: data.tokenName,
      tokenSymbol: data.tokenSymbol,
      network: data.network,
      scanUrl: data.scanUrl,
      ownerAddress: data.ownerAddress,
      ownerId: +data.ownerId,
      description: data.description,
      notes: data.notes,
      createdAt: now,
      createdBy: +data.createdBy,
    },
  });

  res.json(createdContract);
};
