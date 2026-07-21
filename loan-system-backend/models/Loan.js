const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    applicantName: { type: String, required: true },
    amount: { type: Number, required: true },
    principal: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // Pending, Underwriting, Approved, Rejected, Delinquent
    emi: Number,
    repaymentSchedule: Array,
    dueDate: Date,
    isDelinquent: { type: Boolean, default: false },

    // --- LOS FIELDS ---
    creditScore: { type: Number, default: null },
    riskGrade: { type: String, default: 'Unchecked' },
    documents: [{ fileName: String, fileUrl: String, uploadedAt: { type: Date, default: Date.now } }],
    underwriterNotes: { type: String, default: '' },

    // --- LMS LIFECYCLE FIELDS ---
    interestRate: { type: Number, default: 12 }, // Annual interest rate percentage (e.g., 12%)
    tenureMonths: { type: Number, default: 12 }, // Loan tenure in months
    escrowBalance: { type: Number, default: 0 },   // Escrow account tracking for taxes/insurance
    totalPaid: { type: Number, default: 0 },
    remainingBalance: { type: Number, default: 0 },
    delinquencyDays: { type: Number, default: 0 }  // Tracking overdue collection days
});

module.exports = mongoose.model('Loan', LoanSchema);