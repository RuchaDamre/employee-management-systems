'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/api";

type FormData = {
    name?: string,
    email?: string,
    role?: string,
    salary?: number,
}

function EmployeeEdit({ id }: { id: string }) {
    const router = useRouter();
    const [error, setError] = React.useState<string>('');
    const [data, setData] = React.useState<FormData | null>(null);

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${API_URL}/employees/${id}`)
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, [id]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }))
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`${API_URL}/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        })

        if (response.ok) {
            router.push('/dashboard/employee');
        }

        else {
            setError("Error in updating data");
        }
    }

    return (
        <div className="md:ml-[350px] mt-20 bg-white p-8 m-5 md:mr-7">
            <h1 className="font-bold mb-8">Edit Employee</h1>
            <p className="text-sm text-center text-red-700 -mt-4 mb-4">{error}</p>
            {data !== null ?
                <form className="flex flex-wrap justify-between" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="name" className="md:text-md text-sm">Name</label>
                        <input type="text" name="name" id="name" value={data.name} className="md:w-96 w-64 rounded-md border-2 border-gray-300 md:p-2 p-1 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="email" className="md:text-md text-sm">Email</label>
                        <input type="email" name="email" id="email" value={data.email} className="md:w-96 w-64 border-gray-300 rounded-md border-2 md:p-2 p-1 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="role" className="md:text-md text-sm">Designation</label>
                        <input type="text" id="role" name="role" value={data.role} className="md:w-96 w-64 border-gray-300 rounded-md border-2 md:p-2 p-1 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="salary" className="md:text-md text-sm">Salary</label>
                        <input type="number" id="salary" name="salary" value={data.salary} className="md:w-96 w-64 border-gray-300 rounded-md border-2 md:p-2 p-1 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                    </div>
                    <button className="text-blue-950 w-full rounded-md font-bold bg-blue-200 md:py-2 py-1 my-5 cursor-pointer md:text-md text-xs">Edit Employee</button>
                </form>
                : <p>Unable to load employee data</p>
            }
        </div>
    )
}

export default EmployeeEdit;