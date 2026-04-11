import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const properties = await db.property.findMany({
      orderBy: { createdAt: "desc" }
    });
    
    return new NextResponse(JSON.stringify({ success: true, count: properties.length, data: properties }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ success: false, error: "Failed to fetch projects" }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
