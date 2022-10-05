import React from 'react';
import './Header.scss';

export default function Header(header) {
  return (
    <>
        <h1 className='header-title'>{header.title}</h1>
    </>
  )
}
