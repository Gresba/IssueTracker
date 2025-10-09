'use client';
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggessions</Select.Label>
                    <Select.Item value="1">Moshy</Select.Item>
        
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