import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prismaClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const { color, shape, topping, sender, receiver, message } = req.body.data;
      const cake = await prisma.cake.create({
        data: { color, shape, topping, sender, receiver, message },
      });

      res.json({
        ok: true,
        data: cake,
      });
      break;
    }
  }
}
