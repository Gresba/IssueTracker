'use client'

import { usePathname } from 'next/navigation';

import { FaBug } from "react-icons/fa";

import classNames from 'classnames';
import Link from 'next/link'
import React from 'react'

import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Skeleton, Text } from '@radix-ui/themes';

const NavBar = () => {
    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify="between" align="center">
                    <Flex align="center" gap="3">
                        <Link href="/"><FaBug /></Link>
                        <NavLinks/>
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}


const NavLinks = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]
    return (
        <ul className='flex space-x-6'>
            {links.map(link =>
                <li key={link.href}>
                    <Link
                        key={link.href}
                        className={
                            classNames(
                                {
                                    'nav-link': true,
                                    '!text-zinc-900': link.href === currentPath,
                                }
                            )}
                        href={link.href}>{link.label}</Link>
                </li>
            )}
        </ul>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return <Skeleton width="3rem"/>;
    if (status === "unauthenticated")
        return <Link href="/api/auth/signin" className='nav-link'>Sign In</Link>

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!}
                        className='cursor-pointer'
                        fallback="?"
                        size="2"
                        radius='full' />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

export default NavBar