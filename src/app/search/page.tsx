import React from 'react'
import Search from './parts/Search'
import { Metadata } from 'next';

type Props = {}

export const metadata: Metadata = {
    title: "MATALEX | Поиск",
    description: "MATALEX | Search",
  };

function SearchContainer({}: Props) {
  return (
    <div>
        <Search />
    </div>
  )
}

export default SearchContainer