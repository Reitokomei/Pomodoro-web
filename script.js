// Timer state
let timerInterval = null;
let timeRemaining = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let currentSession = 'work';
let pomodoroCount = 0;
let workSessionsCompleted = 0;

// Constants
const POMODOROS_UNTIL_LONG_BREAK = 4;

// DOM elements
const timerDisplay = document.getElementById('timer');
const sessionLabel = document.getElementById('session-label');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workBtn = document.getElementById('work-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');
const pomodoroCountDisplay = document.getElementById('pomodoro-count');

// Session configurations
const sessions = {
    work: { duration: 25, label: 'Work Session' },
    shortBreak: { duration: 5, label: 'Short Break' },
    longBreak: { duration: 15, label: 'Long Break' }
};

// Initialize
function init() {
    updateDisplay();
    attachEventListeners();
}

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update timer display
function updateDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
}

// Start timer
function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateDisplay();
        
        if (timeRemaining <= 0) {
            completeSession();
        }
    }, 1000);
}

// Pause timer
function pauseTimer() {
    if (!isRunning) return;
    
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Reset timer
function resetTimer() {
    pauseTimer();
    const activeBtn = document.querySelector('.session-btn.active');
    const duration = activeBtn ? parseInt(activeBtn.dataset.duration) : sessions[currentSession].duration;
    timeRemaining = duration * 60;
    updateDisplay();
}

// Complete session
function completeSession() {
    pauseTimer();
    
    // Save the current session label text for the notification message
    const completedSessionLabel = sessionLabel.textContent;
    
    // Update pomodoro count if work session completed
    let nextSessionLabel = '';
    if (currentSession === 'work') {
        pomodoroCount++;
        workSessionsCompleted++;
        pomodoroCountDisplay.textContent = pomodoroCount;
        
        // Auto-switch to break
        if (workSessionsCompleted % POMODOROS_UNTIL_LONG_BREAK === 0) {
            switchSession('longBreak');
            nextSessionLabel = 'Long Break';
        } else {
            switchSession('shortBreak');
            nextSessionLabel = 'Short Break';
        }
    } else {
        // After break, switch to work
        switchSession('work');
        nextSessionLabel = 'Work Session';
    }
    
    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
        try {
            new Notification('Pomodoro Timer', {
                body: `${completedSessionLabel} completed! Starting ${nextSessionLabel}.`,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23667eea"/></svg>'
            });
        } catch (error) {
            console.error('Failed to show notification:', error);
        }
    }
    
    // Show toast notification instead of blocking alert
    showToast(`${completedSessionLabel} completed! Starting ${nextSessionLabel}.`);
}

// Switch session type
function switchSession(sessionType) {
    pauseTimer();
    
    currentSession = sessionType;
    const session = sessions[sessionType];
    
    timeRemaining = session.duration * 60;
    sessionLabel.textContent = session.label;
    updateDisplay();
    
    // Update active button
    document.querySelectorAll('.session-btn').forEach(btn => btn.classList.remove('active'));
    
    if (sessionType === 'work') {
        workBtn.classList.add('active');
    } else if (sessionType === 'shortBreak') {
        shortBreakBtn.classList.add('active');
    } else if (sessionType === 'longBreak') {
        longBreakBtn.classList.add('active');
    }
}

// Show toast notification
function showToast(message) {
    // Remove any existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(t => {
        if (t.parentNode) {
            t.parentNode.removeChild(t);
        }
    });
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide and remove toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Attach event listeners
function attachEventListeners() {
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    workBtn.addEventListener('click', () => switchSession('work'));
    shortBreakBtn.addEventListener('click', () => switchSession('shortBreak'));
    longBreakBtn.addEventListener('click', () => switchSession('longBreak'));
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Initialize app
init();
