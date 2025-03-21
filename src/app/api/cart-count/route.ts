import { getCartCount, getCartDetails } from "@/lib/services/cart";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(req: NextRequest, res: NextResponse) {

    const sessionId = cookies().get('user');

    // const sessionId = req.cookies.get("user");
    if (sessionId === undefined) {
        return Response.json({}, { status: 404 })
    }

    const count = await getCartCount(sessionId.value);

    return new Response(JSON.stringify(count));
}