import React, { FC } from 'react';
import Link from 'next/link';
import { appLinkProps } from './interfaces/app-link-props.interface';


export const AppLink: FC<appLinkProps> = ({ children, href, className, onClick }) => {

  return (
    <Link href={{ pathname: href }}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </Link>
  );
};

