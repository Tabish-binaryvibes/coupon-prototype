import React from 'react';
import Select from 'react-select';
import Refresh from '../../../assets/images/icons/refresh.svg';

const MultiSelectDropdown = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  onFocus,
  onInputChange,
  onInvalid,
  name,
  onRefresh,
  required = false,
  errorMessage,
  validMessage,
  className,
  disabled,
  isMulti = true,
}) => {

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

  const [isValid, setIsValid] = React.useState(true);

  const handleInvalid = (e) => {
    e.preventDefault();
    setIsValid(false);
    if (onInvalid) onInvalid(e);
  };

  const handleBlur = (e) => {
    if (e.target.checkValidity()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    if (onBlur) onBlur(e);
  };

  const handleInputChange = (inputValue, actionMeta) => {
    if (onInputChange) onInputChange(inputValue, actionMeta);
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={name} className={`${className} text-secondary mb-1`}>
        {label}{required ? <span className='text-danger fw-bold'> *</span> : ""}
        {onRefresh && <img src={Refresh} alt="Refresh button" width={15} height={15} className='mx-2 hover' onClick={() => onRefresh()} />}
      </label>}
      <Select
        classNamePrefix="react-select"
        className={`${!isValid ? 'is-invalid' : ''}`}
        instanceId={value}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={onFocus}
        onInputChange={handleInputChange}
        onInvalid={handleInvalid}
        required={required}
        isMulti
        options={options}
        isDisabled={disabled}
        styles={customStyles}
      />
      {!isValid && errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
      {isValid && validMessage && <div className="valid-feedback">{validMessage}</div>}
    </div>
  );
};

export default MultiSelectDropdown;
