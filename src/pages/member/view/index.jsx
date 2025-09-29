import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAMSCustomersById, getMemberByUniqueId, updateAMSMemberById } from "../../../utils/end-points/user";
// import { UserIcons } from "../../../libs/constants.jsx";
// import DataTable from "../../../compoments/common/DataTable";
// import StatusModal from "../../../compoments/common/modal/modal";

export default function ViewUser() {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [user_id, setUserID] = useState("");
    const [message, setMessage] = useState("");

    const [status, setStatus] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const getUserDetails = async () => {
        setLoading(true);
        try {
            if (!id) return;

            const res = await getMemberByUniqueId(id);
            const details = res;
            setUserID(details?._id);
            const address = details?.BillingAddress?.Address1
                && details?.BillingAddress?.Address2;
            const completeAddress = address ?
                `${details?.BillingAddress?.Address1 || ''}, ${details?.BillingAddress?.City || ''}, ${details?.BillingAddress?.StateProvince || ''} ${details?.BillingAddress?.ZipCode || ''}`.trim()
                : "N/A";

            if (res) {
                const userData = {
                    _id: details?.UniqueID,
                    ParentMemberName: details?.Name,
                    MemberProfile: details?.MemberProfile,
                    Name: details?.Name,
                    email: details?.Email,
                    active: details?.Active,
                    phone: details?.Phone,
                    address: completeAddress,
                    website: details?.Website,
                    approved: details?.Approved,
                    jobTitle: details?.JobTitle,
                };
                setUser(userData);
                setStatus(details?.Active);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, [id]);

    if (loading) {
        return <div className="container mt-4"><p>Loading...</p></div>;
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value === "true");
    };

    const handleSaveChanges = () => {
        setShowPopup(true);
    };

    const confirmStatusChange = async () => {
        setShowPopup(false);
        const payload = {
            "Active": status
        }
        setLoading(true);
        const res = await updateAMSMemberById(payload, user_id);
        getUserDetails();
        setLoading(false);
        setMessage("Your status has been successfully updated. Thank you for keeping your information up to date!");
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    if (!user) {
        return <div className="container mt-4"><p>User not found.</p></div>;
    }

    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-3">{" " + user?.ParentMemberName}</h2>
                <div className="row g-3">
                    <div className="col-md-6">
                        <p className="form-control-plaintext">
                            <label className="form-label fw-bold">Name: </label>
                            {" " + user?.Name}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p className="form-control-plaintext">
                            <label className="form-label fw-bold">Member Profile:</label>
                            <span className="text-danger">
                                {" " + user?.MemberProfile}
                            </span> </p>
                    </div>
                    <div className="col-md-6">
                        <p className="form-control-plaintext">
                            <label className="form-label fw-bold">Email:</label>
                            {" " + user?.email}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="form-control-plaintext">
                            <label className="form-label fw-bold">Phone:</label>
                            {" " + user?.phone}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="form-control-plaintext"><a href={user?.website} target="_blank" rel="noopener noreferrer">
                            <label className="form-label fw-bold">Website:</label>
                            {user?.website ? " " + user?.website : " N/A"}</a></p>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Status:</label>
                        <select className="form-select" value={status} onChange={handleStatusChange}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <p className={`form-control-plaintext ${" " + user?.approved ? 'text-success' : 'text-danger'}`}>
                            <label className="form-label fw-bold">Approved:</label>
                            {user?.approved ? " Yes" : " No"}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p className="form-control-plaintext">
                            <label className="form-label fw-bold">Job Title:</label>
                            {" " + user?.jobTitle || 'N/A'}</p>
                    </div>
                </div>
                <div className="col-md-12">
                    <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
                </div>
                {message && <div className="col-md-12 mt-3">
                    <div className="alert alert-primary" role="alert">
                        {message}
                    </div>
                </div>
                }
            </div>



            {showPopup && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Status Change</h5>
                                <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Do you want to change the status?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={confirmStatusChange}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
