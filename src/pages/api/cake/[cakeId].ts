import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prismaClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const data = await prisma.cake.findUnique({
        where: {
          cakeId: Number(req.query.cakeId),
        },
      });

      if (!data) res.json({ ok: false });

      res.json({ ok: true, data });
      break;
    }
  }
}
