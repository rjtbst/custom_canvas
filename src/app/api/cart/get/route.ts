import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  if (!userId) return NextResponse.json({ error: 'User not logged in' }, { status: 401 });

  const { data, error } = await supabase.from('cart').select('*').eq('userid', userId);
  
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}
