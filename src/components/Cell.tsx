import React from 'react';

interface Props {
  value: string | null;
  onClick: () => void;
}

const Cell: React.FC<Props> = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick}>
      {value}
    </button>
  );
};

export default Cell;  