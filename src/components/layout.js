'use client';

import Link from "next/link";

export default function Layout({children, navigation, page}) {
  console.log(page)
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
        <Link className="small-logo" href="/">
          <img src="/logo.svg"/>
        </Link>
        {navigation.map((item, i) =>{
          return(
            <Link className={`nav-item`} key={`nav${i}`} href={`/${item.uid}`}>
              {item.text}
            </Link>
          )
        })}
      </div>
      {(page == 'contact' || page == 'home') &&
        <Link className="logo" href="/"></Link>
      }
      {children}
    </div>
  )
}