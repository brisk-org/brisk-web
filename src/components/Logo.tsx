import React from 'react';

const Logo: React.FC<{ type: 'brisk' | 'company' }> = ({ type }) => {
  const logoPath = {
    brisk: '/svg/brisk-logo.svg',
    company: '/images/logo.jpg'
  };
  return (
    <img
      style={{
        width: type === 'brisk' ? 150 : 50,
        objectFit: 'cover',
        borderRadius: '50%'
      }}
      alt="Logo"
      src={logoPath[type]}
    />
  );
};

export default Logo;
