/**
 * Main Application Controller
 * Handles routing, view switching, and initialization
 */

// View state management
const views = {
    scales: 'scales-view',
    circle: 'circle-view',
    progression: 'progression-view'
};

/**
 * Initialize the application
 */
function initApp() {
    // Initialize components
    flashcardManager = new FlashcardManager('flashcard-container');
    circleOfFifthsTrainer = new CircleOfFifthsTrainer();
    scaleProgressionQuiz = new ScaleProgressionQuiz();

    // Set up navigation
    setupNavigation();

    // Show initial view
    switchView('scales');
}

/**
 * Set up navigation event listeners
 */
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            switchView(view);
        });
    });
}

/**
 * Switch between views
 * @param {string} viewName - Name of the view to show
 */
function switchView(viewName) {
    // Hide all views
    Object.values(views).forEach(viewId => {
        const view = document.getElementById(viewId);
        if (view) {
            view.classList.remove('active');
        }
    });

    // Show selected view
    const selectedView = document.getElementById(views[viewName]);
    if (selectedView) {
        selectedView.classList.add('active');
    }

    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-view') === viewName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Initialize view-specific functionality
    handleViewSwitch(viewName);
}

/**
 * Handle view-specific initialization when switching views
 * @param {string} viewName - Name of the view being switched to
 */
function handleViewSwitch(viewName) {
    switch (viewName) {
        case 'scales':
            // Refresh flashcard view if needed
            if (flashcardManager) {
                flashcardManager.render();
            }
            break;
        
        case 'circle':
            // Generate new question if trainer exists
            if (circleOfFifthsTrainer && !circleOfFifthsTrainer.currentQuestion) {
                circleOfFifthsTrainer.generateQuestion();
            }
            break;
        
        case 'progression':
            // Load question if quiz exists and no current question
            if (scaleProgressionQuiz && !scaleProgressionQuiz.currentQuestion) {
                scaleProgressionQuiz.loadQuestion();
            }
            break;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Example: How to populate data (commented out - customize as needed)
/*
// Example scale data structure
const exampleScales = [
    {
        id: 'c-major',
        root: 'C',
        type: 'major',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    },
    {
        id: 'a-minor',
        root: 'A',
        type: 'minor',
        notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    }
    // Add more scales...
];

// To set scale data:
// flashcardManager.setScaleData(exampleScales);

// Example question bank structure
const exampleQuestions = [
    {
        id: 'q1',
        question: 'What is the relative minor of C major?',
        correctAnswer: 'A minor',
        options: ['A minor', 'E minor', 'D minor', 'G minor'],
        explanation: 'A minor is the relative minor of C major because they share the same key signature.'
    }
    // Add more questions...
];

// To set question bank:
// scaleProgressionQuiz.setQuestionBank(exampleQuestions);
*/

