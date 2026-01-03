import { FaTachometerAlt, FaUsers } from 'react-icons/fa';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/Context/AuthContext";

function Navbar() {
    const pathname = usePathname();
    const { pathID } = useAuthContext();
    return (<nav className="hidden md:block bg-white text-blue-950 w-80 h-screen fixed top-13 left-0 bottom-0 mr-8">
        <div className="flex flex-col pt-10 px-5 cursor-pointer">
            <Link href={'/dashboard'} className={`${pathname === '/dashboard' ? "bg-blue-200" : ""} py-2 rounded-md flex gap-4 w-full pl-20`}><FaTachometerAlt /><span>Dashboard</span></Link>
            <Link href={'/dashboard/employee'} className={`${pathname === '/dashboard/employee' || pathname === '/dashboard/employee/add-employee' || pathname === `/dashboard/employee/${pathID}` || pathname === `/dashboard/employee/edit-employee/${pathID}` ? "bg-blue-200" : ""} py-2 rounded-md flex gap-4 w-full pl-20`}><FaUsers /><span>Employees</span></Link>
        </div>
    </nav>)
}

export default Navbar;