import React from 'react';
export default function ({
  className,
  onClick,
}: {
  className: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <button className={`${className} icon-btn`} onClick={onClick}></button>
  );
}
