import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    try {
      const formData = await request.json();
      console.log(formData);
      return NextResponse.json({data: formData}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
  