"use client"
import { Button } from '@/components/ui/button';
import React from 'react'
import {useRouter} from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const AccountPage = () => {
    const router = useRouter();
    const supabaseClient = createClient();
  return (
    <div className='flex min-h-screen items-center justify-center'> <Button 
                  className='!w-[25rem] xl:!w-[30rem]'
                    style={{  padding:'9px' }}
                    variant="slim"
                    onClick={async () => {
                      await supabaseClient.auth.signOut();
                      router.push('/');
                    }}
                  >
                    Sign Out
                  </Button></div>
  )
}

export default AccountPage