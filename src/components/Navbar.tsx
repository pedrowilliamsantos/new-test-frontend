import React from 'react'
import { CiSearch } from "react-icons/ci";
import { BiConversation } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className='border-b-2 flex justify-between items-center p-5 text-gray-500'>
            <div className='flex justify-center items-center'></div>
            <Link href={"/"} className='flex justify-center items-center ml-40'>
                <Image src="/logotipo.png" alt="" width={100} height={100} />
            </Link>
            <div className='flex justify-end items-center gap-5'>
                <IoMdNotificationsOutline size={25} />
                <BiConversation size={25} />
                <span className='flex items-center gap-1'>
                    <CiSearch size={25} />
                    <p className='text-xl'>Procurar</p>
                </span>
            </div>
        </div>
    )
}

export default Navbar