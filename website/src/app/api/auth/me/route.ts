import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/authorization";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        authUserId: user.authUserId,
        emvUserId: user.emvUserId,
        email: user.email,
        name: user.name,
        displayName: user.displayName,
        status: user.status,
        roles: user.roles,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    console.error("Failed to resolve current EMV user:", error);

    return NextResponse.json(
      {
        authenticated: false,
        error: "AUTH_LOOKUP_FAILED",
      },
      { status: 500 },
    );
  }
}
