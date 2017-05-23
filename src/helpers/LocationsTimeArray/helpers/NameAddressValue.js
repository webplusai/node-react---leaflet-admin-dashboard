import React from 'react';

function NameAddressValue({ item }) {
  if (item) {
    return (
      <div>
        {item}
      </div>
    );
  }

  return (
    <div>
      Not selected
    </div>
  );
}

export default NameAddressValue;