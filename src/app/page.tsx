import React from 'react'
import HomePage from '@/components/layout/HomePage/HomePage'
import { Metadata } from 'next';
import { API_BASE_URL_2 } from '@/api/api';

type Props = {}

export const metadata: Metadata = {
  title: "MATALEX | Главная",
  description: "MATALEX | Home",
  verification: {
    google: 'USiYSlmiM4nYf2V8lAijYS107x6O9hbsUUpuTfds48s',
  }
};


async function getComments() {
  try {
    const response = await fetch(`${API_BASE_URL_2}/online/comments/`, { next: { revalidate: 20 }});
    const data = await response.json();

    return data;
  } catch (error:any) {
    return [];
  }
}

async function getReviews() {
  try {
    const response = await fetch(`${API_BASE_URL_2}/online/reviews/`, { next: { revalidate: 20 }});
    const data = await response.json();

    return data;
  } catch (error:any) {
    return [];
  }
}

async function getHomeCataloge() {
  try {
    const response = await fetch(`${API_BASE_URL_2}/catalog_product/6`, { next: { revalidate: 20 }});
    const data = await response.json();

    return data;
  } catch (error:any) {
    return [];
  }
}

export default async function Home({}: Props) {

  const getCommentsData:any = await getComments()
  const getReviewsData:any = await getReviews()
  const getHomeCatalogeData:any = await getHomeCataloge()
  return (
    <>
      <HomePage comments={getCommentsData} reviews={getReviewsData} homeCataloge={getHomeCatalogeData}/>
    </>
  )
}
