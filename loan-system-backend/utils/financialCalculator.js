
// Calculate EMI and Amortization Repayment Schedule
export const calculateRepaymentSchedule = (principal, annualInterestRate, tenureMonths) => {
    const monthlyRate = annualInterestRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    let balance = principal;
    const schedule = [];
    const currentDate = new Date();

    for (let i = 1; i <= tenureMonths; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = emi - interestPayment;
        balance -= principalPayment;

        const dueDate = new Date(currentDate);
        dueDate.setMonth(dueDate.getMonth() + i);

        schedule.push({
            installmentNumber: i,
            dueDate: dueDate.toISOString().split('T')[0],
            emiAmount: Math.round(emi * 100) / 100,
            principalComponent: Math.round(principalPayment * 100) / 100,
            interestComponent: Math.round(interestPayment * 100) / 100,
            remainingBalance: Math.max(0, Math.round(balance * 100) / 100),
            status: 'Pending' // Pending, Paid
        });
    }

    return {
        emi: Math.round(emi * 100) / 100,
        repaymentSchedule: schedule,
        totalRemainingBalance: principal
    };
};