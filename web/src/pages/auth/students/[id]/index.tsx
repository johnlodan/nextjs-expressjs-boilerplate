import React from 'react'
import StudentForm from '@/components/auth/students/form';
import { getRunningQueriesThunk, getStudent, useGetStudentQuery, useUpdateStudentMutation } from '@/services/students'
import { useRouter } from 'next/router';
import { wrapper } from "../../../../lib/store";
import { IStudentsData } from '@/types/students';
import '../index.module.scss'

const PageView = () => {
    const router = useRouter();
    const id = router.query.id
    const [updateStudent, { isLoading }] = useUpdateStudentMutation();
    const result = useGetStudentQuery(id, { skip: router.isFallback });

    function handleSubmit(value: IStudentsData) {
        updateStudent({ ...value, id })
        router.back()
    }

    return (
        <StudentForm
            name='editStudent'
            onFinish={(e) => handleSubmit(e)}
            data={result?.data}
            loading={isLoading}
            disabled={isLoading}
            action='update'
        />
    )
}

export default PageView

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ params }) => {
        store.dispatch(getStudent.initiate(params?.id));
        await Promise.all(store.dispatch(getRunningQueriesThunk()));
        return {
            props: {},
        };
    }
);
