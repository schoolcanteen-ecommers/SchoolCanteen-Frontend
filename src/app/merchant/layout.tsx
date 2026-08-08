import type { ReactNode } from "react";

import { GlobalHeader } from "@/components/layout/global-header";
import { MerchantSidebar } from "@/components/layout/merchant-sidebar";


export default function MerchantLayout({
 children,
}:{
 children:ReactNode
}){

 return (

  <div className="min-h-screen bg-[#F5F7FB]">

    <GlobalHeader
      userName="Bu Ani"
      userRole="Merchant"
    />


    <div className="flex min-h-[calc(100vh-4rem)]">

      <MerchantSidebar/>


      <main className="flex-1">
        {children}
      </main>


    </div>


  </div>

 )

}