import React from 'react';

export default function ({ className, onClick }) {
  return (
    <button className={`${className} icon-btn`} onClick={onClick}></button>
  );
}
