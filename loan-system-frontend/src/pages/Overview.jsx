import React, { useEffect, useState } from 'react';
import { loanService } from '../services/loanService';

const Overview = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoanMetrics = async () => {
            try {
                const response = await loanService.getAllLoans();
                setLoans(response.data || []);
            } catch (error) {
                console.error("Failed to load dashboard metrics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLoanMetrics();
    }, []);

    // Calculate core summary metrics
    const totalApplications = loans.length;
    const pendingCount = loans.filter(l => l.status === 'Pending' || l.status === 'Underwriting').length;
    const approvedCount = loans.filter(l => l.status === 'Approved').length;
    const totalPortfolioAmount = loans
        .filter(l => l.status === 'Approved')
        .reduce((sum, l) => sum + (Number(l.amount) || Number(l.principal) || 0), 0);

    if (loading) {
        return <div className="text-gray-500 text-center py-10">Loading portfolio metrics...</div>;
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Portfolio Summary Overview</h3>

            {/* --- METRICS SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs font-semibold uppercase text-gray-400">Total Applications</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{totalApplications}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs font-semibold uppercase text-yellow-600">Pending Review</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{pendingCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs font-semibold uppercase text-green-600">Approved Loans</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{approvedCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs font-semibold uppercase text-blue-600">Active Portfolio Amount</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">${totalPortfolioAmount.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Overview;