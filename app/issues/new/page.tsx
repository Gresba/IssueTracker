'use client'

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import { useState } from 'react'
import "easymde/dist/easymde.min.css";

const NewIssuesPage = () => {
    const [value, setValue] = useState('')

    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root placeholder='Title'></TextField.Root>
            <SimpleMDE 
                value={value} 
                onChange={setValue}
                />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default NewIssuesPage