"use client"
import React from "react";
import { useDeleteTeacherMutation, useGetTeachersQuery } from "../../../services/teachers";
import { Button, Table, Pagination } from "antd";
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'
import queryString from 'query-string';
import './index.module.scss'
function TeachersPage() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const query = { page: searchParams.get('page'), limit: searchParams.get('limit') }
    const [deleteTeacher] = useDeleteTeacherMutation();
    const result = useGetTeachersQuery(query, { skip: router.isFallback, });

    function handleChangePagination(page: number, limit: number) {
        const query = queryString.stringify({ page, limit })
        router.replace(`teachers?${query}`);
    }

    function handleCreate() {
        router.push(`${router.route}/create`)
    }

    function handleView(id: string) {
        router.push(`${router.route}/${id}`)
    }

    function handleDelete(id: any) {
        deleteTeacher(id)
    }

    const { data } = result;
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, item: any) => {
                return (
                    <div >
                        <Button size='small' className="mx-1" onClick={() => handleView(item?._id)}>
                            View
                        </Button>
                        <Button size='small' className="mx-1" onClick={() => handleDelete(item?._id)}>
                            Delete
                        </Button>
                    </div>
                )
            }
        }
    ];

    return <div>
        <div className="p-3 mb-3 flex justify-between items-start">
            <div>
                <h1 className="text-left text-2xl m-0 p-0"><b>Teachers Page</b> | Client Side Rendering (CSR)</h1>
                <p className="text-left">This page is a client side rendering which all the API calls happens in the browser. also client side rendering allows you to use React Hooks and make an interactive designs.</p>
            </div>
            <Button onClick={handleCreate}>Create New</Button>
        </div>
        <Table dataSource={data?.data} columns={columns} pagination={false} rowKey="_id" />
        <div className='flex justify-end items-center py-9'>
            <Pagination defaultCurrent={data?.currentPage || 1} onChange={(page, limit) => handleChangePagination(page, limit)} total={data?.total} />
        </div>
    </div>
}

export default TeachersPage;