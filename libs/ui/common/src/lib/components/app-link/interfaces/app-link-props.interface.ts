import React from 'react';

export interface appLinkProps {
  href: string;
  className?: string;
  onClick?: () => unknown;
  children: React.ReactNode;
}
