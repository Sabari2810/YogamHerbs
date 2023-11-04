import { getCartCount, getCartDetails } from "@/lib/services/cart";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const sessionId = req.cookies.get("user");
    if (sessionId === undefined) {
        return Response.json({
            status: 404
        })
    }

    const count = await getCartCount(sessionId!.value);

    return new Response(JSON.stringify(count));
}