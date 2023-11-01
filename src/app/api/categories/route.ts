import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const categories = await prisma.yH_CategoryMaster.findMany({
        select: {
            Guid: true,
            Title: true
        }
    })

    return new Response(JSON.stringify(categories))
}