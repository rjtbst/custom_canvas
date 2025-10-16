import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json(); // { id }
  if (!body.id) return NextResponse.json({ error: 'Item id is required' }, { status: 400 });

  const { data, error } = await supabase.from('cart').delete().eq('id', body?.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}
