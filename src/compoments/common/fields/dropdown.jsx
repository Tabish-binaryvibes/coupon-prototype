import React from 'react';
import Refresh from '../../../assets/images/icons/refresh.svg';

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  onFocus,
  onInput,
  onInvalid,
  name,
  onRefresh,
  required = false,
  errorMessage,
  validMessage,
  className,
  disabled
}) => {
  const [isValid, setIsValid] = React.useState(true);

  const handleInvalid = (e) => {
    e.preventDefault();
    setIsValid(false);
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: 300, /* Set the maximum height of the dropdown menu */
      overflowY: 'auto',
      overflowX: 'hidden'
    }),
    option: (provided) => ({
      ...provided,
      height: 40, /* Set the height for each option */
      lineHeight: '40px', /* Align text vertically */
    }),
  };

  const handleBlur = (e) => {
    if (e.target.checkValidity()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    if (onBlur) onBlur(e);
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={name} className={`${className} text-secondary mb-1`}>
        {label} {required ? <span className='text-danger fw-bold'> *</span> : ""}</label>}
      {onRefresh && <img src={Refresh} alt="Refresh button" width={15} height={15} className='mx-2 hover' onClick={() => onRefresh()} />}

      <select
        className={`form-control form-select ${!isValid ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={onFocus}
        onInput={onInput}
        onInvalid={handleInvalid}
        required={required}
        disabled={disabled}
        styles={customStyles}

      >
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!isValid && errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
      {isValid && validMessage && <div className="valid-feedback">{validMessage}</div>}
    </div>
  );
};

export default Dropdown;
