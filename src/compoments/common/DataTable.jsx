import { useEffect, useState } from 'react';
import { ACTION_BUTTONS } from "./buttons.jsx";
import LoaderSm from './loader/loader-sm.jsx';

export default function DataTable({
    headings,
    rows,
    actionIcons,
    handleClick,
    isLoading,
    pagination,
    handleSort,
    sortConfig,
    bulkUploader,
    handleFileChange,
    isUploading,
    bulkDelete,
    onSelectAll,
    onSelectRow,
    selectedRows
}) {
    const [currentPage, setCurrentPage] = useState(pagination?.page || 1);

    useEffect(() => {
        setCurrentPage(pagination.page);
    }, [pagination]);

    const renderTableHeadings = () => {
        return headings && headings.map((d, index) => (
            <th
                scope="col"
                key={index}
                className='hover'
                onClick={() => handleSort(d.key == 'actions' ? "" : d.key)}
            >
                {d.label} <span className='mx-1'></span>
                {sortConfig && sortConfig.sortBy === d.key
                    ? sortConfig.orderBy === 'asc'
                        ? ' ▲'
                        : sortConfig.orderBy === 'desc'
                            ? ' ▼'
                            : ' ↕'
                    : ''
                }

            </th>
        ));
    };

    const renderTableRows = () => {
        return rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {bulkDelete && (
                    <td>
                        <input
                            type="checkbox"
                            onChange={() => onSelectRow(row._id)}
                            checked={selectedRows.includes(row._id)}
                        />
                    </td>
                )}
                {Object.entries(row)
                    .filter(([key]) => key !== '_id')
                    .map(([key, value], cellIndex) => (
                        <td key={`${rowIndex}-${key}`} className="text-break">
                            {/* {key === "Approved"
                                ? value === true
                                    ? "Yes"
                                    : "No"
                                : value === true
                                ? "Active"
                                : value === false
                                ? "Inactive"
                                : value} */}
                            {`${value}`}
                        </td>
                    ))}
                {actionIcons && (
                    <td key={`${rowIndex}-actions`} className="text-break">
                        <ACTION_BUTTONS Icons={actionIcons} row={row} handleClick={handleClick} />
                    </td>
                )}
            </tr>
        ));
    };

    const handlePageChange = (page) => {
        if (page) {
            setCurrentPage(page);
            pagination.onPageChange(page);
        }
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-hover table-responsiveness">
                    <thead>
                        <tr>
                            {bulkDelete && <th>
                                <input
                                    type="checkbox"
                                    onChange={onSelectAll}
                                    checked={selectedRows.length === rows.length}
                                />
                            </th>
                            }
                            {renderTableHeadings()}
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading ? renderTableRows() : (
                            <tr>
                                <td colSpan={headings.length + 1} className="text-center">
                                    <LoaderSm />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <nav>
                    <ul className="pagination d-flex flex-wrap justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                Previous
                            </button>
                        </li>

                        {/* Show first page */}
                        {currentPage > 3 && (
                            <>
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
                                </li>
                                {currentPage > 4 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                            </>
                        )}

                        {[...Array(pagination.totalPages)].slice(
                            Math.max(0, currentPage - 3), Math.min(pagination.totalPages, currentPage + 2)
                        ).map((_, index) => {
                            const pageNum = index + Math.max(0, currentPage - 3) + 1;
                            return (
                                <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                                        {pageNum}
                                    </button>
                                </li>
                            );
                        })}

                        {currentPage < pagination.totalPages - 2 && (
                            <>
                                {currentPage < pagination.totalPages - 3 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(pagination.totalPages)}>
                                        {pagination.totalPages}
                                    </button>
                                </li>
                            </>
                        )}

                        <li className={`page-item ${currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>

            )}
        </>
    );
}