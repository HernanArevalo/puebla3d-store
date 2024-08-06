"use client";

import { useUiStore } from "@/store";
import { IoMenu } from "react-icons/io5";


export const MenuButton = () => {
  const openSideMenu = useUiStore((state) => state.openSideMenu);


  return (
    <div
    className='flex flex-row justify-center items-center gap-1 hover:bg-puebla-dark hover:text-puebla-blue p-1 rounded transition-all font-normal cursor-pointer'
    onClick={openSideMenu}
  >
    Menú
    <IoMenu size={20}/>
  </div>
  )
}
