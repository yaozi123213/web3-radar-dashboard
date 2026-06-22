import { NextResponse } from 'next/server';
import { mockWeb3Projects, getProjectStats } from '@/data/web3-projects';

export async function GET() {
  return NextResponse.json({
    projects: mockWeb3Projects,
    stats: getProjectStats(),
  });
}
