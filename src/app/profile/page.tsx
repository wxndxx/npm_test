import React from 'react'
import ProfileBody from './parts/ProfileBody/ProfileBody'
import Container from '@/components/UI/Container/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MATALEX | Профиль',
  description: 'Profile\'s description'
}

export default function Profile() {

  return (
    <div className='p-[40px_0px_80px_0px]'>
      <Container>
        <ProfileBody />
      </Container>
    </div>
  );
}