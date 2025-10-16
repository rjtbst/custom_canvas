import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json(); // { userId }
 const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  if (userId) return NextResponse.json({ error: 'UserId is required' }, { status: 400 });

  const { data, error } = await supabase.from('cart').delete().eq('userid', userId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}
