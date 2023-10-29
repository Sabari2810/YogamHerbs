import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const categories = await prisma.categoryMaster.findMany({
        select: {
            guid: true,
            title: true
        }
    })

    return new Response(JSON.stringify(categories))
}