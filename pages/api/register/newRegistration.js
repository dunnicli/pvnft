import prisma from "../../../lib/prisma.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const bcrypt = require("bcryptjs");
  const data = JSON.parse(req.body);
  // hash password
  const hashedPassword = await bcrypt.hashSync(data.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      name: data.firstName + " " + data.lastName,
      username: data.email,
      email: data.email,
      //password: data.password,
      passwordHash: hashedPassword,
    },
  });

  res.json(createdUser);
};
