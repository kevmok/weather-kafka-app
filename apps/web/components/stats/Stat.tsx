import React, { ReactNode, HTMLAttributes } from 'react';

interface StatProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Stat = ({ children, className, ...rest }: StatProps) => {
  const wrapperClassName = `stat ${className || ''}`;

  return (
    <div className={wrapperClassName} {...rest}>
      {children}
    </div>
  );
};

export default Stat;
