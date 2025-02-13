import React from 'react';
import {
    StarOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation'

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: '/auth', icon: <PieChartOutlined />, label: 'Dashboard' },
    { key: '/auth/teachers', icon: <UserOutlined />, label: 'Teachers (CSR)' },
    { key: '/auth/students', icon: <TeamOutlined />, label: 'Students (SSR)' },
    {
        key: 'sub1',
        label: 'Others',
        icon: <StarOutlined />,
        children: [
            { key: '/auth/about', label: 'About (Disabled)', disabled: true },
        ],
    },
];

const SiderComponent: React.FC = () => {
    const router = useRouter()
    return (
        <div>
            <div className='flex flex-col justify-center items-center w-full'>
                <h1 className='text-center text-base font-bold py-6'>MY ADMIN PORTAL</h1>
            </div>
            <Menu
                onClick={(e) => router.push(e.key)}
                defaultSelectedKeys={['1']}
                mode="inline"
                style={{ background: 'transparent' }}
                items={items}
            />
        </div>
    );
};

export default SiderComponent;