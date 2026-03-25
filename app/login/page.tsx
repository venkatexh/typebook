"use client";

import { supabase } from "@/lib/supabase";

export default function Login() {
  const handleLoginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/api/auth/callback`,
      },
    });
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div
        className='px-4 py-2 bg-slate-800 rounded-2xl cursor-pointer'
        onClick={() => handleLoginWithGoogle()}>
        Continue with Google
      </div>
    </div>
  );
}
