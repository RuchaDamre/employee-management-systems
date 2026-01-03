'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/api";

type EMPFormData = {
    [key: string]: string | File,
};

function Add() {
    const [formData, setFormData] = React.useState<EMPFormData>({});
    const router = useRouter();
    const [error, setError] = React.useState<string>('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = e.target;
        if (name === 'img' && files && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        }
        else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Passing formObj as formData conatins file.
        const formObj = new FormData();
        Object.keys(formData).forEach((key) => formObj.append(key, formData[key]));

        const response = await fetch(`${API_URL}/employee/add`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: formObj,
        })
        const data = await response.json();
        if (data.success === true) {
            router.push('/dashboard/employee');
        }
        else {
            setError(data.message);
        }
    }

    return (
        <div className="md:ml-87.5 md:mt-20 m-5 mt-20 bg-white p-8 md:mr-7">
            <h1 className="font-bold mb-8">Add New Employee</h1>
            <p className="text-sm text-center text-red-700 -mt-4 mb-4">{error}</p>
            <form className="flex flex-wrap justify-between" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3">
                    <label htmlFor="name" className="md:text-md text-sm">Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter Username" className="md:w-sm w-62.5 rounded-md border-2 border-gray-300 md:p-2 p-c mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="email" className="md:text-md text-sm">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter Email" className="md:w-sm w-62.5 border-gray-300 rounded-md border-2 md:p-2 p-0.5 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="empID" className="md:text-md text-sm">Employee ID</label>
                    <input type="text" name="empID" id="empID" placeholder="Enter Employee ID" className="md:w-sm w-62.5 border-gray-300 rounded-md border-2 md:p-2 p-0.5 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="dob" className="md:text-md text-sm">Date of Birth</label>
                    <input type="date" id="dob" name="dob" placeholder="Enter Date of Birth" className="md:w-sm w-62.5 border-gray-300 rounded-md border-2 md:p-2 p-0.5 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="gender" className="md:text-md text-sm">Gender</label>
                    <select id="gender" name="gender" className="md:w-sm w-62.5 border-gray-300 rounded-md border-2 md:p-2 p-0.5 mb-2.5 md:text-md text-sm" required onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData((prevData) => ({ ...prevData, gender: e.target.value }))}>
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="role" className="md:text-md text-sm">Designation</label>
                    <input type="text" id="role" name="role" placeholder="Designation" className="md:w-sm w-62.5 border-gray-300 rounded-md border-2 md:p-2 p-0.5 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="salary" className="md:text-md text-sm">Salary</label>
                    <input type="number" id="salary" name="salary" placeholder="Salary" className="md:w-sm w-62.5 border-gray-300 rounded-md border-2 md:p-2 p-0.5 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="img" className="md:text-md text-sm">Upload Image</label>
                    <input type="file" id="img" name="img" className="file:bg-gray-200 file:cursor-pointer file:border md:file:p-1 file:p-0.5 file:text-[10px] md:file:text-xs md:w-sm w-62.5 border-gray-300 rounded-md border-2 md:p-2 p-0.5 mb-2.5 md:text-md text-sm" required onChange={handleChange} />
                </div>
                <button className="text-blue-950 w-full rounded-md font-bold bg-blue-200 md:py-2 py-1.5 my-5 cursor-pointer md:text-md text-xs md:text-sm">Add Employee</button>
            </form>
        </div>
    )
}

export default Add;