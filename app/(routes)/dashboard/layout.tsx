"use client";

import React, { useEffect } from "react";
import SideNavBar from "./_components/SideNavBar";
import { Toaster } from "@/components/ui/sonner";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/dashboard") {
      router.replace("/dashboard/meeting-type");
    }
  });

  return (
    <div>
      <div className="hidden md:block md:w-64 bg-slate-50 h-screen fixed">
        <SideNavBar />
      </div>
      <div className="md:ml-64">
        <div className="py-4 px-10 flex items-center float-right">
          <UserButton />
        </div>
        <Toaster />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
