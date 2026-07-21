const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const Loan = require('./models/Loan');
const { calculateRepayment } = require('./utils/loanCalculator');
const { performCreditCheck } = require('./utils/creditBureau');
const { calculateRepaymentSchedule } = require('./utils/financialCalculator');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

// ==========================================
// MONGODB CONNECTION & SERVER STARTUP
// ==========================================
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully');

        // Optional: Monitor runtime connection events
        mongoose.connection.on('disconnected', () => {
            console.warn('Warning: Mongoose lost connection to MongoDB.');
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Mongoose runtime error: ${err}`);
        });

        // Start the Express server ONLY after database connection is verified
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running and listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB database:', err.message);
        // Terminate the Node process with a failure code to prevent running in a broken state
        process.exit(1);
    });

// 1. Route to submit application WITH automated Credit Check & Underwriting assessment
app.post('/api/applications', async (req, res) => {
    try {
        const { applicantName, amount } = req.body;
        const principalVal = Number(amount);

        // 1. Generate sequential numeric ID (e.g., 10001, 10002...)
        const lastLoan = await Loan.findOne().sort({ id: -1 });
        const nextId = lastLoan && lastLoan.id ? lastLoan.id + 1 : 10001;

        // Perform automated credit check on origination
        const creditData = performCreditCheck(applicantName, principalVal);

        const newLoan = new Loan({
            id: nextId,
            applicantName,
            amount: principalVal,
            principal: principalVal,
            status: creditData.riskGrade === 'High' ? 'Underwriting' : 'Pending',
            creditScore: creditData.creditScore,
            riskGrade: creditData.riskGrade,
            underwriterNotes: `Auto-assessment: ${creditData.autoDecision}`
        });

        await newLoan.save();
        res.status(201).json({ message: "Loan application originated successfully", loan: newLoan });
    } catch (error) {
        console.error("Origination error:", error);
        res.status(500).json({ error: "Failed to process loan application" });
    }
});

app.get('/api/loans', async (req, res) => {
    const loans = await Loan.find();
    res.json(loans);
});

// 2. Route to Upload/Manage Documentation for a Loan
app.post('/api/loans/:id/documents', async (req, res) => {
    try {
        const { id } = req.params;
        const { fileName, fileUrl } = req.body; // Mock file metadata payload

        const loan = await Loan.findById(id);
        if (!loan) return res.status(404).json({ error: "Loan not found" });

        loan.documents.push({ fileName, fileUrl });
        await loan.save();

        res.json({ message: "Document uploaded successfully", documents: loan.documents });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload document" });
    }
});

// 3. Facilitate Underwriting Workflow (Assign Notes / Manual Override)
app.put('/api/loans/:id/underwriting', async (req, res) => {
    try {
        const { id } = req.params;
        const { decision, notes } = req.body; // decision: 'Approved' or 'Rejected'

        const loan = await Loan.findById(id);
        if (!loan) return res.status(404).json({ error: "Loan not found" });

        loan.status = decision; // 'Approved' or 'Rejected'
        if (notes) loan.underwriterNotes = notes;

        await loan.save();
        res.json({ message: `Loan successfully transitioned to ${decision}`, loan });
    } catch (error) {
        res.status(500).json({ error: "Underwriting update failed" });
    }
});

// Route to Approve Loan and Generate Lifecycle Data
// 1. Enhanced Approval Route (Triggers Interest Calculation & Repayment Schedule)
app.post('/api/approve-loan/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findById(id);
        if (!loan) return res.status(404).json({ error: "Loan not found" });

        const principal = loan.amount || loan.principal;
        const interestRate = loan.interestRate || 12; // default 12%
        const tenureMonths = loan.tenureMonths || 12; // default 12 months

        // Generate complex financial schedule
        const financialData = calculateRepaymentSchedule(principal, interestRate, tenureMonths);

        loan.status = 'Approved';
        loan.emi = financialData.emi;
        loan.repaymentSchedule = financialData.repaymentSchedule;
        loan.remainingBalance = principal;
        loan.dueDate = financialData.repaymentSchedule[0]?.dueDate;

        await loan.save();
        res.json({ message: "Loan approved and financial schedule generated successfully", loan });
    } catch (error) {
        console.error("Approval error:", error);
        res.status(500).json({ error: "Failed to generate schedule" });
    }
});

// 2. Escrow Management Route (Add or deduct funds for taxes/insurance)
app.post('/api/loans/:id/escrow', async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body; // positive to deposit, negative to pay out

        const loan = await Loan.findById(id);
        if (!loan) return res.status(404).json({ error: "Loan not found" });

        loan.escrowBalance += Number(amount);
        await loan.save();

        res.json({ message: "Escrow account updated successfully", escrowBalance: loan.escrowBalance });
    } catch (error) {
        res.status(500).json({ error: "Failed to update escrow" });
    }
});

// 3. Delinquency & Collections Workflow Route
app.put('/api/loans/:id/collections', async (req, res) => {
    try {
        const { id } = req.params;
        const { isDelinquent, delinquencyDays } = req.body;

        const loan = await Loan.findById(id);
        if (!loan) return res.status(404).json({ error: "Loan not found" });

        loan.isDelinquent = isDelinquent;
        loan.delinquencyDays = delinquencyDays || 0;
        if (isDelinquent) {
            loan.status = 'Delinquent';
        }

        await loan.save();
        res.json({ message: "Collections status updated", loan });
    } catch (error) {
        res.status(500).json({ error: "Failed to update collections status" });
    }
});
app.listen(5000, () => console.log('Server running on port 5000'));