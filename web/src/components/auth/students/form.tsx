"use client"
import React, { useEffect } from 'react'
import { Row, Col, Input, Button, Form, Flex, Divider } from 'antd'
import { useRouter } from 'next/router';
import { IStudentsProps } from '@/types/students';
import '../../../pages/auth/students/index.module.scss'

const StudentForm = (props: IStudentsProps) => {
    const [form] = Form.useForm()
    const router = useRouter();

    useEffect(() => {
        form.setFieldsValue({ ...props.data })
    }, [props?.data, form])

    return (
        <Form name={props.name} form={form} onFinish={(e) => props.onFinish(e)}  >
            <Row gutter={12} style={{ width: '100%' }}>
                <Col md={12} lg={8} sm={24} xs={24}>
                    <h1 className='text-left bold py-3 px-2'>{props?.action?.toUpperCase()} INFORMATION</h1>
                    <Divider />
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input first name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input last name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Flex style={{ width: "100%" }} justify="flex-end">
                        <Form.Item >
                            <Button className="mx-1" onClick={() => router.back()}>Cancel</Button>
                            <Button className="mx-1" htmlType="submit"
                                loading={props.loading} disabled={props.disabled}  >
                                Save
                            </Button>
                        </Form.Item>
                    </Flex>
                </Col>
            </Row>
        </Form>
    )
}

export default StudentForm

