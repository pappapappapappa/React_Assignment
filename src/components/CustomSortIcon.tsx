import React from 'react';
import UpIcon from '../assets/svg/Open.svg';
import DownIcon from '../assets/svg/Close.svg';

interface Props {
  direction: 'asc' | 'desc';
}

const CustomSortIcon: React.FC<Props> = ({ direction }) => {
  const iconSrc = direction === 'asc' ? UpIcon : DownIcon;
  const iconAlt = direction === 'asc' ? 'Ascending sort' : 'Descending sort';

  return (
    <img
      src={iconSrc}
      alt={iconAlt}
      style={{
        width: 14,
        height: 14,
        marginLeft: 4,
        verticalAlign: 'middle',
      }}
    />
  );
};

export default CustomSortIcon;