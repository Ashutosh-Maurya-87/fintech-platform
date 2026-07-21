// import React, { useState } from 'react';

// const BorrowerApplicationWizard = ({ onSubmitApplication }) => {
//     const [currentStep, setCurrentStep] = useState(1);
    
//     const [formData, setFormData] = useState({
//         applicantName: '',
//         email: '',
//         phone: '',
//         amount: '',
//         tenureMonths: '12',
//         interestRate: '12',
//         employmentType: 'Salaried',
//         monthlyIncome: '',
//         panOrIdNumber: '',
//         status: 'Pending'
//     });

//     const steps = [
//         { id: 1, title: 'Personal Info' },
//         { id: 2, title: 'Loan Details' },
//         { id: 3, title: 'Review & Submit' }
//     ];

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleNext = (e) => {
//         // Prevent any default form behavior that could cause premature submission
//         e.preventDefault();

//         if (currentStep === 1 && (!formData.applicantName || !formData.email || !formData.phone)) {
//             return alert("Please fill out all personal details.");
//         }
//         if (currentStep === 2 && (!formData.amount || !formData.tenureMonths)) {
//             return alert("Please enter the loan amount and tenure.");
//         }
        
//         // Move to the next step safely
//         setCurrentStep((prev) => Math.min(prev + 1, steps.length));
//     };

//     const handlePrev = (e) => {
//         e.preventDefault();
//         setCurrentStep((prev) => Math.max(prev - 1, 1));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         // Strict guard: Only execute submission if we are explicitly on the last step
//         if (currentStep !== steps.length) {
//             return;
//         }

//         onSubmitApplication(formData);
//     };

//     return (
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//                 {currentStep === 3 ? "Review Application" : `Step ${currentStep}: Loan Application`}
//             </h2>

//             {/* --- BREADCRUMB / STEP INDICATOR TRACKER --- */}
//             <div className="flex items-center justify-between relative mb-8">
//                 {steps.map((step) => {
//                     const isCompleted = currentStep > step.id;
//                     const isCurrent = currentStep === step.id;

//                     return (
//                         <div key={step.id} className="flex items-center flex-col relative z-10 flex-1">
//                             <div 
//                                 className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
//                                     isCompleted 
//                                         ? 'bg-green-600 text-white' 
//                                         : isCurrent 
//                                         ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
//                                         : 'bg-gray-200 text-gray-500'
//                                 }`}
//                             >
//                                 {isCompleted ? '✓' : step.id}
//                             </div>
//                             <span className={`text-xs mt-2 font-medium ${isCurrent ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
//                                 {step.title}
//                             </span>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* --- FORM CONTAINER --- */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {currentStep === 1 && (
//                     <div className="space-y-3">
//                         <h3 className="font-semibold text-gray-700 text-base border-b pb-2">Borrower Information</h3>
//                         <div>
//                             <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Applicant Name</label>
//                             <input
//                                 type="text"
//                                 name="applicantName"
//                                 placeholder="e.g. John Doe"
//                                 value={formData.applicantName}
//                                 onChange={handleChange}
//                                 className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email Address</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="e.g. john@example.com"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Phone Number</label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 placeholder="e.g. +1 555-0199"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {currentStep === 2 && (
//                     <div className="space-y-3">
//                         <h3 className="font-semibold text-gray-700 text-base border-b pb-2">Loan Requirements</h3>
//                         <div>
//                             <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Requested Amount ($)</label>
//                             <input
//                                 type="number"
//                                 name="amount"
//                                 placeholder="e.g. 250000"
//                                 value={formData.amount}
//                                 onChange={handleChange}
//                                 className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Tenure (Months)</label>
//                             <select
//                                 name="tenureMonths"
//                                 value={formData.tenureMonths}
//                                 onChange={handleChange}
//                                 className="w-full border p-2.5 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//                             >
//                                 <option value="6">6 Months</option>
//                                 <option value="12">12 Months</option>
//                                 <option value="24">24 Months</option>
//                                 <option value="36">36 Months</option>
//                             </select>
//                         </div>
//                     </div>
//                 )}

//                 {currentStep === 3 && (
//                     <div className="space-y-4">
//                         <h3 className="font-semibold text-gray-700 text-base border-b pb-2">Review & Confirm</h3>
//                         <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm border">
//                             <p><strong>Applicant Name:</strong> {formData.applicantName}</p>
//                             <p><strong>Email:</strong> {formData.email}</p>
//                             <p><strong>Phone:</strong> {formData.phone}</p>
//                             <p><strong>Requested Amount:</strong> ${formData.amount}</p>
//                             <p><strong>Tenure:</strong> {formData.tenureMonths} Months</p>
//                             <p><strong>Initial Status:</strong> <span className="text-blue-600 font-semibold">{formData.status}</span></p>
//                         </div>
//                     </div>
//                 )}

//                 {/* --- NAVIGATION BUTTONS --- */}
//                 <div className="flex justify-between pt-6 border-t mt-6">
//                     {currentStep > 1 ? (
//                         <button
//                             type="button"
//                             onClick={handlePrev}
//                             className="px-5 py-2.5 rounded-lg text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
//                         >
//                             Back
//                         </button>
//                     ) : <div />}

//                     {currentStep < steps.length ? (
//                         <button
//                             type="button"
//                             onClick={handleNext}
//                             className="px-5 py-2.5 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
//                         >
//                             Next Step
//                         </button>
//                     ) : (
//                         <button
//                             type="submit"
//                             className="px-5 py-2.5 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 font-semibold transition"
//                         >
//                             Confirm & Submit
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default BorrowerApplicationWizard;

import React, { useState } from 'react';

const BorrowerApplicationWizard = ({ onSubmitApplication }) => {
    const [currentStep, setCurrentStep] = useState(1);
    
    const [formData, setFormData] = useState({
        applicantName: '',
        email: '',
        phone: '',
        amount: '',
        tenureMonths: '12',
        interestRate: '12',
        employmentType: 'Salaried',
        monthlyIncome: '',
        panOrIdNumber: '',
        status: 'Pending'
    });

    const steps = [
        { id: 1, title: 'Personal Info' },
        { id: 2, title: 'Loan Details' },
        { id: 3, title: 'Review & Submit' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        // Prevent any default form behavior that could cause premature submission
        e.preventDefault();

        if (currentStep === 1 && (!formData.applicantName || !formData.email || !formData.phone)) {
            return alert("Please fill out all personal details.");
        }
        if (currentStep === 2 && (!formData.amount || !formData.tenureMonths)) {
            return alert("Please enter the loan amount and tenure.");
        }
        
        // Move to the next step safely
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    };

    const handlePrev = (e) => {
        e.preventDefault();
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Strict guard: Only execute submission if we are explicitly on the last step
        if (currentStep !== steps.length) {
            return;
        }

        onSubmitApplication(formData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
                {currentStep === 3 ? "Review Application" : `Step ${currentStep}: Loan Application`}
            </h2>

            {/* --- BREADCRUMB / STEP INDICATOR TRACKER --- */}
            <div className="flex items-center justify-between relative mb-8 px-6">
                {/* Connecting background track line */}
                <div className="absolute left-12 right-12 top-5 h-0.5 bg-gray-200 z-0"></div>

                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;

                    return (
                        <div key={step.id} className="flex items-center flex-col relative z-10">
                            <div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                                    isCompleted 
                                        ? 'bg-green-600 text-white' 
                                        : isCurrent 
                                        ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                                        : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                                {isCompleted ? '✓' : step.id}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${isCurrent ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* --- FORM CONTAINER --- */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {currentStep === 1 && (
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-700 text-base border-b pb-2">Borrower Information</h3>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Applicant Name</label>
                            <input
                                type="text"
                                name="applicantName"
                                placeholder="e.g. John Doe"
                                value={formData.applicantName}
                                onChange={handleChange}
                                className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="e.g. john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="e.g. +1 555-0199"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-700 text-base border-b pb-2">Loan Requirements</h3>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Requested Amount ($)</label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="e.g. 250000"
                                value={formData.amount}
                                onChange={handleChange}
                                className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Tenure (Months)</label>
                            <select
                                name="tenureMonths"
                                value={formData.tenureMonths}
                                onChange={handleChange}
                                className="w-full border p-2.5 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="6">6 Months</option>
                                <option value="12">12 Months</option>
                                <option value="24">24 Months</option>
                                <option value="36">36 Months</option>
                            </select>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-700 text-base border-b pb-2">Review & Confirm</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm border">
                            <p><strong>Applicant Name:</strong> {formData.applicantName}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Phone:</strong> {formData.phone}</p>
                            <p><strong>Requested Amount:</strong> ${formData.amount}</p>
                            <p><strong>Tenure:</strong> {formData.tenureMonths} Months</p>
                            <p><strong>Initial Status:</strong> <span className="text-blue-600 font-semibold">{formData.status}</span></p>
                        </div>
                    </div>
                )}

                {/* --- NAVIGATION BUTTONS --- */}
                <div className="flex justify-between pt-6 border-t mt-6">
                    {currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="px-5 py-2.5 rounded-lg text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                        >
                            Back
                        </button>
                    ) : <div />}

                    {currentStep < steps.length ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-5 py-2.5 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 font-semibold transition"
                        >
                            Confirm & Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BorrowerApplicationWizard;