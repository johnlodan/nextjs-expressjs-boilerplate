"use client"
import React from 'react'
import { useRouter } from 'next/router';
import { useCreateTeacherMutation } from '../../../services/teachers';
import TeacherForm from '../../../components/auth/teachers/form';
import { ITeachersData } from '@/types/teachers';
import './index.module.scss'

const PageCreate = () => {
    const router = useRouter();
    const [createTeacher, { isLoading }] = useCreateTeacherMutation();

    function handleSubmit(value: ITeachersData) {
        createTeacher({ ...value })
        router.back()
    }

    return (
        <TeacherForm
            name='editTeacher'
            onFinish={(e: any) => handleSubmit(e)}
            loading={isLoading}
            disabled={isLoading}
            action='create'
        />
    )
}

export default PageCreate