import React from 'react';

const TextArea = ({
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
    required = false,
    minLength,
    maxLength,
    pattern,
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
                {label}{required ? <span className='text-danger fw-bold'> *</span> : ""}
            </label>}
            <textarea
                className={`form-control ${!isValid ? 'is-invalid' : ''}`}
                id={name}
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
            ></textarea>
            {!isValid && errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
            {isValid && validMessage && <div className="valid-feedback">{validMessage}</div>}
        </div>
    );
};

export default TextArea;
