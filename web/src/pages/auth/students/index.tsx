import React from "react";
import queryString from 'query-string';
import { getRunningQueriesThunk, getStudents, useDeleteStudentMutation, useGetStudentsQuery } from "../../../services/students";
import { wrapper } from "../../../lib/store";
import { Button, Table, Pagination } from "antd";
import { useRouter } from 'next/router';
import './index.module.scss'

interface IProps {
    data: any
}

function StudentsPage(props: IProps) {
    const router = useRouter();
    const [deleteStudent] = useDeleteStudentMutation();

    function handleChangePagination(page: number, limit: number) {
        const query = queryString.stringify({ page, limit })
        router.replace(`students?${query}`);
    }

    function handleCreate() {
        router.push(`${router.route}/create`)
    }

    function handleView(id: string) {
        router.push(`${router.route}/${id}`)
    }

    function handleDelete(id: any) {
        deleteStudent(id)
    }

    const data = props.data;
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
                <h1 className="text-left text-2xl m-0 p-0"><b>Students Page</b> | Server Side Rendering (SSR)</h1>
                <p className="text-left">This page is a server side rendering which the HTML generation and API calls happens along the server and the requests and responses will not be visible to the client (Network).</p>
            </div>
            <Button onClick={handleCreate}>Create New</Button>
        </div>
        <Table dataSource={data?.data} columns={columns} pagination={false} rowKey="_id" />
        <div className='flex justify-end items-center py-9'>
            <Pagination defaultCurrent={data?.currentPage || 1} onChange={(page, limit) => handleChangePagination(page, limit)} total={data?.total} />
        </div>
    </div>
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ query }) => {
        store.dispatch(getStudents.initiate(query));
        const response = await Promise.all(store.dispatch(getRunningQueriesThunk()));
        return { props: response?.[0] };
    }
);

export default StudentsPage;