"use server";

import { cookies } from "next/headers";

export async function getMeAction() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("CBO_Token")?.value;

    if (!token) {
      return { user: null, error: "No token found" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_API}/auth/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { user: null, error: `Server responded with ${response.status}` };
    }

    const data = await response.json();
    return { user: data, error: null };
  } catch (error) {
    console.error("Error in getMeAction:", error);
    return { user: null, error: error };
  }
}

export async function loginAction(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_API}/auth/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { data, error: true, status: response.status };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error in loginAction:", error);
    return { data: null, error: error };
  }
}
