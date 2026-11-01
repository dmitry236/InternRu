import apiClient from './client';

export const signUp = (userData) => apiClient.post('/auth/sign-up/', userData);
export const login = (credentials) => apiClient.post('/auth/token/', credentials);
export const refreshToken = (refresh) => apiClient.post('/auth/roken/refresh/', { refresh });

export const getInternshipList = () => apiClient.get('/dashboard/job-list/');
export const getInternshipDetail = (slug) => apiClient.get(`/dashboard/job-post-detail/${slug}/`);
export const createInternship = (data) => apiClient.post('/dashboard/post-job/', data);
export const updateInternship = (slug, data) => apiClient.put(`/dashboard/job-post-detail/${slug}/`, data);
export const deleteInternship = (slug) => apiClient.delete(`/dashboard/job-post-detail/${slug}/`);

export const applyToInternship = (slug) => apiClient.post(`/dashboard/apply-job/${slug}/`);
export const getMyApplications = () => apiClient.get('/dashboard/job-application-list/');
export const getApplicationDetail = (id) => apiClient.get(`/dashboard/job-application-detail/${id}/`);
export const updateApplication = (id, data) => apiClient.patch(`/dashboard/job-application-detail/${id}/`, data);
export const deleteApplication = (id) => apiClient.delete(`/dashboard/job-application-detail/${id}/`);