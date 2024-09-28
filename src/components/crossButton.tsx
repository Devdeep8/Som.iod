'use client'

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import {Plus} from "lucide-react"


export function CrossButton (className : any){
    const router = useRouter()


    return (
        <>
        <Button variant='secondary' size='icon' onClick={() => {
            router.back()
        }}>
           <Plus className={`${className} rotate-45`}/> 
        </Button>
      
        </>
    )
}