import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/lib/validation/auth.validator";
import prisma from "@/db";
import { ActionResult, ServerResult } from "@/types/action.types";
import { User } from "@/types/user.types";


type ReturnType = ServerResult<User>;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = signUpSchema.parse(body);

        //@ts-ignore
        const existing = await prisma.user.findUnique({
            where: { email: parsed.email },
        });

        if (existing) {
            return NextResponse.json<ReturnType>({ success: false, message: "Email already in use" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(parsed.password, 10);

        const user = await prisma.user.create({
            data: {
                name: parsed.name,
                email: parsed.email,
                username: parsed.username,
                passwordHash: hashedPassword,
                school: parsed.school,
                gradeLevel: parsed.gradeLevel,
                country: parsed.country,
            },
        });

        return NextResponse.json<ReturnType>({ success: true, message: "User created", data: user });
    } catch (err: any) {
        console.error("Register error:", err);
        return NextResponse.json<ReturnType>(
            { success:false, message: err.message || "Server error" },
            { status: 500 }
        );
    }
}
