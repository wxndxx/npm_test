import React from 'react'
import s from './ReviewsCard.module.scss'
import Link from 'next/link'

type Props = {
    item: any
}

function ReviewsCard({item}: Props) {

    const {name, description} = item

  return (
    <div className='rounded-[8px] bg-white p-[20px] h-[390px] overflow-hidden relative cursor-pointer grid grid-rows-7'>
        <div className='flex justify-between pb-[10px] border-b border-b-gray2'>
            <p className='text-u-h4 text-[18px] font-bold'>{name}</p>
            <div className='absolute top-[12px] right-[12px]'><svg width="51" height="38" viewBox="0 0 51 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.10371 38L10.7858 15.6349L11.9266 23.4005C9.71413 23.4005 7.70908 22.8828 5.91145 21.8474C4.11381 20.812 2.66188 19.3969 1.55564 17.6022C0.518548 15.8074 0 13.8401 0 11.7003C0 9.49137 0.518548 7.52407 1.55564 5.79837C2.66188 4.00363 4.11381 2.58856 5.91145 1.55313C7.70908 0.517711 9.71413 0 11.9266 0C14.2082 0 16.2478 0.517711 18.0455 1.55313C19.8431 2.58856 21.2605 4.03815 22.2976 5.90191C23.3347 7.69664 23.8532 9.73297 23.8532 12.0109C23.8532 14.0817 23.3347 16.2906 22.2976 18.6376C21.3296 20.9846 19.6357 23.9873 17.2158 27.6458L10.371 38H0.10371Z" fill="#EFF7FE"/>
            <path d="M27.2505 38L37.9326 15.6349L39.0734 23.4005C36.8609 23.4005 34.8559 22.8828 33.0582 21.8474C31.2606 20.812 29.8087 19.3969 28.7024 17.6022C27.6653 15.8074 27.1468 13.8401 27.1468 11.7003C27.1468 9.49137 27.6653 7.52407 28.7024 5.79837C29.8087 4.00363 31.2606 2.58856 33.0582 1.55313C34.8559 0.517711 36.8609 0 39.0734 0C41.355 0 43.3946 0.517711 45.1923 1.55313C46.9899 2.58856 48.4073 4.03815 49.4444 5.90191C50.4814 7.69664 51 9.73297 51 12.0109C51 14.0817 50.4814 16.2906 49.4444 18.6376C48.4764 20.9846 46.7825 23.9873 44.3626 27.6458L37.5177 38H27.2505Z" fill="#EFF7FE"/>
            </svg></div>
        </div>
        <div className='text-i-p3 pt-[15px] flex justify-between flex-col max-h-max row-span-6'>
            {description}
            <div className='w-full justify-center items-center flex'>
            <Link href={item.link ?? 'https://mataleks.clients.site/?ysclid=lzgnq55u1q18111861#rating'} className={'flex p-[11px_15px] gap-[15px] items-center' + ' ' + s.btn__d}>Читать полностью на
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10C0 4.477 4.476 0 10 0C15.522 0 20 4.477 20 10C20 15.523 15.522 20 10 20C4.476 20 0 15.523 0 10Z" fill="#FC3F1D"/>
                    <path d="M11.2792 5.66655H10.3552C8.66122 5.66655 7.77022 6.52455 7.77022 7.78955C7.77022 9.21955 8.38622 9.88955 9.65122 10.7485L10.6962 11.4525L7.69322 15.9395H5.44922L8.14422 11.9255C6.59422 10.8145 5.72422 9.73555 5.72422 7.91055C5.72422 5.62255 7.31922 4.06055 10.3442 4.06055H13.3472V15.9285H11.2792V5.66655Z" fill="white"/>
                    </svg>
            </Link>
        </div>
        </div>
    </div>
  )
}

export default ReviewsCard