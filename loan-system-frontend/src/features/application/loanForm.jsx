import { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputFields';
import { loanService } from '../../services/loanService';
import BorrowerApplicationWizard from '../../components/common/BorrowerApplicationWizard';

const loanSchema = z.object({
    applicantName: z.string().min(3, "Name must be at least 3 characters"),
    amount: z.string().refine((val) => Number(val) > 0, "Amount must be greater than 0"),
});

const LoanForm = () => {
    const navigate = useNavigate();
    const handleFormSubmit = async (formData) => {
        try {
            // Payload including initial status
            const payload = {
                applicantName: formData.applicantName,
                amount: formData.amount,
                status: 'Pending'
            };

            await loanService.submitApplication(payload);
            alert("Form Submitted successfully!");
            navigate('/lms');
        } catch (error) {
            console.error("Submission error:", error);
            alert("Error submitting to backend");
        }
    };
    return (
        <div className="bg-white p-2 rounded-lg shadow-lg border max-w-lg mx-auto">
            <BorrowerApplicationWizard
                onSubmitApplication={handleFormSubmit}
            />
        </div>
    );
};

export default LoanForm;