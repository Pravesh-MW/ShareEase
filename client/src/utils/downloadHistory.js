const DOWNLOAD_HISTORY_KEY = 'shareease_download_history';
const MAX_HISTORY_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const addToDownloadHistory = (fileData) => {
    const history = getDownloadHistory();
    const newEntry = {
        ...fileData,
        timestamp: Date.now()
    };
    
    // Add new entry to the beginning of the array
    history.unshift(newEntry);
    
    // Save to localStorage
    localStorage.setItem(DOWNLOAD_HISTORY_KEY, JSON.stringify(history));
};

export const getDownloadHistory = () => {
    try {
        const history = JSON.parse(localStorage.getItem(DOWNLOAD_HISTORY_KEY) || '[]');
        
        // Filter out entries older than 24 hours
        const currentTime = Date.now();
        const recentHistory = history.filter(entry => 
            currentTime - entry.timestamp < MAX_HISTORY_AGE
        );
        
        // If some entries were removed, update localStorage
        if (recentHistory.length !== history.length) {
            localStorage.setItem(DOWNLOAD_HISTORY_KEY, JSON.stringify(recentHistory));
        }
        
        return recentHistory;
    } catch (error) {
        console.error('Error reading download history:', error);
        return [];
    }
};

export const clearDownloadHistory = () => {
    localStorage.removeItem(DOWNLOAD_HISTORY_KEY);
}; 