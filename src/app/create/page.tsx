import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import FileUploader from "@/components/create/FileUploader";

export default async function CreatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("data in create page to extract id ", data)
  if (error || !data?.user?.id) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1  w-full flex items-center justify-center flex-col gap-12">
     <h1 className="text-7xl "> this is home page after login </h1>
    <FileUploader userId={data?.user?.id}/>
    </div>
  );
}
