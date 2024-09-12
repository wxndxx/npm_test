import { Metadata } from 'next'
import React from 'react'
import Appointment from './parts/Appointment'

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({params: {id}}: Props): Promise<Metadata> {
  return {
    title: `Запись | ${id}`,
  }
}

export default async function AppointmentContainer({params: {id}}: Props) {
  return (
    <div>
        <Appointment id={id} />
    </div>
  )
}
