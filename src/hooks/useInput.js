import React from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = React.useState(defaultValue);

  const onValueChange = (event) => {
    setValue(event.target.value);
  };

  return [value, onValueChange];
}

export default useInput;
