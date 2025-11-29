/**
 * LocalStorage Utility
 * Handles saving and loading progress data
 */

const STORAGE_KEY = 'musicMasterFlashcards';

/**
 * Default progress data structure
 */
const defaultProgress = {
    scales: {
        completed: [],
        currentIndex: 0,
        shuffleMode: false
    },
    circleOfFifths: {
        score: 0,
        totalAttempts: 0,
        correctAnswers: 0
    },
    scaleProgression: {
        score: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        completedQuestions: []
    }
};

/**
 * Get all progress data from LocalStorage
 * @returns {Object} - Progress data object
 */
function getProgress() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Merge with defaults to ensure all keys exist
            return {
                scales: { ...defaultProgress.scales, ...parsed.scales },
                circleOfFifths: { ...defaultProgress.circleOfFifths, ...parsed.circleOfFifths },
                scaleProgression: { ...defaultProgress.scaleProgression, ...parsed.scaleProgression }
            };
        }
    } catch (error) {
        console.error('Error loading progress:', error);
    }
    return defaultProgress;
}

/**
 * Save progress data to LocalStorage
 * @param {Object} progress - Progress data object
 */
function saveProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

/**
 * Update progress for a specific section
 * @param {string} section - Section name (scales, circleOfFifths, scaleProgression)
 * @param {Object} updates - Object with properties to update
 */
function updateProgress(section, updates) {
    const progress = getProgress();
    if (progress[section]) {
        progress[section] = { ...progress[section], ...updates };
        saveProgress(progress);
    }
}

/**
 * Get progress for a specific section
 * @param {string} section - Section name
 * @returns {Object} - Section progress data
 */
function getSectionProgress(section) {
    const progress = getProgress();
    return progress[section] || defaultProgress[section];
}

/**
 * Reset progress for a specific section
 * @param {string} section - Section name (optional, resets all if not provided)
 */
function resetProgress(section = null) {
    if (section) {
        const progress = getProgress();
        progress[section] = { ...defaultProgress[section] };
        saveProgress(progress);
    } else {
        localStorage.removeItem(STORAGE_KEY);
    }
}

/**
 * Mark a scale card as completed
 * @param {string} scaleId - Unique identifier for the scale
 */
function markScaleCompleted(scaleId) {
    const progress = getProgress();
    if (!progress.scales.completed.includes(scaleId)) {
        progress.scales.completed.push(scaleId);
        saveProgress(progress);
    }
}

/**
 * Check if a scale card is completed
 * @param {string} scaleId - Unique identifier for the scale
 * @returns {boolean} - True if completed
 */
function isScaleCompleted(scaleId) {
    const progress = getProgress();
    return progress.scales.completed.includes(scaleId);
}

