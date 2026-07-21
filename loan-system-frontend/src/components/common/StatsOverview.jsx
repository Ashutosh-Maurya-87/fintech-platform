import React from 'react';

const StatsOverview = ({ totalApplications, pendingCount, highRiskCount, totalPortfolioAmount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg shadow-sm">
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Total Applications</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">{totalApplications}</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg shadow-sm">
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">Pending / Review</p>
                <p className="text-2xl font-bold text-amber-900 mt-1">{pendingCount}</p>
            </div>
            <div className="bg-red-50 border border-red-100 p-4 rounded-lg shadow-sm">
                <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">High Risk Flags</p>
                <p className="text-2xl font-bold text-red-900 mt-1">{highRiskCount}</p>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-lg shadow-sm">
                <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">Approved Portfolio ($)</p>
                <p className="text-2xl font-bold text-green-900 mt-1">${totalPortfolioAmount.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default StatsOverview;