import prisma from "../../../lib/prisma.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = JSON.parse(req.body);

  const createdUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      name: data.firstName + " " + data.lastName,
      username: data.email,
      email: data.email,
      password: data.password,
    },
  });

  res.json(createdUser);
};
