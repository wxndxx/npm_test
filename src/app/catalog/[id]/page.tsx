import { Metadata } from 'next'
import React from 'react'
import Product from './parts/Product'
import { API_BASE_URL_2 } from '@/api/api'

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({params: {id}}: Props): Promise<Metadata> {
  const response = await fetch(`${API_BASE_URL_2}/online/product/${id}`, { next: { revalidate: 20 }});
  const data = await response.json();
  return {
    title: `${data.products.name} | ${id}`,
  }
}

async function getProduct(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL_2}/online/product/${id}`, { next: { revalidate: 20 }});
    const data = await response.json();

    return data;
  } catch (error:any) {
    return [];
  }
}

export default async function ProductCard({params: {id}}: Props) {
  const productData:any = await getProduct(id)
  
  return (
    <div>
        <Product product={productData} />
    </div>
  )
}
