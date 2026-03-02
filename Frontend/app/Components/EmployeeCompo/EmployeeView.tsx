'use client'
import React from "react";
import { useAuthContext } from "@/Context/AuthContext";
import { API_URL } from "@/app/api";

export type Data = {
    name: string,
    email: string,
    dob: string,
    gender: string,
    role: string,
    salary: number,
    image: string,
    id: number,
    empid: number,
}

type EmpData = {
    empData: Data,
    pathID: string
}

function EmployeeView({ empData, pathID }: EmpData) {
    const { setPathID } = useAuthContext();

    React.useEffect(() => {
        setPathID(pathID);
    }, [setPathID, pathID]);

    const dob = new Date(empData.dob).toLocaleDateString('en-GB');
    return (
        <section className="bg-white m-auto w-[300px] p-7 md:w-[800px]">
            <h1 className="text-center font-bold md:text-xl text-md pb-10">Employee Details</h1>
            <div className="flex md:flex-row flex-col">
                <img src={`${API_URL}/employees/${empData.id}/image`} alt="employee-profile" className="md:w-60 md:h-60 w-28 h-28 m-auto mb-5 md:m-0 rounded-full object-cover" />
                <div className="md:ml-20 ml-5">
                    <p className="mb-5 font-normal text-sm"><span className="font-bold text-base">Name : &nbsp;</span>  {empData.name}</p>
                    <p className="mb-5 font-normal text-sm"><span className="font-bold text-base">Email : &nbsp;</span>  {empData.email}</p>
                    <p className="mb-5 font-normal text-sm"><span className="font-bold text-base">Employee ID : &nbsp;</span>  {empData.empid}</p>
                    <p className="mb-5 font-normal text-sm"><span className="font-bold text-base">Date Of Birth : &nbsp;</span>  {dob}</p>
                    <p className="mb-5 font-normal text-sm"><span className="font-bold text-base">Gender : &nbsp;</span>  {empData.gender}</p>
                    <p className="mb-5 font-normal text-sm"><span className="font-bold text-base">Designation : &nbsp;</span>  {empData.role}</p>
                    <p className="mb-5 font-normal text-sm"><span className="font-bold text-base">Salary : &nbsp;</span>  ${empData.salary}</p>
                </div>
            </div>
        </section>
    )
}

export default EmployeeView;