/**
 * Application Configuration
 * 
 * Centralized configuration for the frontend application.
 * Environment variables are loaded from .env file.
 */

export const config = {
    // API Configuration
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://groovefest.test',

    // API Endpoints
    api: {
        tickets: '/api/tickets',
        admin: {
            login: '/api/admin/login',
            dashboard: '/api/admin/dashboard/stats',
            tickets: '/api/admin/tickets',
            ticketsExport: '/api/admin/tickets/export',
            ticketsScan: '/api/admin/tickets/scan',
            ticketsVerify: '/api/admin/tickets/verify-code',
        }
    }
};

/**
 * Helper function to build full API URL
 * @param {string} endpoint - The API endpoint path
 * @returns {string} Full API URL
 */
export const getApiUrl = (endpoint) => {
    return `${config.apiBaseUrl}${endpoint}`;
};

export default config;
