import React, { FC } from 'react';
import Link from 'next/link';
import { appLinkProps } from './interfaces/app-link-props.interface';


export const AppLink: FC<appLinkProps> = ({ children, href, className, onClick }) => {

  return (
    <Link href={{ pathname: href }}>
      <div className={className}>
        <a onClick={onClick}>
          {children}
        </a>
      </div>
    </Link>
  );
};

