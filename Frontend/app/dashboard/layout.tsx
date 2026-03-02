'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/Context/AuthContext";
import Header from '../Components/DashboardCompo/Header';
import Navbar from '../Components/DashboardCompo/Navbar';
import MobileNavbar from '../Components/DashboardCompo/MobileNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuthContext();
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [loading, user, router]);

    if (loading) {
        return <p className="flex justify-center items-center text-xl h-screen">Loading Content...</p>;
    }

    if (!user) {
        return null;
    }

    return (
        <main>
            <Header setOpen={setOpen} />
            <Navbar />
            <MobileNavbar open={open} setOpen={setOpen} />
            {children}
        </main>
    )
}
