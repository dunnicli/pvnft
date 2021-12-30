// pages/api/users/changePassword/[id].js
//import Datetime from "react-datetime";

import prisma from "../../../../lib/prisma.ts";

// PUT /api/publish/:id
export default async function handle(req, res) {
  const bcrypt = require("bcryptjs");
  const userId = req.query.id;
  const data = JSON.parse(req.body);

  const hp = bcrypt.hashSync(data.password, 10);

  const now = new Date();
  const user = await prisma.user.update({
    where: { id: +userId },
    data: {
      password: null,
      updatedAt: now,
      passwordHash: hp,
    },
  });
  res.json(user);
  //res.JSON.stringify(note);
}
