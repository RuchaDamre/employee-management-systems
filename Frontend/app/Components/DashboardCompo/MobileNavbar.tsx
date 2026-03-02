import { FaTachometerAlt, FaUsers } from 'react-icons/fa';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosClose } from "react-icons/io";
import { useAuthContext } from "@/Context/AuthContext";

type Props = {
    setOpen: (value: boolean) => void,
    open: boolean,
}

function MobileNavbar({ open, setOpen }: Props) {
    const pathname = usePathname();
    const { pathID } = useAuthContext();
    return (
        <>
            <div onClick={() => setOpen(false)} className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
            <nav className={`md:hidden bg-white text-blue-950 w-80 h-screen fixed pt-10 left-0 bottom-0 mr-8 z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <button className='fixed top-2 right-3 text-[30px]' onClick={() => setOpen(false)}><IoIosClose /></button>
                <div className="flex flex-col pt-2 px-5 cursor-pointer mt-15">
                    <Link href={'/dashboard'} className={`${pathname === '/dashboard' ? "bg-blue-200" : ""} py-2 rounded-md flex gap-4 w-full pl-20`} onClick={() => setOpen(false)}><FaTachometerAlt /><span>Dashboard</span></Link>
                    <Link href={'/dashboard/employee'} className={`${pathname === '/dashboard/employee' || pathname === '/dashboard/employee/add-employee' || pathname === `/dashboard/employee/${pathID}` || pathname === `/dashboard/employee/edit-employee/${pathID}` ? "bg-blue-200" : ""} py-2 rounded-md flex gap-4 w-full pl-20`} onClick={() => setOpen(false)}><FaUsers /><span>Employees</span></Link>
                </div>
            </nav>
        </>
    )
}

export default MobileNavbar;