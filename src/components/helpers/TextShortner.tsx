import React from 'react';

const FieldShortner: React.FC<{ text: string | number; amount: number }> = ({
  text,
  amount
}) => {
  return (
    <>
      {String(text).length > amount
        ? `${String(text).substring(0, amount)}...`
        : text}
    </>
  );
};

export default FieldShortner;
