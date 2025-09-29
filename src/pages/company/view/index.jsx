import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAMSCustomersById } from "../../../utils/end-points/user.js";
import { CompanyFamilyTreeIcons } from "../../../libs/constants.jsx";
import DataTable from "../../../compoments/common/DataTable.jsx";

export default function ViewUser() {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            try {
                if (!id) return;

                const res = await getAMSCustomersById(id);

                const familyTreeRes = res?.members;
                const details = res?.company;

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
                    const familyTree = familyTreeRes?.map((item, index) => ({
                        _id: item?.UniqueID,
                        Index: index + 1,
                        Name: item?.Name,
                        address: (item?.BillingAddress?.Address1
                            && item?.BillingAddress?.Address2) ?
                            `${item?.BillingAddress?.Address1}, ${item?.BillingAddress?.City}, ${item.BillingAddress?.StateProvince} ${item?.BillingAddress?.ZipCode}` : "N/A",
                        Email: item?.Email,
                        Active: item?.Active,
                        Approved: item?.Approved,
                        Phone: item?.Phone || "-",
                        JobTitle: item?.JobTitle || "-",
                    }));
                    setRows(familyTree);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };
        getUserDetails();
    }, [id]);

    if (loading) {
        return <div className="container mt-4"><p>Loading...</p></div>;
    }

    const handleClick = (action, row) => {
        if (action === "view") {
            navigate(`/company-member/view/${row._id}`);
        }
        else if (action == 'email') {
            setShowPopup(true);
        }
    };


    const confirmStatusChange = async () => {
        setShowPopup(false);
        setMessage("The email has been sent successfully to the member.");
        setTimeout(() => {
            setMessage("");
        }, 1000);
    };


    if (!user) {
        return <div className="container mt-4"><p>User not found.</p></div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-3">{" " + user?.ParentMemberName}</h2>
            <div className="row g-3">
                <div className="col-md-6">
                    <p className="form-control-plaintext">
                        <label className="form-label fw-bold">Email:</label>
                        {user?.Email ? " " + user?.Email : " N/A"}</p>
                </div>
                <div className="col-md-6">
                    <p className="form-control-plaintext"><a href={user?.website} target="_blank" rel="noopener noreferrer">
                        <label className="form-label fw-bold">Website:</label>
                        {user?.website ? " " + user?.website : " N/A"}</a></p>
                </div>
                {message && <div className="col-md-12 mt-3 mb-3">
                    <div className="alert alert-primary" role="alert">
                        {message}
                    </div>
                </div>
                }
                <div className="col-md-12">
                    <DataTable
                        headings={[
                            { key: "Index", label: "ID" },
                            { key: "Name", label: "Name" },
                            { key: "address", label: "BillingAddress" },
                            { key: "Email", label: "Email" },
                            { key: "Active", label: "Active" },
                            { key: "Approved", label: "List in Directory" },
                            { key: "Phone", label: "Phone" },
                            { key: "JobTitle", label: "JobTitle" },
                            { key: "actions", label: "Actions" },
                        ]}
                        rows={rows}
                        actionIcons={CompanyFamilyTreeIcons}
                        isLoading={loading}
                        pagination={false}
                        bulkUploader={false}
                        bulkDelete={false}
                        handleClick={handleClick}
                        noDataMessage="No company records available"
                    />
                </div>
                {showPopup && (
                    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Send Email Confirmation</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Do you want to send the email?</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={confirmStatusChange}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
