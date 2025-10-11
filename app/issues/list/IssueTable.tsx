import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue, Status } from '@/app/generated/prisma'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

export interface IssueQuery {
    status: Status, 
    orderBy: keyof Issue,
    page: string
}

interface Props {
    searchParams: IssueQuery,
    issues: Issue[]
}

const IssueTable = async ({ searchParams, issues }: Props) => {

    const resolvedSearchParams = await searchParams;

    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map(column =>
                        <Table.ColumnHeaderCell key={column.value} className={column.className}>
                            <Link href={
                                {
                                    query: { ...resolvedSearchParams, orderBy: column.value }
                                }
                            }>
                                {column.label}
                            </Link>
                            {column.value === resolvedSearchParams.orderBy && <ArrowUpIcon className='inline' />}
                        </Table.ColumnHeaderCell>)}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map(issue => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Link href={`/issues/${issue.id}`} >
                                <div className='font-bold md:font-normal'>{issue.title}</div>
                            </Link>
                            <div className='block md:hidden'>
                                <IssueStatusBadge status={issue.status} />
                            </div>
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>
                            <IssueStatusBadge status={issue.status} />
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

const columns: {
        label: string;
        value: keyof Issue;
        className?: string;
    }[] = [
            { label: 'Issue', value: 'title' },
            { label: 'Status', value: 'status', className: "hidden md:table-cell" },
            { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" }
        ]
        
export const columnNames = columns.map(column => column.value);

export default IssueTable