"use client"
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
const HomeNavbar = () => {
  const router = useRouter();
  return (
    <nav className="py-8  ">
      <div className="flex justify-between items-center">
        <div className=" text-3xl font-bold">logo</div>
        <div className="space-x-6">
          <Link href="#" className="hover:underline" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
           Dev 
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Blogs
          </Link>
        </div>
        <div className="">
        <Button onClick={() => router.push('/sign-in')}>Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
