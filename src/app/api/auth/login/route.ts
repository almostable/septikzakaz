import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const adminCount = await prisma.adminUser.count();
    
    // First time setup: if no admin users exist, create one
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await prisma.adminUser.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      
      const session = await getSession();
      session.isLoggedIn = true;
      session.username = newAdmin.username;
      session.id = newAdmin.id;
      await session.save();

      return NextResponse.json({ message: "Admin created and logged in successfully" });
    }

    // Normal login
    const adminUser = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!adminUser) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const session = await getSession();
    session.isLoggedIn = true;
    session.username = adminUser.username;
    session.id = adminUser.id;
    await session.save();

    return NextResponse.json({ message: "Logged in successfully" });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
