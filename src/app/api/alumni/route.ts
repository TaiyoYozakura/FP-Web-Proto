import { NextResponse } from 'next/server';
import { dbManager } from '@/lib/database';

export async function GET() {
  try {
    const alumni = await dbManager.getAlumni();
    return NextResponse.json({ alumni });
  } catch (error) {
    return NextResponse.json({ alumni: [] }, { status: 200 });
  }
}