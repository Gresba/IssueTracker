'use client'

import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@/app/generated/prisma';
import "easymde/dist/easymde.min.css";

// Dynamically import SimpleMDE with no SSR
const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
);

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({issue}: {issue?: Issue}) => {

    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
    });

    const [ formSubmmited, setFormSubmitted ] = useState(false);
    const [ error, setError ] = useState("");

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form
                className='space-y-3 mt-3'
                onSubmit=
                {
                    handleSubmit(async (data) => {
                    try
                    {
                        setFormSubmitted(true)
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setFormSubmitted(false)
                        setError('An unexpected error occurred.');
                    }
                }
                )}>
                <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE 
                            placeholder='Description' 
                            {...field} />)}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={formSubmmited}>{formSubmmited ? "Submitting" : "Submit"} New Issue {formSubmmited && <Spinner/>} </Button>
            </form>
        </div>
    )
}

export default IssueForm