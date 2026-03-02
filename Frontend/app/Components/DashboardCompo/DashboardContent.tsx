'use client'
import Card from './Card';
import { FaUsers, FaUserTie, FaMoneyBillWave } from 'react-icons/fa';
import React from 'react';
import { API_URL } from '@/app/api';

type CardData = {
    totalEmployees?: number,
    totalSalary?: number,
}

function DashboardContent() {
    const [cardData, setCardData] = React.useState<CardData>({});

    React.useEffect(() => {
        async function fetchCardData() {
            const response = await fetch(`${API_URL}/employees/dashboard`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            const json = await response.json();
            setCardData(json);
        }
        fetchCardData();
    }, []);

    return (
        <aside className='md:ml-[350px] mt-20'>
            <h2 className="mt-5 md:text-xl font-bold mb-5 ml-5 md:ml-0">Dashboard Overview</h2>
            <div className='flex flex-col md:flex-row gap-8 items-center md:justify-items-normal'>
                <Card heading='Total Admin' count={1} icon={FaUserTie} salary={false} color='bg-amber-800' />
                <Card heading='Total Employees' count={cardData.totalEmployees} icon={FaUsers} salary={false} color='bg-teal-600' />
                <Card heading='Total Salary' count={cardData.totalSalary} icon={FaMoneyBillWave} salary={true} color='bg-yellow-600' />
            </div>
        </aside>
    )
}

export default DashboardContent;