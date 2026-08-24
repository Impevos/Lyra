import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(publicDir);

    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading public directory:', error);
    return NextResponse.json({ error: 'Failed to read images' }, { status: 500 });
  }
}
