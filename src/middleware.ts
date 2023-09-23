import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const currentSession = req.cookies.get("user") as string | undefined;
    if (currentSession === undefined || currentSession === "") {
        response.cookies.set("user", uuidv4());
    }
    return response;
}