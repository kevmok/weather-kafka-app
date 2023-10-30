import React, { ReactNode, HTMLAttributes } from 'react';

interface StatsWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const StatsWrapper = ({ children, className, ...rest }: StatsWrapperProps) => {
  const wrapperClassName = `stats ${className || ''}`;

  return (
    <div className={wrapperClassName} {...rest}>
      {children}
    </div>
  );
};

export default StatsWrapper;
