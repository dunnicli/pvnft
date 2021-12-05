// pages/api/publish/[id].ts
//import Datetime from "react-datetime";

import prisma from "../../../../lib/prisma.ts";

// PUT /api/publish/:id
export default async function handle(req, res) {
  const userId = req.query.id;
  const data = JSON.parse(req.body);
  if (data.admin == "on") {
    data.admin = true;
  }
  const now = new Date();
  const user = await prisma.user.update({
    where: { id: +userId },
    data: {
      name: data.name,
      email: data.email,
      admin: data.admin,
      updatedAt: now,
    },
  });
  res.json(user);
  //res.JSON.stringify(note);
}
