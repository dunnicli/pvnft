import prisma from "../../../../../../lib/prisma.ts";

export default async function handle(req, res) {
  const contractId = req.query.id;
  const data = JSON.parse(req.body);
  const now = new Date();
  const contract = await prisma.contract.update({
    where: { id: +contractId },
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
      updatedAt: now,
    },
  });
  res.json(contract);
  //res.JSON.stringify(note);
}
