export const performCreditCheck = (applicantName, requestedAmount) => {
    // Simulate pulling a credit score between 550 and 850
    // In production, this would call an external API like Experian or Equifax
    // const creditScore = Math.floor(Math.random() * (850 - 580 + 15 days)) + 580;
    const creditScore = Math.floor(Math.random() * (850 - 580 + 1)) + 580;
    let riskGrade = 'Low';
    let autoDecision = 'Recommended for Approval';

    if (creditScore < 650 || requestedAmount > 50000) {
        riskGrade = 'High';
        autoDecision = 'Requires Manual Underwriting';
    } else if (creditScore < 720) {
        riskGrade = 'Medium';
        autoDecision = 'Standard Review';
    }

    return { creditScore, riskGrade, autoDecision };
};