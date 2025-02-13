import { usePostLoginMutation } from '@/services/login'
import { Layout, Card, Form, Input, Button, notification } from 'antd'
import Cookies from 'js-cookie';

interface IData {
    email: string;
    password: string;
}

interface IErrorMessage {
    data: {
        message: string;
    }
}

const LoginPage = () => {
    const [postLogin, { isLoading, isSuccess, data }] = usePostLoginMutation()

    async function handleSubmit(data: IData) {
        const response: any = await postLogin({ ...data })
        const { error }: { error: IErrorMessage } = response
        if (error) notification.warning({ message: 'Invalid', description: error.data?.message })
    }

    if (isSuccess) {
        Cookies.set(process.env.TOKEN_NAME!, data.token)
        window.location.href = '/auth'
    }

    return (
        <Layout className='h-lvh'>
            <Layout.Content className='h-full flex justify-center items-center'>
                <Card style={{ width: 380 }}>
                    <div className='py-8'>
                        <h1 className='font-bold text-center'>MongoDB ⦾ ExpressJS ⦾ NextJS ⦾ NodeJS </h1>
                    </div>
                    <Form
                        name='login'
                        labelCol={{ span: 6 }}
                        onFinish={(data: IData) => handleSubmit(data)}
                    >
                        <Form.Item
                            name='email'
                            label='Email'
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: "email", message: "The input is not valid E-mail!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            label='Password'
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { max: 12, message: "Password should be less than 12 character" },
                                { min: 6, message: "Password should be greater than 6 character" },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <div>
                                <Button className='w-full'
                                    disabled={isLoading} loading={isLoading}
                                    htmlType='submit'>
                                    Log in
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                    <div className=''>
                        <h1 className='text-right text-xs'>johnlodantojot©2025</h1>
                    </div>
                </Card>
            </Layout.Content>
        </Layout>
    )
}

export default LoginPage