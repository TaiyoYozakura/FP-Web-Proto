import { NextRequest, NextResponse } from 'next/server';
import { dbManager } from '@/lib/database';

export async function GET() {
  try {
    const configs = dbManager.getConfigs();
    return NextResponse.json({ configs });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch database configs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'add':
        const newConfig = dbManager.addConfig(data);
        return NextResponse.json({ config: newConfig });
      
      case 'update':
        const updated = dbManager.updateConfig(data.id, data);
        return NextResponse.json({ success: updated });
      
      case 'delete':
        const deleted = dbManager.deleteConfig(data.id);
        return NextResponse.json({ success: deleted });
      
      case 'setActive':
        const activated = dbManager.setActiveConfig(data.id);
        return NextResponse.json({ success: activated });
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  }
}