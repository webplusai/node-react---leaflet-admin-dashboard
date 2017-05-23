import React from 'react';

function NameAddressItem({ item }) {
  if (item) {
    return (
      <div>
        {item.name} <small>{item.address}</small>
      </div>
    );
  }

  return (
    <div>
      Not selected
    </div>
  );
}

export default NameAddressItem;