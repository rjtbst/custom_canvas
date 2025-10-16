import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();
  const { data: { user } } = await supabase.auth.getUser();
if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

const newItem = { ...body, userid: user.id };
const { data, error } = await supabase.from('cart').insert([newItem]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}
