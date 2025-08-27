'use client'
import FileUploader from "@/components/create/FileUploader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUser } from "@/hooks/useUser";
import {useRouter} from "next/navigation"
import { useEffect } from "react";
// import { useUser as useSupaUser} from '@supabase/auth-helpers-react';

function page() {
  // const user = useSupaUser();
  const {user} = useUser()
const router = useRouter()
 useEffect(() => {
    if (!user) {
      router.push("/"); // ✅ safe: runs after render
    }
  }, [user, router]);

 console.log("user** in create page******", user)

  return (
   <ProtectedRoute >
  <main className="min-h-screen flex flex-col gap-20 items-center justify-center">

   <FileUploader userId={user?.id} />
  </main>
   </ProtectedRoute>
  )
}




export default page;