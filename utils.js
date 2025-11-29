/**
 * Utility Functions
 * Helper functions for shuffling, random selection, and formatting
 */

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array (original array is not modified)
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Gets a random element from an array
 * @param {Array} array - The array to select from
 * @returns {*} - A random element from the array
 */
function getRandomElement(array) {
    if (array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Gets multiple random elements from an array without duplicates
 * @param {Array} array - The array to select from
 * @param {number} count - Number of elements to select
 * @returns {Array} - Array of random elements
 */
function getRandomElements(array, count) {
    if (count >= array.length) {
        return shuffleArray(array);
    }
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, count);
}

/**
 * Formats a note name (e.g., "C#" to "C♯")
 * @param {string} note - The note name to format
 * @returns {string} - Formatted note name
 */
function formatNote(note) {
    // Replace # with ♯ and b with ♭ for better display
    return note.replace(/#/g, '♯').replace(/b/g, '♭');
}

/**
 * Formats a scale name for display
 * @param {string} root - Root note
 * @param {string} type - Scale type (major, minor, etc.)
 * @returns {string} - Formatted scale name
 */
function formatScaleName(root, type) {
    const formattedRoot = formatNote(root);
    return `${formattedRoot} ${type.charAt(0).toUpperCase() + type.slice(1)}`;
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

