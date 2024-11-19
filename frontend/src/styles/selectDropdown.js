const dropdownStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: state.isFocused
        ? '2px solid rgba(109, 162, 255, 0.8)'
        : '2px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '10px',
      boxShadow: state.isFocused ? '0 0 5px rgba(109, 162, 255, 0.8)' : 'none',
      color: 'white',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'rgba(255, 255, 255, 0.7)',
      fontStyle: 'italic',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'white',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '10px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? 'rgba(255, 255, 255, 0.2)'
        : 'transparent',
      color: state.isFocused ? 'black' : 'white',
      cursor: 'pointer',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '5px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'white',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'rgba(255, 255, 255, 0.7)',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        color: 'black',
      },
    }),
  };

  export default dropdownStyles;