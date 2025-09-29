import React from 'react';

const TextInput = ({
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onInput,
  onInvalid,
  onPaste,
  onCopy,
  onCut,
  name,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  minLength,
  maxLength,
  pattern,
  errorMessage,
  validMessage,
  className,
  id,
}) => {
  const [isValid, setIsValid] = React.useState(true);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleInvalid = (e) => {
    e.preventDefault();
    setIsValid(false);
  };

  // const handleBlur = (e) => {
  //   if (e.target.checkValidity()) {
  //     setIsValid(true);
  //   } else {
  //     setIsValid(false);
  //   }
  //   if (onBlur) onBlur(e);
  // };
  const handleBlur = (e) => {
    let valid = true;
    if (type === "email") {
      valid = emailRegex.test(e.target.value);
    } else {
      valid = e.target.checkValidity();
    }

    setIsValid(valid);
    if (onBlur) onBlur(e);
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={name} className={`${className} text-secondary mb-1`}>
        {label}{required ? <span className='text-danger fw-bold'> *</span> : ""}
      </label>}
      <input
        type={type}
        className={`form-control ${!isValid ? 'is-invalid' : ''}`}
        id={id || name}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onInput={onInput}
        onInvalid={handleInvalid}
        onPaste={onPaste}
        onCopy={onCopy}
        onCut={onCut}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
      />
      {!isValid && errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
      {isValid && validMessage && <div className="valid-feedback">{validMessage}</div>}
    </div>
  );
};

export default TextInput;
