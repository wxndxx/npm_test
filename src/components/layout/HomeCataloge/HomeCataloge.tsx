import Icon from '@/components/UI/Icon/Icon'
import React, { useEffect, useState } from 'react'
import CatalogeBody from './parts/CatalogeBody'
import { $api2, API_BASE_URL_2 } from '@/api/api';
import { useRouter } from 'next/navigation';

type Props = {}

function HomeCataloge({}: Props) {
    const [productsData, setProductsData] = useState<any>()
    useEffect(() => {
        $api2.get(`${API_BASE_URL_2}/online/catalog_product/6`)
        .then((res:any) => {
            setProductsData(res.data)
        })
        .catch((err:any) => {
            console.log(err)
        })
    }, [])
    const {push} = useRouter()
    return (

    <div className='flex flex-col gap-[20px]'>
        <div className='w-full flex justify-between items-center'>
            <h2 className='text-u-h2 uppercase font-bold'>Каталог деталей</h2>
            <button className='btn__p hidden xs:flex gap-[15px] p-[9px_15px]' onClick={() => push('/catalog')}>Смотреть все <Icon type='uf'></Icon></button>
        </div>
        {productsData && 
            <div>
                <CatalogeBody products={productsData?.results}/>
            </div>
        }
        <button className='btn__p xs:hidden flex gap-[15px] p-[9px_15px] w-full'  onClick={() => push('/catalog')}>Смотреть все <Icon type='uf'></Icon></button>
    </div>
    )
}

export default HomeCataloge