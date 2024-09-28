
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getAuthSession } from "@/lib/auth";

const HomeNavbar = async() => {
  const session = await getAuthSession()
  console.log(session)
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
          {
            session?.user ? (<p>You are login</p>) : (
              < Link  href={'/login'}><Button size='lg' variant='default'>
                Login
                </Button></Link>
            )
          }
        
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
