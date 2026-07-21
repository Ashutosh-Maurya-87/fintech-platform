
export const calculateRepayment = (principal, annualRate = 12, tenureMonths = 12, startDate = new Date()) => {
  const r = (annualRate / 100) / 12; // Monthly interest rate
  const n = Number(tenureMonths);
  const p = Number(principal);

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  let schedule = [];
  let remainingPrincipal = p;

  // Base date for calculating sequential due dates
  let currentDueDate = new Date(startDate);

  for (let i = 1; i <= n; i++) {
    const interest = remainingPrincipal * r;
    const principalComponent = emi - interest;
    remainingPrincipal -= principalComponent;

    // Increment month for due date
    currentDueDate.setMonth(currentDueDate.getMonth() + 1);
    const dueDateStr = currentDueDate.toISOString().split('T')[0];

    schedule.push({
      installmentNumber: i,
      dueDate: dueDateStr,
      emiAmount: emi.toFixed(2),
      principalComponent: principalComponent.toFixed(2),
      interestComponent: interest.toFixed(2),
      remainingBalance: Math.max(0, remainingPrincipal).toFixed(2)
    });
  }

  return {
    emi: emi.toFixed(2),
    repaymentSchedule: schedule
  };
};