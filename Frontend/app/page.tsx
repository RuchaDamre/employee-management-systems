import Link from "next/link";

function Home() {
    return (
        <section className="bg-white md:w-xl w-xs m-auto mt-20 text-center p-10">
            <h1 className="font-bold md:text-xl text-md"> Welcome to Employee Management System</h1>
            <p className="mt-10 italic text-gray-600">Manage employees securely with role-based access</p>
            <Link href={'/login'}><button className="bg-blue-900 text-white p-1.5 px-3 rounded-md tracking-wider my-5 cursor-pointer md:text-md text-sm">Login</button></Link>
        </section>
    )
}

export default Home;