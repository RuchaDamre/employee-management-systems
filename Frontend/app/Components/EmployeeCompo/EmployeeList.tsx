'use client'

import Link from 'next/link';
import React from 'react';
import DataTable, { TableColumn, TableStyles } from 'react-data-table-component';
import { type Data } from './EmployeeView';
import { API_URL } from '@/app/api';

function EmployeeList() {

    const [data, setData] = React.useState<Data[]>([]);
    const [filerEmp, setFilterEmp] = React.useState<Data[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${API_URL}/employee/`);
            const json = await response.json();
            setData(json.employees);
            setFilterEmp(json.employees);
        }
        fetchData();
    }, []);

    //  search by name from employee list
    function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
        const records = data.filter((value) => value?.name?.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilterEmp(records);
    }

    const columns: TableColumn<Data>[] = [
        {
            name: 'S No',
            cell: (_row, index: number) => (currentPage - 1) * rowsPerPage + index + 1,
            width: '90px',
        },
        {
            name: 'Image',
            cell: (row) => (
                <img src={`${API_URL}/images/${row.image}`} className="w-15 h-15 rounded-full object-cover" alt='Employee-Profile' />
            ),
            width: '100px',
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            width: '90px',
        },
        {
            name: 'DOB',
            selector: (row) => new Date(row.dob).toLocaleDateString('en-GB'),
            width: '100px',
        },
        {
            name: 'Role',
            selector: (row) => row.role,
            width: '150px'
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <Link href={`/dashboard/employee/${row.id}`}><button className="text-white rounded-sm md:text-xs text-[10px] bg-yellow-600 md:py-1 py-1 px-1 md:px-4 cursor-pointer md:mr-3 mr-2">View</button></Link>
                    <Link href={`/dashboard/employee/edit-employee/${row.id}`}><button className="text-white rounded-sm md:text-xs text-[10px] bg-teal-600 md:py-1 md:px-4 py-1 mr-1 px-1 cursor-pointer">Edit</button></Link>
                </div>
            ),
        },
    ];

    const customStyles: TableStyles = {
        headCells: {
            style: {
                fontSize: '13px',
                fontWeight: '600',
                textTransform: 'uppercase',
                justifyContent: 'center',
            },
        },
        rows: {
            style: {
                fontSize: '12px',
                borderBottom: '1px solid #e5e7eb',
            },
        },
        cells: {
            style: {
                paddingTop: '12px',
                paddingBottom: '12px',
                justifyContent: 'center',
            },
        },
    };

    return (
        <div className="md:ml-87.5 md:mr-7 px-2 md:px-0">
            <h2 className="mt-5 md:text-xl font-bold mb-5 text-center">Manage Employees</h2>
            <div className="flex justify-between items-center">
                <input type="search" className="border-2 rounded-md bg-white border-gray-300 md:p-1 p-0.5 w-35 md:w-50 md:text-sm text-xs" placeholder="Search By Name" onChange={handleFilter} />
                <Link href={'/dashboard/employee/add-employee'} className="text-blue-950 bg-blue-200 rounded-md p-1.5 px-2 my-5 cursor-pointer md:text-[13px] text-[10px] md:mr-10 font-bold">Add New Employee</Link>
            </div>
            <div className="overflow-x-auto">
                {<DataTable
                    columns={columns}
                    data={filerEmp}
                    pagination
                    highlightOnHover
                    responsive={true}
                    customStyles={customStyles}
                    paginationPerPage={rowsPerPage}
                    onChangePage={(page) => setCurrentPage(page)}
                    onChangeRowsPerPage={(newRowsPerPage, page) => {
                        setRowsPerPage(newRowsPerPage);
                        setCurrentPage(page);
                    }} />
                }
            </div>
        </div >
    )
}

export default EmployeeList;