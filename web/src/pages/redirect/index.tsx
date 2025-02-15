"use client"
import { Layout, Card, Button } from 'antd'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePostLogoutMutation } from '@/services/login';
import { useSearchParams } from 'next/navigation'

const DEFAULT_TIMEOUT = 10

const RedirectPage = () => {
    const searchParams = useSearchParams()
    const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIMEOUT);
    const [postLogout] = usePostLogoutMutation()

    useEffect(() => {
        if (timeLeft === 0) {
            handleRedirect()
            setTimeLeft(0)
        }
        if (!timeLeft) return;
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    async function handleRedirect() {
        await postLogout("")
        Cookies.remove(process.env.TOKEN_NAME!)
        window.location.href = '/login'
    }

    return (
        <Layout className='h-lvh'>
            <Layout.Content className='h-full flex justify-center items-center text-center'>
                <Card style={{ width: 380 }}>
                    <div className='py-8'>
                        <h1 className='font-bold text-center mb-5 text-2xl'>Ooops! </h1>
                        <p className='font-bold text-sm'>{atob(searchParams.get('message')!)}</p>
                        <p className='text-opacity-80'>Status: {atob(searchParams.get('status')!)}</p>
                    </div>
                    <Button className='w-full' onClick={handleRedirect}>Redirect to Login Page <b>({timeLeft})</b></Button>
                </Card>
            </Layout.Content>
        </Layout>
    )
}

export default RedirectPage