"use client";

import Hero from "@/components/Hero";
import Header from "@/components/Header";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  });

  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
