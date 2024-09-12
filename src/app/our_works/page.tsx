

import { Metadata } from 'next'
import React from 'react'
import OurWorksBody from './parts/OurWorksBody'

type Props = {}

export const metadata: Metadata = {
    title: 'MATALEX | Наши работы',
    description: 'OurWorks\'s description'
  }

function page({}: Props) {
  return (
    <div>
      <OurWorksBody />
    </div>
  )
}

export default page