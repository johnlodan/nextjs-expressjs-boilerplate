"use client"
import React from 'react'
import TeacherForm from '../../../../components/auth/teachers/form'
import { useGetTeacherQuery, useUpdateTeacherMutation } from '../../../../services/teachers'
import { useRouter } from 'next/router';
import '../index.module.scss'
import { ITeachersData } from '@/types/teachers';

const PageView = () => {
    const router = useRouter();
    const id = router.query.id
    const [updateTeacher, { isLoading }] = useUpdateTeacherMutation();
    const result = useGetTeacherQuery(id, { skip: router.isFallback });

    function handleSubmit(value: ITeachersData) {
        updateTeacher({ ...value, id })
        router.back()
    }

    return (
        <TeacherForm
            name='editTeacher'
            onFinish={(e: ITeachersData) => handleSubmit(e)}
            data={result?.data}
            loading={isLoading}
            disabled={isLoading}
            action='update'
        />
    )
}

export default PageView

