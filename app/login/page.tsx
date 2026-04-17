"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
      }
      if (data.session) {
        window.location.href = "/projects";
      } else {
        setLoading(false);
      }
    };

    getSession();
  }, []);
  const handleLoginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  if (!loading)
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
