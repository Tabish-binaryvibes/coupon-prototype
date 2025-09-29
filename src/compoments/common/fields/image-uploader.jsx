import React, { useState, useEffect } from 'react';

const ImageUploader = ({ label, name, onUpload, className, required, disabled, updateView, path, hideInput = true }) => {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If no preview image is set and a backend path exists, use the backend image
        if (!preview && path) {
            setPreview(path);
        }
    }, [path]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png'];
            const maxSize = 1 * 1024 * 1024; // 1MB

            if (!validTypes.includes(file.type)) {
                setError('Invalid file type. Only JPEG, and PNG are allowed.');
                return;
            }

            if (file.size > maxSize) {
                setError('File size exceeds 1MB.');
                return;
            }

            setError(null);
            setPreview(URL.createObjectURL(file));
            onUpload(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        onUpload(null);
    };

    return (
        <div className={`image-uploader`}>
            {hideInput ? <label className={`${className} text-secondary mb-1`}>{label}</label> : ""}
            {preview ? (
                <div className="image-preview">
                    <div>
                        <img src={preview} alt="Preview" style={{ width: "30%" }} />
                    </div>
                    <div className='mt-2'>
                        {!disabled && (
                            <button
                                type="button"
                                className='btn btn-danger'
                                onClick={handleRemoveImage}
                                disabled={disabled}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                hideInput && (
                    <div className="file-input">
                        <input
                            type="file"
                            name={name}
                            accept="image/*"
                            onChange={handleFileChange}
                            required={required}
                            disabled={disabled}
                            className="form-control"
                        />
                    </div>
                )
            )}
            {error && <div className="error text-danger">{error}</div>}
        </div>
    );
};

export default ImageUploader;
