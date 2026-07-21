import { useEffect, useState } from 'react';
import { loanService } from '../../services/loanService';
import DataTable from '../../components/common/DataTable';
import StatsOverview from '../../components/common/StatsOverview';
import LoanReviewModal from '../../components/common/LoanReviewModal';


const columns = ['ID', 'Applicant Name', 'Amount', 'Credit Score', 'Risk Grade', 'Status'];
const LmsDashboard = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [docName, setDocName] = useState('');
    const [docUrl, setDocUrl] = useState('');
    const [underwriterNotes, setUnderwriterNotes] = useState('');

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const response = await loanService.getAllLoans();
            console.log('res', response);
            setLoans(response.data);
        } catch (error) {
            console.error("Failed to fetch loans", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    const totalApplications = loans.length;
    const pendingCount = loans.filter(l => l.status === 'Pending' || l.status === 'Underwriting').length;
    const highRiskCount = loans.filter(l => l.riskGrade === 'High').length;
    const totalPortfolioAmount = loans
        .filter(l => l.status === 'Approved')
        .reduce((sum, l) => sum + (l.amount || l.principal || 0), 0);

    // Handle Document Upload
    const handleUploadDoc = async (id) => {
        if (!docName || !docUrl) return alert("Please enter both file name and URL");
        try {
            await loanService.uploadDocument(id, { fileName: docName, fileUrl: docUrl });
            alert("Document uploaded successfully!");
            setDocName('');
            setDocUrl('');
            fetchLoans();
            // Refresh modal data view dynamically
            const response = await loanService.getAllLoans();
            const current = response.data.find(l => l._id === id);
            if (current) setSelectedLoan(current);
        } catch (error) {
            alert("Failed to upload document");
        }
    };

    // Handle Underwriting Decision (Approve / Reject) via Modal
    const handleUnderwritingDecision = async (id, decision) => {
        try {
            if (decision === 'Approved') {
                await loanService.approveLoan(id);
            } else {
                await loanService.updateUnderwriting(id, { decision, notes: underwriterNotes });
            }
            alert(`Loan successfully ${decision.toLowerCase()}!`);
            setSelectedLoan(null);
            setUnderwriterNotes('');
            fetchLoans();
        } catch (error) {
            alert("Failed to update underwriting status");
        }
    };

    // Existing Approve Function untouched
    const handleApprove = async (id) => {
        try {
            const response = await loanService.approveLoan(id);
            alert(response.data.message || "Loan approved successfully!");
            fetchLoans();
        } catch (error) {
            console.error("Approval error:", error);
            alert("Failed to approve loan. Check console for details.");
        }
    };

    // Handler for updating escrow balance
    const handleUpdateEscrow = async (id, amount) => {
        if (!amount) return alert("Please enter an escrow amount");
        try {
            await loanService.updateEscrow(id, amount);
            alert("Escrow updated successfully!");
            const response = await loanService.getAllLoans();
            setLoans(response.data);
            const current = response.data.find(l => l._id === id);
            if (current) setSelectedLoan(current);
        } catch (error) {
            alert("Failed to update escrow");
        }
    };

    // Handler for updating collections/delinquency status
    const handleUpdateCollections = async (id, isDelinquent, delinquencyDays) => {
        try {
            await loanService.updateCollections(id, { isDelinquent, delinquencyDays });
            alert("Collections status updated successfully!");
            const response = await loanService.getAllLoans();
            setLoans(response.data);
            const current = response.data.find(l => l._id === id);
            if (current) setSelectedLoan(current);
        } catch (error) {
            alert("Failed to update collections status");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
            {/* Imported Overview Component */}
            <StatsOverview
                totalApplications={totalApplications}
                pendingCount={pendingCount}
                highRiskCount={highRiskCount}
                totalPortfolioAmount={totalPortfolioAmount}
            />
            <h2 className="text-2xl font-bold mb-6">Loan Management & Origination System</h2>
            {loading ? (
                <p>Loading applications...</p>
            ) : (
                <>
                    <DataTable
                        columns={columns}
                        data={loans}
                        renderRowActions={(row) => (
                            <div className="flex gap-2 items-center">
                                {row.status === 'Pending' || row.status === 'Underwriting' ? (
                                    <button
                                        onClick={() => handleApprove(row._id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition"
                                    >
                                        Approve & Generate Schedule
                                    </button>
                                ) : null
                                    // (
                                    //     <span className="text-gray-400 text-xs">{row.status}</span>
                                    // )
                                }
                                <button
                                    onClick={() => setSelectedLoan(row)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition"
                                >
                                    Review
                                </button>
                            </div>
                        )}
                    />
                </>
            )}
            {/* Imported Modal Component */}
            <LoanReviewModal
                loan={selectedLoan}
                onClose={() => setSelectedLoan(null)}
                onUploadDoc={handleUploadDoc}
                onUnderwritingDecision={handleUnderwritingDecision}
                onUpdateEscrow={handleUpdateEscrow} 
                onUpdateCollections={handleUpdateCollections}
                docName={docName}
                setDocName={setDocName}
                docUrl={docUrl}
                setDocUrl={setDocUrl}
            />
        </div>
    );
};

export default LmsDashboard;