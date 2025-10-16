import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json(); // { id, quantity?, size?, category?, orientation?, ... }

  if (!body.id) return NextResponse.json({ error: 'Item id is required' }, { status: 400 });

  const { id, ...updates } = body;
  const { data, error } = await supabase.from('cart').update(updates).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}
