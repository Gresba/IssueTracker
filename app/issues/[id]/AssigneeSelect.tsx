'use client';
import { User } from '@/app/generated/prisma';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
    const [ users, setUsers ] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } =await axios.get<User[]>('/api/users');
            setUsers(data);
        }
        
        fetchUsers();
    }, [])

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggessions</Select.Label>
                    {users.map(user => 
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