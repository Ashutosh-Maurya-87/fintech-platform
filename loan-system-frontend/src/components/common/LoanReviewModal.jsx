import React, { useState } from 'react';

const LoanReviewModal = ({ loan, onClose, onUploadDoc, onUnderwritingDecision, onUpdateEscrow, onUpdateCollections, docName, setDocName, docUrl, setDocUrl }) => {
    const [notes, setNotes] = useState('');
    const [escrowInput, setEscrowInput] = useState('');
    const [delinquentDaysInput, setDelinquentDaysInput] = useState('');

    if (!loan) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
                <h3 className="text-xl font-bold">LMS Lifecycle Management: {loan.applicantName}</h3>

                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded text-sm">
                    <p><strong>Loan ID:</strong> {loan.id || 'N/A'}</p>
                    <p><strong>Status:</strong> <span className="text-blue-600 font-semibold">{loan.status}</span></p>
                    <p><strong>Principal:</strong> ${loan.amount || loan.principal}</p>
                    <p><strong>Monthly EMI:</strong> ${loan.emi || 'Not calculated'}</p>
                    <p><strong>Escrow Balance:</strong> <span className="text-green-600 font-semibold">${loan.escrowBalance || 0}</span></p>
                    <p><strong>Collections Status:</strong> <span className={loan.isDelinquent ? 'text-red-600 font-bold' : 'text-green-600'}>{loan.isDelinquent ? `Delinquent (${loan.delinquencyDays} days)` : 'Good Standing'}</span></p>
                </div>

                {/* Document Management Section */}
                <div className="border-t pt-3">
                    <h4 className="font-semibold text-sm mb-2">Manage Supporting Documents</h4>
                    <ul className="mb-3 text-xs list-disc pl-4 text-gray-600">
                        {loan.documents?.map((doc, idx) => (
                            <li key={idx}><a href={doc.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">{doc.fileName}</a></li>
                        ))}
                        {(!loan.documents || loan.documents.length === 0) && <li>No documents uploaded yet.</li>}
                    </ul>

                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Document Name (e.g., Bank Statement)"
                            value={docName}
                            onChange={(e) => setDocName(e.target.value)}
                            className="w-full border p-2 text-sm rounded"
                        />
                        <input
                            type="text"
                            placeholder="Enter document reference URL (e.g., Google Drive link)"
                            value={docUrl}
                            onChange={(e) => setDocUrl(e.target.value)}
                            className="w-full border p-2 text-sm rounded"
                        />
                        <button
                            onClick={() => {
                                onUploadDoc(loan._id, { fileName: docName, fileUrl: docUrl });
                                setDocName('');
                                setDocUrl('');
                            }}
                            className="w-full bg-gray-800 text-white p-2 rounded text-sm hover:bg-gray-900"
                        >
                            Upload Document
                        </button>
                    </div>
                </div>

                {/* Underwriting Workflow & Approval Actions */}
                <div className="border-t pt-3">
                    <h4 className="font-semibold text-sm mb-2">Underwriter Decision Workflow</h4>
                    <textarea
                        placeholder="Add underwriter review notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border p-2 text-sm rounded mb-3"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => onUnderwritingDecision(loan._id, 'Approved', notes)}
                            className="flex-1 bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700"
                        >
                            Approve & Generate Schedule
                        </button>
                        <button
                            onClick={() => onUnderwritingDecision(loan._id, 'Rejected', notes)}
                            className="flex-1 bg-red-600 text-white py-2 rounded text-sm hover:bg-red-700"
                        >
                            Reject Application
                        </button>
                    </div>
                </div>

                {/* Escrow Management Section */}
                <div className="border-t pt-3">
                    <h4 className="font-semibold text-sm mb-2">Escrow Management (Taxes & Insurance)</h4>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Amount (+ deposit, - payout)"
                            value={escrowInput}
                            onChange={(e) => setEscrowInput(e.target.value)}
                            className="flex-1 border p-2 text-sm rounded"
                        />
                        <button
                            onClick={() => {
                                onUpdateEscrow(loan._id, escrowInput);
                                setEscrowInput('');
                            }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
                        >
                            Update Escrow
                        </button>
                    </div>
                </div>

                {/* Collections & Delinquency Handling */}
                <div className="border-t pt-3">
                    <h4 className="font-semibold text-sm mb-2">Collections & Delinquency Handling</h4>
                    <div className="flex gap-2 items-center">
                        <input
                            type="number"
                            placeholder="Overdue Days"
                            value={delinquentDaysInput}
                            onChange={(e) => setDelinquentDaysInput(e.target.value)}
                            className="w-36 border p-2 text-sm rounded"
                        />
                        <button
                            onClick={() => onUpdateCollections(loan._id, true, Number(delinquentDaysInput))}
                            className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                        >
                            Flag Delinquent
                        </button>
                        <button
                            onClick={() => onUpdateCollections(loan._id, false, 0)}
                            className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                        >
                            Clear Delinquency
                        </button>
                    </div>
                </div>

                {/* Repayment Schedule Amortization Preview */}
                <div className="border-t pt-3">
                    <h4 className="font-semibold text-sm mb-2">Amortization Repayment Schedule</h4>
                    <div className="max-h-40 overflow-y-auto border rounded text-xs">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="p-2">#</th>
                                    <th className="p-2">Due Date</th>
                                    <th className="p-2">EMI</th>
                                    <th className="p-2">Principal</th>
                                    <th className="p-2">Interest</th>
                                    <th className="p-2">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loan.repaymentSchedule?.map((row, idx) => (
                                    <tr key={idx} className="border-b">
                                        <td className="p-2">{row.installmentNumber}</td>
                                        <td className="p-2">{row.dueDate}</td>
                                        <td className="p-2">${row.emiAmount}</td>
                                        <td className="p-2">${row.principalComponent}</td>
                                        <td className="p-2">${row.interestComponent}</td>
                                        <td className="p-2">${row.remainingBalance}</td>
                                    </tr>
                                ))}
                                {(!loan.repaymentSchedule || loan.repaymentSchedule.length === 0) && (
                                    <tr>
                                        <td colSpan="6" className="p-4 text-center text-gray-500">No repayment schedule generated yet. Approve the loan to generate.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded text-sm hover:bg-gray-300"
                >
                    Close Window
                </button>
            </div>
        </div>
    );
};

export default LoanReviewModal;