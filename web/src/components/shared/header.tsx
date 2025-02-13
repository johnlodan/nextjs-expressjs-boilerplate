
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Dropdown } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { UserOutlined, ApiOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { usePostLogoutMutation } from '@/services/login';
import Cookies from 'js-cookie';

const themeOptions: CheckboxGroupProps<string>['options'] = ['Light', 'Dark', 'Green'];

const HeaderComponent = () => {
    const [postLogout] = usePostLogoutMutation()
    const [theme, setTheme] = useState('Light');
    const handleThemeChange = ({ target: { value } }: RadioChangeEvent) => {
        setTheme(value);
        document.documentElement.setAttribute(
            "data-theme",
            value?.toLowerCase()
        );
    };

    const handleMenuClick: MenuProps['onClick'] = async (e) => {
        console.log('click', e);
        if (e.key === 'logout') {
            await postLogout("")
            Cookies.remove(process.env.TOKEN_NAME)
            window.location.href = '/login'
        }
    };

    const items: MenuProps['items'] = [
        {
            label: 'Settings',
            key: 'settings',
            icon: <UserOutlined />,
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: <ApiOutlined />,
        }
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <div className="flex flex-row justify-between items-center h-full px-2">
            <div className="flex flex-row justify-center items-center">
                <h1 className='font-bold'>SELECT THEME:&nbsp;&nbsp; </h1>
                <Radio.Group optionType="button" options={themeOptions} onChange={handleThemeChange} value={theme} />
            </div>
            <div>
                <Dropdown.Button menu={menuProps} placement="bottomRight" icon={<UserOutlined />}>
                    Account
                </Dropdown.Button>
            </div>
        </div>
    )
}

export default HeaderComponent