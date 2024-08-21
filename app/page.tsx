"use client";

import Hero from "@/components/Hero";
import Header from "@/components/Header";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/dashboard");
  }

  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
