"use client"
import { Pacifico } from "next/font/google";
import React from "react";
import { useAuthContext } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { API_URL } from "../api";

const PacificoSans = Pacifico({
    weight: '400',
    subsets: ["latin"],
});


function Login() {

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const { login } = useAuthContext();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json();
        if (data.success === true) {
            login(data.user);
            localStorage.setItem('token', data.token);
            if (data.user.role === 'admin') {
                router.push('/dashboard');
            }
        }
        else {
            setError(data.message);
        }
    }

    return (<section className="mt-16">
        <h1 className={`${PacificoSans.className} text-center mb-7 md:text-xl text-lg text-blue-950`}>Employee Management System</h1>
        <form className="flex flex-col md:w-xs w-72 bg-white m-auto p-5" onSubmit={handleSubmit}>
            <p className="text-xs text-center text-red-700">{error}</p>
            <h2 className="font-bold md:text-lg text-md mb-5">Login</h2>
            <label htmlFor="email" className="text-gray-700 md:text-md text-sm">Email</label>
            <input type="email" id="email" placeholder="Enter Username" className="border-2 border-gray-100 md:p-2 p-1 mb-2.5 md:text-md text-sm" required value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <label htmlFor="password" className="text-gray-700 md:text-md text-sm">Password</label>
            <input type="password" id="password" placeholder="Enter Password" className="border-2 border-gray-100 md:p-2 p-1 mb-2.5 md:text-md text-sm" required value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <div className="flex">
                <input type="checkbox" id="checkbox" className="md:mr-0.5" />
                <label htmlFor="checkbox" className="mr-7 text-gray-700 md:text-md text-sm">Remember me</label>
                <a className="text-blue-400 cursor-pointer md:text-md text-sm">Forgot Password?</a>
            </div>
            <button className="bg-blue-950 text-white p-1.5 my-5 cursor-pointer md:text-md text-sm">Login</button>
        </form>
    </section>)
}

export default Login;