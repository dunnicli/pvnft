import prisma from "../../../../lib/prisma.ts";

// DELETE /api/users/userDelete/:id
export default async function handle(req, res) {
  const userId = req.query.id;
  if (req.method === "DELETE") {
    const user = await prisma.user.delete({
      where: { id: Number(userId) },
    });
    res.json(user);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
