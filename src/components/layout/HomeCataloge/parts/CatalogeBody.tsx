
import Card from '@/app/catalog/parts/Card'
import React from 'react'

type Props = {
    products: any
}
//123
function CatalogeBody({products}: Props) {
    // useEffect(() => {
    //     console.log(products)
    // }, [])
    const parseProducts = products.splice(0, 8)
  return (
    <div className='xs:grid-cols-3 xxs:grid-cols-2 m:grid-cols-4 w-full justify-between gap-[10px] xxs:grid flex flex-col'>
        {parseProducts.map((item:any, index:number) => (
            <Card item={item} key={index} main_image={item.main_image} name={item.name} link={`catalog/${item.id}`}/>
        ))}
    </div>
  )
}

export default CatalogeBody