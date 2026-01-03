import { Pacifico } from "next/font/google";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuthContext } from "@/Context/AuthContext";

const PacificoSans = Pacifico({
    weight: '400',
    subsets: ["latin"],
});

type Props = {
    setOpen: (value: boolean) => void,
}

function Header({ setOpen }: Props) {
    const { logout } = useAuthContext();
    return (<header className="bg-blue-950 text-white flex py-2.5 md:px-10 px-3 items-center md:justify-between fixed top-0 w-full z-100">
        <button className="md:hidden" onClick={() => setOpen(true)}><GiHamburgerMenu /></button>
        <div className="flex items-center md:gap-20 gap-5">
            <h1 className={`${PacificoSans.className} text-[7px] md:text-[12px] border rounded-full p-1 ml-5 md:ml-0`}>EMS</h1>
            <p className="text-[10px] md:text-sm">Welcome, Admin</p>
        </div>
        <button className="border-2 border-blue-900 rounded-sm text-xs md:text-sm bg-blue-900 py-1 md:px-4 px-2 cursor-pointer ml-auto md:ml-0" onClick={() => logout()}>Logout</button>
    </header>)
}

export default Header;