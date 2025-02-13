import React from 'react'
import StudentForm from '@/components/auth/students/form';
import { useRouter } from 'next/router';
import { useCreateStudentMutation } from '@/services/students'
import { IStudentsData } from '@/types/students';
import './index.module.scss'

const PageCreate = () => {
    const router = useRouter();
    const [createStudent, { isLoading }] = useCreateStudentMutation();

    function handleSubmit(value: IStudentsData) {
        createStudent({ ...value })
        router.back()
    }

    return (
        <StudentForm
            name='editStudent'
            onFinish={(e) => handleSubmit(e)}
            loading={isLoading}
            disabled={isLoading}
            action='create'
        />
    )
}

export default PageCreate