import path from "path"
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const imageBuffer = fs.readFileSync(path.join(process.cwd(), 'public', 'yogam-main.png'));
    return new Response(imageBuffer, {
        headers: {
            "Content-Type": "image/jpeg"
        }
    })
}