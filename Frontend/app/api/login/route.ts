import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const query = `
      query GetUserAccountData {
        getUserAccountData {
          id
          username
          password
          email
          role
        }
      }
    `;

    const res = await fetch("https://vickey-uncataloged-elsa.ngrok-free.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true", // Important for ngrok
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();

    if (json.errors) {
      return NextResponse.json({ error: "Server error retrieving users." }, { status: 500 });
    }

    const users = json.data.getUserAccountData;
    const user = users.find(
      (u: any) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Network or server error. Please try again." }, { status: 500 });
  }
}
