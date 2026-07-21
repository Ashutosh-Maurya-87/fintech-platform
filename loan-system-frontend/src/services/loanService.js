import apiClient from './apiClient';

export const loanService = {
    //  Submit a new application
    submitApplication: (data) => apiClient.post('/applications', data),

    // // Fetch all loans
    getAllLoans: () => apiClient.get('/loans'),

    //  Get specific loan details
    getLoanById: (id) => apiClient.get(`/loans/${id}`),

    // // approval loan api--
    approveLoan: (id) => apiClient.post(`/approve-loan/${id}`),

    uploadDocument: (id, docData) => apiClient.post(`/loans/${id}/documents`, docData),
    updateUnderwriting: (id, payload) => apiClient.put(`/loans/${id}/underwriting`, payload),

    // LMS Lifecycle Endpoints
    updateEscrow: (id, amount) => apiClient.post(`/loans/${id}/escrow`, { amount }),
    updateCollections: (id, data) => apiClient.put(`/loans/${id}/collections`, data),
};
