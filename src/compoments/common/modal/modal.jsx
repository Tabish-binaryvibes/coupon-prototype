import { useEffect, useState } from "react";

export default function StatusModal({ show, onClose, data, onSave }) {
    const [formData, setFormData] = useState({ Name: "", Email: "", Approved: false, Active: false });

    useEffect(() => {
        console.log(data)
        if (data) {
            setFormData({
                Name: data.Name || "",
                Email: data.Email || "",
                Approved: data.Approved || "No",
                Active: data.Active || false
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = () => {
        onSave(data._id, formData);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            {show && <div className="modal-backdrop fade show"></div>}

            <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Member</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {/* Name Input */}
                            {/* <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                />
                            </div> */}

                            {/* Email Input */}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="Email"
                                    disabled
                                    value={formData.Email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Approved Checkbox */}
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="approvedCheckbox"
                                    name="Approved"
                                    checked={formData.Approved}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="approvedCheckbox">Approved</label>
                            </div>

                            {/* Active Checkbox */}
                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="activeCheckbox"
                                    name="Active"
                                    checked={formData.Active}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="activeCheckbox">Active</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
