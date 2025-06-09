'use client';

import Link from "next/link";

export default function Layout({children, navigation, page}) {
  console.log(navigation)
  return(
    <div className={page}>
      <div className="colors">
        {navigation.map((item, i) =>{
          return(
            <div className={`color color${i}`} key={`color${i}`}></div>
          )
        })}
      </div>
      <div className="navigation">
        {navigation.map((item, i) =>{
          return(
            <Link className={`nav-item`} key={`nav${i}`} href={`/${item.uid}`}>
              {item.text}
            </Link>
          )
        })}
      </div>
      <Link className="logo" href="/">
        
      </Link>
      {children}
    </div>
  )
}