'use client';
import { User } from '@/app/generated/prisma';
import { Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

const AssigneeSelect = () => 
{
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000, //60s
        retry: 3
    })

    if(isLoading) return <Skeleton />

    if(error) return null;

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggessions</Select.Label>
                    {users?.map(user => 
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    )}
        
                </Select.Group>
                {/* <Select.Separator />
                <Select.Group>
                    <Select.Label>Vegetables</Select.Label>
                    <Select.Item value="carrot">Carrot</Select.Item>
                    <Select.Item value="potato">Potato</Select.Item>
                </Select.Group> */}
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect