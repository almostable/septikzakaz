import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmailNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, message, source } = data;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email,
        message,
        source,
      },
    });

    // Send email notification via SendPulse
    await sendEmailNotification(lead);

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
