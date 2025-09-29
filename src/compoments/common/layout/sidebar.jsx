import React, { useState } from "react";
import { Link } from "react-router-dom";
// import CloseIcon from '../../../assets/images/close.svg'
// import LogoIcon from '../../../assets/images/logo.svg'

const SideBar = ({ sidebarItems }) => {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };


    const renderSidebarItems = (items, parentIndex = null) => {
        return items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded =
                expandedItems[parentIndex !== null ? `${parentIndex}-${index}` : index];

            return (
                <li className="nav-item mt-2" key={index}>
                    <div>
                        <div onClick={() => hasChildren && toggleExpand(index)} style={{ cursor: hasChildren ? "pointer" : "default" }}>
                            <Link to={item.path} className="nav-link link-body-emphasis">
                                {item.label}
                            </Link>
                        </div>
                    </div>
                    {hasChildren && isExpanded && (
                        <ul className="nav flex-column ms-3">
                            {renderSidebarItems(
                                item.children,
                                parentIndex !== null ? `${parentIndex}-${index}` : index
                            )}
                        </ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-white vh-100">
            <div className="d-flex justify-content-between">
                <Link to="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                    <span className="fs-4">
                        Socialpie
                        {/* <img src={LogoIcon} alt="SocialPie Logo" /> */}
                    </span>
                </Link>
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {renderSidebarItems(sidebarItems)}
            </ul>
        </div>
    );
};

export default SideBar;
