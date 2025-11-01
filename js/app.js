// ========================================
// SECURITY SHIFT SCHEDULER PRO v2.0
// Complete Core Application Logic
// ========================================

console.log('📦 Security Shift Scheduler Pro v2.0 - Loading Core...');

// ========================================
// MOBILE DETECTION & INTERFACE MANAGER
// ========================================
let isMobileDevice = false;

function detectMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    // Check both user agent and screen size
    isMobileDevice = mobileRegex.test(userAgent) || screenWidth <= 768;
    
    // Add mobile class to body for CSS targeting
    if (isMobileDevice) {
        document.body.classList.add('mobile-device');
        initMobileInterface();
    } else {
        document.body.classList.add('desktop-device');
    }
    
    return isMobileDevice;
}

function initMobileInterface() {
    console.log('🔧 Initializing mobile interface...');
    
    // Replace desktop layout with mobile-optimized layout
    const container = document.getElementById('mainContainer');
    if (container) {
        container.innerHTML = getMobileLayout();
        initMobileEventListeners();
    }
}

function getMobileLayout() {
    return `
        <!-- Mobile App Header -->
        <div class="mobile-header">
            <div class="mobile-header-content">
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    <span></span><span></span><span></span>
                </button>
                <div class="mobile-title">
                    <h1>🛡️ Scheduler Pro</h1>
                    <p>November 2025</p>
                </div>
                <div class="mobile-actions">
                    <button class="mobile-btn" id="mobileViewBtn" title="Change View">📅</button>
                    <button class="mobile-btn" id="mobileMoreBtn" title="More Options">⋯</button>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation Sidebar -->
        <div class="mobile-sidebar" id="mobileSidebar">
            <div class="mobile-sidebar-header">
                <h3>🛡️ Scheduler Pro</h3>
                <button class="mobile-close-btn" id="mobileCloseBtn">&times;</button>
            </div>
            <div class="mobile-nav-items">
                <button class="mobile-nav-item" id="mobileAddWorkerBtn">
                    <span>👤</span> Add Worker
                </button>
                <button class="mobile-nav-item" id="mobileManageWorkersBtn">
                    <span>�</span> Manage Workers
                </button>
                <div class="mobile-nav-divider"></div>
                <button class="mobile-nav-item" id="mobileThemeBtn">
                    <span>🎨</span> Themes
                </button>
                <button class="mobile-nav-item" id="mobileSettingsBtn">
                    <span>⚙️</span> Settings
                </button>
                <div class="mobile-nav-divider"></div>
                <button class="mobile-nav-item" id="mobileExportBtn">
                    <span>�</span> Export
                </button>
                <button class="mobile-nav-item" id="mobileAnalyticsBtn">
                    <span>📊</span> Analytics
                </button>
                <button class="mobile-nav-item" id="mobileGuideBtn">
                    <span>📖</span> User Guide
                </button>
                <div class="mobile-nav-divider"></div>
                <button class="mobile-nav-item" id="mobileUndoBtn" disabled>
                    <span>↶</span> Undo
                </button>
                <button class="mobile-nav-item" id="mobileRedoBtn" disabled>
                    <span>↷</span> Redo
                </button>
                <div class="mobile-nav-divider"></div>
                <button class="mobile-nav-item" id="mobileSaveBtn">
                    <span>💾</span> <span id="mobileSaveStatus">Saved</span>
                </button>
            </div>
        </div>

            <!-- Mobile Content Area -->
        <div class="mobile-content">
            <!-- Mobile Calendar View -->
            <div class="mobile-schedule-container">
                <div class="mobile-view-controls">
                    <div class="mobile-view-tabs">
                        <button class="view-tab active" data-view="weekly">📅 Weekly</button>
                        <button class="view-tab" data-view="monthly">🗓️ Monthly</button>
                    </div>
                </div>
                
                <div class="mobile-week-tabs" id="mobileWeekTabs">
                    <button class="week-tab active" data-week="1">Week 1</button>
                    <button class="week-tab" data-week="2">Week 2</button>
                    <button class="week-tab" data-week="3">Week 3</button>
                    <button class="week-tab" data-week="4">Week 4</button>
                </div>                <div class="mobile-calendar" id="mobileCalendar">
                    <!-- Calendar will be generated here -->
                </div>
            </div>

            <!-- Mobile Time Shortcuts -->
            <div class="mobile-shortcuts">
                <div class="shortcuts-header">
                    <span>⚡ Quick Times</span>
                </div>
                <div class="mobile-shortcut-grid">
                    <button class="mobile-shortcut" data-time="11-7">11PM-7AM</button>
                    <button class="mobile-shortcut" data-time="7-3">7AM-3PM</button>
                    <button class="mobile-shortcut" data-time="3-11">3PM-11PM</button>
                    <button class="mobile-shortcut" data-time="off">Day Off</button>
                    <button class="mobile-shortcut" data-time="10-6">10AM-6PM</button>
                    <button class="mobile-shortcut" data-time="8-4">8AM-4PM</button>
                </div>
            </div>
        </div>

        <!-- Mobile Modals Container -->
        <div class="mobile-modals">
            <!-- Theme Modal -->
            <div class="mobile-modal" id="mobileThemeModal">
                <div class="mobile-modal-content">
                    <div class="mobile-modal-header">
                        <h3>🎨 Choose Theme</h3>
                        <button class="mobile-modal-close" data-modal="mobileThemeModal">&times;</button>
                    </div>
                    <div class="mobile-theme-grid">
                        <div class="mobile-theme-card" data-theme="light">
                            <div class="theme-preview light"></div>
                            <span>Light</span>
                        </div>
                        <div class="mobile-theme-card" data-theme="dark">
                            <div class="theme-preview dark"></div>
                            <span>Dark</span>
                        </div>
                        <div class="mobile-theme-card" data-theme="ocean">
                            <div class="theme-preview ocean"></div>
                            <span>Ocean</span>
                        </div>
                        <div class="mobile-theme-card" data-theme="forest">
                            <div class="theme-preview forest"></div>
                            <span>Forest</span>
                        </div>
                        <div class="mobile-theme-card" data-theme="purple">
                            <div class="theme-preview purple"></div>
                            <span>Purple</span>
                        </div>
                        <div class="mobile-theme-card" data-theme="contrast">
                            <div class="theme-preview contrast"></div>
                            <span>High Contrast</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Export Modal -->
            <div class="mobile-modal" id="mobileExportModal">
                <div class="mobile-modal-content">
                    <div class="mobile-modal-header">
                        <h3>📤 Export Schedule</h3>
                        <button class="mobile-modal-close" data-modal="mobileExportModal">&times;</button>
                    </div>
                    <div class="mobile-export-options">
                        <button class="mobile-export-btn" id="mobilePrintBtn">🖨️ Print</button>
                        <button class="mobile-export-btn" id="mobileCompactPdfBtn">📄 Compact PDF</button>
                        <button class="mobile-export-btn" id="mobileFullImageBtn">🖼️ Full Image</button>
                        <button class="mobile-export-btn" id="mobileJsonExportBtn">💾 Save Data</button>
                    </div>
                </div>
            </div>

            <!-- Settings Modal -->
            <div class="mobile-modal" id="mobileSettingsModal">
                <div class="mobile-modal-content">
                    <div class="mobile-modal-header">
                        <h3>⚙️ Settings</h3>
                        <button class="mobile-modal-close" data-modal="mobileSettingsModal">&times;</button>
                    </div>
                    <div class="mobile-settings-content">
                        <div class="mobile-setting-item">
                            <label>Auto-Save</label>
                            <div class="mobile-toggle">
                                <input type="checkbox" id="mobileAutoSaveToggle" checked>
                                <span class="toggle-slider"></span>
                            </div>
                        </div>
                        <div class="mobile-setting-item">
                            <label>Month & Year</label>
                            <div class="mobile-date-controls">
                                <select id="mobileMonthSelect">
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">September</option>
                                    <option value="9">October</option>
                                    <option value="10" selected>November</option>
                                    <option value="11">December</option>
                                </select>
                                <input type="number" id="mobileYearInput" value="2025" min="2020" max="2030">
                            </div>
                        </div>
                        <div class="mobile-setting-item">
                            <button class="mobile-setting-btn" id="mobileUpdateCalendar">Update Calendar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Worker Management Modal -->
            <div class="mobile-modal" id="mobileWorkerModal">
                <div class="mobile-modal-content">
                    <div class="mobile-modal-header">
                        <h3>👥 Manage Workers</h3>
                        <button class="mobile-modal-close" data-modal="mobileWorkerModal">&times;</button>
                    </div>
                    <div class="mobile-worker-content">
                        <div class="mobile-add-worker">
                            <input type="text" id="mobileWorkerNameInput" placeholder="Enter worker name...">
                            <button class="mobile-add-btn" id="mobileAddWorkerSubmit">Add Worker</button>
                        </div>
                        <div class="mobile-worker-list" id="mobileWorkerList">
                            <!-- Workers will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// GLOBAL STATE
// ========================================
let workers = [];
let workerNames = {};
let currentMonth = 10;
let currentYear = 2025;
let daysInMonth = 30;
let currentViewMode = 'biweekly';
let scheduleData = {};

let history = [];
let historyIndex = -1;
const MAX_HISTORY = 50;

let autoSaveEnabled = true;
let autoSaveTimer = null;
let lastSavedState = null;

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ========================================
// THEME MANAGEMENT
// ========================================
function initThemeManager() {
    const savedTheme = localStorage.getItem('schedulerTheme') || 'light';
    applyTheme(savedTheme);
    
    document.getElementById('themeBtn').addEventListener('click', () => {
        document.getElementById('themeModal').classList.add('active');
    });
    
    document.getElementById('closeTheme').addEventListener('click', () => {
        document.getElementById('themeModal').classList.remove('active');
    });
    
    document.getElementById('themeModal').addEventListener('click', (e) => {
        if (e.target.id === 'themeModal') {
            document.getElementById('themeModal').classList.remove('active');
        }
    });
    
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.getAttribute('data-theme');
            applyTheme(theme);
            document.getElementById('themeModal').classList.remove('active');
        });
    });
}

function applyTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('schedulerTheme', themeName);
    
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-theme') === themeName) {
            card.classList.add('active');
        }
    });
}

// ========================================
// AUTO-SAVE SYSTEM
// ========================================
function initAutoSave() {
    const toggle = document.getElementById('autoSaveToggle');
    const savedSetting = localStorage.getItem('autoSaveEnabled');
    
    if (savedSetting !== null) {
        autoSaveEnabled = savedSetting === 'true';
        toggle.checked = autoSaveEnabled;
    }
    
    toggle.addEventListener('change', (e) => {
        autoSaveEnabled = e.target.checked;
        localStorage.setItem('autoSaveEnabled', autoSaveEnabled);
        
        if (autoSaveEnabled) {
            startAutoSave();
        } else {
            stopAutoSave();
        }
    });
    
    if (autoSaveEnabled) {
        startAutoSave();
    }
}

function startAutoSave() {
    if (autoSaveTimer) clearInterval(autoSaveTimer);
    
    autoSaveTimer = setInterval(() => {
        if (hasUnsavedChanges()) {
            saveToLocalStorage();
        }
    }, 30000);
}

function stopAutoSave() {
    if (autoSaveTimer) {
        clearInterval(autoSaveTimer);
        autoSaveTimer = null;
    }
}

function hasUnsavedChanges() {
    const currentState = JSON.stringify({ scheduleData, workerNames, currentMonth, currentYear });
    return currentState !== lastSavedState;
}

function updateAutoSaveIndicator(status) {
    const indicator = document.getElementById('autoSaveStatus');
    const icon = indicator.querySelector('.save-icon');
    const text = indicator.querySelector('.save-text');
    
    indicator.classList.remove('saving');
    
    switch(status) {
        case 'saving':
            icon.textContent = '⏳';
            text.textContent = 'Saving...';
            indicator.classList.add('saving');
            break;
        case 'saved':
            icon.textContent = '✅';
            text.textContent = 'Saved';
            setTimeout(() => {
                icon.textContent = '💾';
                text.textContent = 'Saved';
            }, 2000);
            break;
        case 'unsaved':
            icon.textContent = '⚠️';
            text.textContent = 'Unsaved';
            break;
        case 'error':
            icon.textContent = '❌';
            text.textContent = 'Error';
            break;
    }
}

function saveToLocalStorage() {
    try {
        updateAutoSaveIndicator('saving');
        
        const saveData = {
            scheduleData,
            workerNames,
            currentMonth,
            currentYear,
            daysInMonth,
            currentViewMode,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('schedulerData', JSON.stringify(saveData));
        lastSavedState = JSON.stringify({ scheduleData, workerNames, currentMonth, currentYear });
        
        updateAutoSaveIndicator('saved');
    } catch (error) {
        console.error('Auto-save error:', error);
        updateAutoSaveIndicator('error');
    }
}

function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('schedulerData');
        if (!saved) return false;
        
        const data = JSON.parse(saved);
        
        scheduleData = data.scheduleData || {};
        workerNames = data.workerNames || {};
        currentMonth = data.currentMonth ?? 10;
        currentYear = data.currentYear ?? 2025;
        daysInMonth = data.daysInMonth ?? 30;
        currentViewMode = data.currentViewMode || 'biweekly';
        
        document.getElementById('monthSelect').value = currentMonth;
        document.getElementById('yearInput').value = currentYear;
        document.getElementById('viewMode').value = currentViewMode;
        document.getElementById('workerCount').value = Object.keys(workerNames).length || 8;
        
        updateHeader();
        generateSchedule(true);
        
        lastSavedState = JSON.stringify({ scheduleData, workerNames, currentMonth, currentYear });
        
        updateAutoSaveIndicator('saved');
        return true;
    } catch (error) {
        console.error('Load error:', error);
        return false;
    }
}

// ========================================
// UNDO/REDO SYSTEM
// ========================================
function saveToHistory() {
    const state = {
        scheduleData: JSON.parse(JSON.stringify(scheduleData)),
        workerNames: JSON.parse(JSON.stringify(workerNames))
    };
    
    history = history.slice(0, historyIndex + 1);
    history.push(state);
    
    if (history.length > MAX_HISTORY) {
        history.shift();
    } else {
        historyIndex++;
    }
    
    updateHistoryUI();
    updateAutoSaveIndicator('unsaved');
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        const state = history[historyIndex];
        scheduleData = JSON.parse(JSON.stringify(state.scheduleData));
        workerNames = JSON.parse(JSON.stringify(state.workerNames));
        generateSchedule(true);
        updateHistoryUI();
        updateAutoSaveIndicator('unsaved');
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        const state = history[historyIndex];
        scheduleData = JSON.parse(JSON.stringify(state.scheduleData));
        workerNames = JSON.parse(JSON.stringify(state.workerNames));
        generateSchedule(true);
        updateHistoryUI();
        updateAutoSaveIndicator('unsaved');
    }
}

function updateHistoryUI() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    const historyCount = document.getElementById('historyCount');
    
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= history.length - 1;
    historyCount.textContent = history.length;
    
    undoBtn.style.opacity = undoBtn.disabled ? '0.5' : '1';
    redoBtn.style.opacity = redoBtn.disabled ? '0.5' : '1';
}

function clearAllData() {
    if (confirm('⚠️ Are you sure you want to clear ALL schedule data?\\n\\nThis will:\\n- Clear all shifts\\n- Reset worker names\\n- Clear undo/redo history\\n- Clear auto-save data\\n\\nThis action cannot be undone!')) {
        scheduleData = {};
        workerNames = {};
        history = [];
        historyIndex = -1;
        localStorage.removeItem('schedulerData');
        lastSavedState = null;
        
        generateSchedule(false);
        updateHistoryUI();
        updateAutoSaveIndicator('saved');
        
        alert('✅ All data cleared successfully!');
    }
}

// ========================================
// CALENDAR UTILITIES
// ========================================
function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getDayOfWeek(day, month, year) {
    return new Date(year, month, day).getDay();
}

function getDayName(dayOfWeek) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayOfWeek];
}

function updateHeader() {
    const headerTitle = document.querySelector('.header h1');
    headerTitle.textContent = `🛡️ Security Shift Scheduler Pro - ${monthNames[currentMonth]} ${currentYear}`;
}

function updateCalendar() {
    currentMonth = parseInt(document.getElementById('monthSelect').value);
    currentYear = parseInt(document.getElementById('yearInput').value);
    daysInMonth = getDaysInMonth(currentMonth, currentYear);
    
    updateHeader();
    generateSchedule(true);
    saveToHistory();
}

// ========================================
// SHIFT PARSING
// ========================================
function parseTimeInput(input) {
    if (!input || input.trim() === '' || input === '--') return null;
    
    input = input.trim().toLowerCase();
    
    if (input === 'off' || input === 'OFF') {
        return { time: 'OFF', type: 'off' };
    }
    
    const patterns = {
        '11-7': { time: '11PM-7AM', type: 'night' },
        '7-3': { time: '7AM-3PM', type: 'day' },
        '3-11': { time: '3PM-11PM', type: 'evening' },
        '10-6': { time: '10AM-6PM', type: 'day' }
    };

    if (patterns[input]) {
        return patterns[input];
    }

    const timeRegex = /(\d{1,2})\s*[-–to]\s*(\d{1,2})/i;
    const match = input.match(timeRegex);
    
    if (match) {
        let start = parseInt(match[1]);
        let end = parseInt(match[2]);
        
        let startPeriod, endPeriod, shiftType;
        
        if (start === 11 && end === 7) {
            startPeriod = 'PM'; endPeriod = 'AM'; shiftType = 'night';
        } else if (start === 7 && end === 3) {
            startPeriod = 'AM'; endPeriod = 'PM'; shiftType = 'day';
        } else if (start === 3 && end === 11) {
            startPeriod = 'PM'; endPeriod = 'PM'; shiftType = 'evening';
        } else if (start === 10 && end === 6) {
            startPeriod = 'AM'; endPeriod = 'PM'; shiftType = 'day';
        } else if (start >= 7 && start < 12 && end <= 6) {
            startPeriod = 'AM'; endPeriod = 'PM'; shiftType = 'day';
        } else if (start >= 12 || start < 7) {
            if (end < start) {
                startPeriod = 'PM'; endPeriod = 'AM'; shiftType = 'night';
            } else {
                startPeriod = 'PM'; endPeriod = 'PM'; shiftType = 'evening';
            }
        } else {
            startPeriod = 'AM'; endPeriod = 'PM'; shiftType = 'day';
        }
        
        return {
            time: `${start}${startPeriod}-${end}${endPeriod}`,
            type: shiftType
        };
    }
    
    return { time: input, type: 'day' };
}

function isManager(name) {
    return name.toLowerCase().includes('(m)');
}

// ========================================
// SHIFT CELL CREATION
// ========================================
function createShiftCellWithData(workerIndex, day, existingShiftData) {
    const cell = document.createElement('td');
    cell.className = 'shift-cell';
    
    const dayOfWeek = getDayOfWeek(day, currentMonth, currentYear);
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        cell.classList.add('weekend');
    }
    
    if (existingShiftData) {
        const display = document.createElement('div');
        display.className = `shift-display shift-${existingShiftData.type}`;
        display.textContent = existingShiftData.time;
        
        display.onclick = () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = existingShiftData.time;
            input.setAttribute('data-worker', workerIndex);
            input.setAttribute('data-day', day);
            
            input.addEventListener('blur', handleInputBlur);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') e.target.blur();
            });
            
            cell.innerHTML = '';
            cell.appendChild(input);
            input.focus();
        };
        
        cell.appendChild(display);
    } else {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = '--';
        input.setAttribute('data-worker', workerIndex);
        input.setAttribute('data-day', day);
        
        input.addEventListener('blur', handleInputBlur);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') e.target.blur();
        });
        
        cell.appendChild(input);
    }
    
    return cell;
}

function handleInputBlur(e) {
    const value = e.target.value.trim();
    const parsed = parseTimeInput(value);
    
    if (parsed && value !== '') {
        const worker = e.target.getAttribute('data-worker');
        const day = e.target.getAttribute('data-day');
        
        if (!scheduleData[worker]) {
            scheduleData[worker] = {};
        }
        scheduleData[worker][day] = parsed;
        
        saveToHistory();
        
        const cell = e.target.parentElement;
        const display = document.createElement('div');
        display.className = `shift-display shift-${parsed.type}`;
        display.textContent = parsed.time;
        display.onclick = () => {
            cell.innerHTML = '';
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.value = parsed.time;
            newInput.setAttribute('data-worker', worker);
            newInput.setAttribute('data-day', day);
            newInput.addEventListener('blur', handleInputBlur);
            newInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') e.target.blur();
            });
            cell.appendChild(newInput);
            newInput.focus();
        };
        
        cell.innerHTML = '';
        cell.appendChild(display);
    }
}

// ========================================
// SCHEDULE GENERATION
// ========================================
function generateSchedule(preserveData = false) {
    if (currentViewMode === 'biweekly') {
        generateBiweeklySchedule(preserveData);
    } else {
        generateWeeklySchedule(preserveData);
    }
}

function generateBiweeklySchedule(preserveData = false) {
    const workerCount = parseInt(document.getElementById('workerCount').value);
    
    if (workerCount < 1 || workerCount > 50) {
        alert('Please enter a number between 1 and 50');
        return;
    }

    workers = [];
    for (let i = 1; i <= workerCount; i++) {
        workers.push(`Worker ${i}`);
    }

    const midPoint = Math.ceil(daysInMonth / 2);
    
    const tbody1 = document.getElementById('scheduleBody1');
    const tbody2 = document.getElementById('scheduleBody2');
    tbody1.innerHTML = '';
    tbody2.innerHTML = '';
    
    const header1 = document.getElementById('headerRow1');
    const header2 = document.getElementById('headerRow2');
    header1.innerHTML = '<th class="worker-name">Security Personnel</th>';
    header2.innerHTML = '<th class="worker-name">Security Personnel</th>';
    
    for (let day = 1; day <= midPoint; day++) {
        const dayOfWeek = getDayOfWeek(day, currentMonth, currentYear);
        const dayName = getDayName(dayOfWeek);
        const th = document.createElement('th');
        th.className = 'day-header';
        th.innerHTML = `${day}<br>${dayName}`;
        header1.appendChild(th);
    }
    
    for (let day = midPoint + 1; day <= daysInMonth; day++) {
        const dayOfWeek = getDayOfWeek(day, currentMonth, currentYear);
        const dayName = getDayName(dayOfWeek);
        const th = document.createElement('th');
        th.className = 'day-header';
        th.innerHTML = `${day}<br>${dayName}`;
        header2.appendChild(th);
    }
    
    if (!preserveData) {
        scheduleData = {};
        saveToHistory();
    }
    
    workers.forEach((worker, workerIndex) => {
        const row1 = document.createElement('tr');
        const nameCell1 = document.createElement('td');
        nameCell1.className = 'worker-name';
        nameCell1.contentEditable = true;
        const displayName = workerNames[workerIndex] || worker;
        nameCell1.textContent = displayName;
        
        if (isManager(displayName)) {
            nameCell1.classList.add('manager');
            const badge = document.createElement('span');
            badge.className = 'manager-badge';
            badge.textContent = 'MGR';
            nameCell1.appendChild(badge);
        }
        
        nameCell1.addEventListener('blur', () => {
            const newName = nameCell1.textContent.trim();
            if (newName !== displayName) {
                workerNames[workerIndex] = newName;
                saveToHistory();
                generateSchedule(true);
            }
        });
        
        row1.appendChild(nameCell1);
        
        for (let day = 1; day <= midPoint; day++) {
            const existingData = scheduleData[workerIndex] && scheduleData[workerIndex][day];
            row1.appendChild(createShiftCellWithData(workerIndex, day, existingData));
        }
        tbody1.appendChild(row1);
        
        const row2 = document.createElement('tr');
        const nameCell2 = document.createElement('td');
        nameCell2.className = 'worker-name';
        nameCell2.contentEditable = true;
        nameCell2.textContent = displayName;
        
        if (isManager(displayName)) {
            nameCell2.classList.add('manager');
            const badge = document.createElement('span');
            badge.className = 'manager-badge';
            badge.textContent = 'MGR';
            nameCell2.appendChild(badge);
        }
        
        nameCell2.addEventListener('blur', () => {
            const newName = nameCell2.textContent.trim();
            if (newName !== displayName) {
                workerNames[workerIndex] = newName;
                saveToHistory();
                generateSchedule(true);
            }
        });
        
        row2.appendChild(nameCell2);
        
        for (let day = midPoint + 1; day <= daysInMonth; day++) {
            const existingData = scheduleData[workerIndex] && scheduleData[workerIndex][day];
            row2.appendChild(createShiftCellWithData(workerIndex, day, existingData));
        }
        tbody2.appendChild(row2);
    });
}

function generateWeeklySchedule(preserveData = false) {
    const workerCount = parseInt(document.getElementById('workerCount').value);
    
    if (workerCount < 1 || workerCount > 50) {
        alert('Please enter a number between 1 and 50');
        return;
    }

    workers = [];
    for (let i = 1; i <= workerCount; i++) {
        workers.push(`Worker ${i}`);
    }

    if (!preserveData) {
        scheduleData = {};
        saveToHistory();
    }

    const weeklyView = document.getElementById('weeklyView');
    weeklyView.innerHTML = '';

    const totalWeeks = Math.ceil(daysInMonth / 7);
    
    for (let weekNum = 0; weekNum < totalWeeks; weekNum++) {
        const startDay = weekNum * 7 + 1;
        const endDay = Math.min(startDay + 6, daysInMonth);
        
        const weekContainer = document.createElement('div');
        weekContainer.className = 'week-container';
        
        const weekTitle = document.createElement('div');
        weekTitle.className = 'week-title';
        weekTitle.textContent = `📆 Week ${weekNum + 1} (Days ${startDay}-${endDay})`;
        
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';
        
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const workerHeader = document.createElement('th');
        workerHeader.className = 'worker-name';
        workerHeader.textContent = 'Security Personnel';
        headerRow.appendChild(workerHeader);
        
        for (let day = startDay; day <= endDay; day++) {
            const dayOfWeek = getDayOfWeek(day, currentMonth, currentYear);
            const dayName = getDayName(dayOfWeek);
            const th = document.createElement('th');
            th.className = 'day-header';
            th.innerHTML = `${day}<br>${dayName}`;
            headerRow.appendChild(th);
        }
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        const tbody = document.createElement('tbody');
        
        workers.forEach((worker, workerIndex) => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.className = 'worker-name';
            nameCell.contentEditable = true;
            const displayName = workerNames[workerIndex] || worker;
            nameCell.textContent = displayName;
            
            if (isManager(displayName)) {
                nameCell.classList.add('manager');
                const badge = document.createElement('span');
                badge.className = 'manager-badge';
                badge.textContent = 'MGR';
                nameCell.appendChild(badge);
            }
            
            nameCell.addEventListener('blur', () => {
                const newName = nameCell.textContent.trim();
                if (newName !== displayName) {
                    workerNames[workerIndex] = newName;
                    saveToHistory();
                    generateSchedule(true);
                }
            });
            
            row.appendChild(nameCell);
            
            for (let day = startDay; day <= endDay; day++) {
                const existingData = scheduleData[workerIndex] && scheduleData[workerIndex][day];
                row.appendChild(createShiftCellWithData(workerIndex, day, existingData));
            }
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        weekContainer.appendChild(weekTitle);
        weekContainer.appendChild(tableContainer);
        weeklyView.appendChild(weekContainer);
    }
}

function switchView() {
    const viewMode = document.getElementById('viewMode').value;
    currentViewMode = viewMode;
    
    const biweeklyView = document.getElementById('biweeklyView');
    const weeklyView = document.getElementById('weeklyView');
    
    if (viewMode === 'biweekly') {
        biweeklyView.style.display = 'block';
        weeklyView.style.display = 'none';
        generateBiweeklySchedule(true);
    } else {
        biweeklyView.style.display = 'none';
        weeklyView.style.display = 'block';
        generateWeeklySchedule(true);
    }
}

// ========================================
// EXPORT TO JSON
// ========================================
function exportScheduleData() {
    const exportData = {
        month: currentMonth,
        year: currentYear,
        workerNames: workerNames,
        scheduleData: scheduleData,
        daysInMonth: daysInMonth,
        viewMode: currentViewMode,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `Security_Schedule_${monthNames[currentMonth]}_${currentYear}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

function importScheduleData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            currentMonth = data.month;
            currentYear = data.year;
            workerNames = data.workerNames || {};
            scheduleData = data.scheduleData || {};
            daysInMonth = data.daysInMonth;
            
            if (data.viewMode) {
                currentViewMode = data.viewMode;
                document.getElementById('viewMode').value = data.viewMode;
            }
            
            document.getElementById('monthSelect').value = currentMonth;
            document.getElementById('yearInput').value = currentYear;
            document.getElementById('workerCount').value = Object.keys(workerNames).length || 8;
            
            updateHeader();
            switchView();
            
            alert('Schedule imported successfully!');
            
        } catch (error) {
            alert('Error importing schedule. Please check the file format.');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
    
    event.target.value = '';
}

// ========================================
// ANALYTICS
// ========================================
function calculateAnalytics() {
    const analytics = {
        workers: {},
        shiftPatterns: {},
        shiftPairs: {}
    };

    const shiftHours = {
        'night': 8,
        'day': 8,
        'evening': 8,
        'off': 0
    };

    Object.keys(scheduleData).forEach(workerIndex => {
        const workerName = workerNames[workerIndex] || `Worker ${parseInt(workerIndex) + 1}`;
        
        analytics.workers[workerName] = {
            shifts: {},
            totalHours: 0,
            daysWorked: 0,
            daysOff: 0
        };

        Object.keys(scheduleData[workerIndex]).forEach(day => {
            const shift = scheduleData[workerIndex][day];
            
            if (shift.type === 'off') {
                analytics.workers[workerName].daysOff++;
            } else {
                analytics.workers[workerName].daysWorked++;
                analytics.workers[workerName].totalHours += shiftHours[shift.type] || 8;
                
                if (!analytics.workers[workerName].shifts[shift.type]) {
                    analytics.workers[workerName].shifts[shift.type] = 0;
                }
                analytics.workers[workerName].shifts[shift.type]++;
            }

            if (!analytics.shiftPatterns[day]) {
                analytics.shiftPatterns[day] = {};
            }
            if (!analytics.shiftPatterns[day][shift.time]) {
                analytics.shiftPatterns[day][shift.time] = [];
            }
            analytics.shiftPatterns[day][shift.time].push(workerName);
        });
    });

    Object.keys(analytics.shiftPatterns).forEach(day => {
        Object.keys(analytics.shiftPatterns[day]).forEach(shiftTime => {
            const workersOnShift = analytics.shiftPatterns[day][shiftTime];
            if (workersOnShift.length > 1) {
                const key = workersOnShift.sort().join(' & ');
                if (!analytics.shiftPairs[key]) {
                    analytics.shiftPairs[key] = 0;
                }
                analytics.shiftPairs[key]++;
            }
        });
    });

    return analytics;
}

function openOverviewPage() {
    const analytics = calculateAnalytics();
    const overviewWindow = window.open('', '_blank');
    overviewWindow.document.write(generateOverviewHTML(analytics));
    overviewWindow.document.close();
}

function openGuidePage() {
    const guideWindow = window.open('', '_blank');
    guideWindow.document.write(generateGuideHTML());
    guideWindow.document.close();
}

// ========================================
// MOBILE INTERFACE FUNCTIONS
// ========================================
function initMobileEventListeners() {
    console.log('🔧 Setting up mobile event listeners...');
    
    // Mobile menu toggle
    const menuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('mobileSidebar');
    const closeBtn = document.getElementById('mobileCloseBtn');
    
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }
    
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }
    
    // Close sidebar when clicking outside
    if (sidebar) {
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
    
    // Week tabs
    document.querySelectorAll('.week-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.week-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const weekNum = parseInt(tab.dataset.week);
            generateMobileCalendar(weekNum);
        });
    });
    
    // View toggle buttons
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.view-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const viewType = tab.dataset.view;
            toggleMobileView(viewType);
        });
    });

    // Navigation items
    const navItems = {
        'mobileAddWorkerBtn': 'mobileWorkerModal',
        'mobileManageWorkersBtn': 'mobileWorkerModal',
        'mobileThemeBtn': 'mobileThemeModal',
        'mobileExportBtn': 'mobileExportModal',
        'mobileSettingsBtn': 'mobileSettingsModal',
        'mobileAnalyticsBtn': () => openMobileAnalytics(),
        'mobileGuideBtn': () => openMobileGuide(),
        'mobileUndoBtn': () => undo(),
        'mobileRedoBtn': () => redo(),
        'mobileSaveBtn': () => showMobileSaveToast()
    };
    
    Object.keys(navItems).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                const action = navItems[btnId];
                if (typeof action === 'function') {
                    action();
                } else {
                    showMobileModal(action);
                }
                // Close sidebar
                sidebar.classList.remove('open');
            });
        }
    });
    
    // Settings modal functionality
    const autoSaveToggle = document.getElementById('mobileAutoSaveToggle');
    if (autoSaveToggle) {
        autoSaveToggle.checked = autoSaveEnabled;
        autoSaveToggle.addEventListener('change', () => {
            toggleAutoSave();
            showMobileToast(autoSaveEnabled ? '✅ Auto-save enabled' : '❌ Auto-save disabled', 2000);
        });
    }
    
    const updateCalendarBtn = document.getElementById('mobileUpdateCalendar');
    if (updateCalendarBtn) {
        updateCalendarBtn.addEventListener('click', () => {
            const monthSelect = document.getElementById('mobileMonthSelect');
            const yearInput = document.getElementById('mobileYearInput');
            
            if (monthSelect && yearInput) {
                currentMonth = parseInt(monthSelect.value);
                currentYear = parseInt(yearInput.value);
                daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                
                generateMobileCalendar(1);
                hideMobileModal('mobileSettingsModal');
                showMobileToast('📅 Calendar updated!', 2000);
            }
        });
    }
    
    // Worker management functionality
    const addWorkerBtn = document.getElementById('mobileAddWorkerSubmit');
    const workerNameInput = document.getElementById('mobileWorkerNameInput');
    
    if (addWorkerBtn && workerNameInput) {
        addWorkerBtn.addEventListener('click', () => {
            const name = workerNameInput.value.trim();
            if (name) {
                const newIndex = workers.length;
                workers.push(`Worker ${newIndex + 1}`);
                workerNames[newIndex] = name;
                
                workerNameInput.value = '';
                populateMobileWorkerSelect();
                updateMobileWorkerList();
                generateMobileCalendar(1);
                showMobileToast(`✅ Added ${name}`, 2000);
                
                saveState();
                if (autoSaveEnabled) {
                    saveToLocalStorage();
                }
            }
        });
        
        workerNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addWorkerBtn.click();
            }
        });
    }
    
    // Modal close buttons
    document.querySelectorAll('.mobile-modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modalId = closeBtn.dataset.modal;
            hideMobileModal(modalId);
        });
    });
    
    // Theme selection
    document.querySelectorAll('.mobile-theme-card').forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.dataset.theme;
            applyTheme(theme);
            hideMobileModal('mobileThemeModal');
        });
    });
    
    // Time shortcuts
    document.querySelectorAll('.mobile-shortcut').forEach(btn => {
        btn.addEventListener('click', () => {
            const timeValue = btn.dataset.time;
            // Apply to currently selected worker and day
            if (window.selectedMobileCell) {
                window.selectedMobileCell.textContent = formatTime(timeValue);
                updateScheduleFromMobile();
            }
        });
    });
    
    // Export buttons
    const exportBtns = {
        'mobilePrintBtn': () => handleMobilePrint(),
        'mobileCompactPdfBtn': () => handleMobileExport('pdf'),
        'mobileFullImageBtn': () => handleMobileExport('image'),
        'mobileJsonExportBtn': () => handleMobileExport('json')
    };
    
    Object.keys(exportBtns).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                exportBtns[btnId]();
                hideMobileModal('mobileExportModal');
            });
        }
    });
    
    // Initialize mobile interface
    generateMobileCalendar(1);
    populateMobileWorkerSelect();
    updateMobileWorkerList();
    updateMobileHistoryUI();
    
    // Load existing data if available
    const loaded = loadFromLocalStorage();
    if (loaded) {
        generateMobileCalendar(1);
        populateMobileWorkerSelect();
        updateMobileWorkerList();
    }
    
    // Set up auto-save for mobile
    if (autoSaveEnabled) {
        const statusElement = document.getElementById('mobileSaveStatus');
        if (statusElement) {
            statusElement.textContent = 'Auto-save ON';
        }
    }
}

function generateMobileCalendar(weekNum) {
    const calendar = document.getElementById('mobileCalendar');
    if (!calendar) return;
    
    const startDay = (weekNum - 1) * 7 + 1;
    const endDay = Math.min(startDay + 6, daysInMonth);
    
    calendar.innerHTML = `
        <div class="mobile-week-header">
            <h3>Week ${weekNum} - Days ${startDay}-${endDay}</h3>
        </div>
        <div class="mobile-calendar-grid">
            ${generateMobileWeekDays(startDay, endDay)}
        </div>
    `;
}

function generateMobileWeekDays(startDay, endDay) {
    let html = '';
    
    for (let day = startDay; day <= endDay; day++) {
        const dayOfWeek = getDayOfWeek(day, currentMonth, currentYear);
        const dayName = getDayName(dayOfWeek);
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        html += `
            <div class="mobile-day-card ${isWeekend ? 'weekend' : ''}">
                <div class="mobile-day-header">
                    <span class="day-number">${day}</span>
                    <span class="day-name">${dayName}</span>
                </div>
                <div class="mobile-day-shifts">
                    ${generateMobileDayShifts(day)}
                </div>
            </div>
        `;
    }
    
    return html;
}

function generateMobileDayShifts(day) {
    let html = '';
    
    workers.forEach((worker, workerIndex) => {
        const workerName = workerNames[workerIndex] || worker;
        const shiftKey = `${workerIndex}-${day}`;
        const shift = scheduleData[shiftKey];
        const shiftDisplay = shift ? shift.time : 'Off';
        
        html += `
            <div class="mobile-shift-item" 
                 data-worker="${workerIndex}" 
                 data-day="${day}"
                 onclick="selectMobileCell(this)">
                <div class="mobile-worker-name ${isManager(workerName) ? 'manager' : ''}">${workerName}</div>
                <div class="mobile-shift-time">${shiftDisplay}</div>
            </div>
        `;
    });
    
    return html;
}

function selectMobileCell(cell) {
    // Remove previous selection
    document.querySelectorAll('.mobile-shift-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Select current cell
    cell.classList.add('selected');
    window.selectedMobileCell = cell.querySelector('.mobile-shift-time');
    
    // Show time shortcuts
    document.querySelector('.mobile-shortcuts').classList.add('visible');
}

function updateScheduleFromMobile() {
    // Update the scheduleData from mobile interface
    document.querySelectorAll('.mobile-shift-item').forEach(item => {
        const workerIndex = item.dataset.worker;
        const day = item.dataset.day;
        const timeElement = item.querySelector('.mobile-shift-time');
        const shiftTime = timeElement.textContent;
        
        if (shiftTime && shiftTime !== 'Off') {
            const parsedTime = parseTimeInput(shiftTime);
            scheduleData[`${workerIndex}-${day}`] = parsedTime;
        } else {
            delete scheduleData[`${workerIndex}-${day}`];
        }
    });
    
    // Save state and trigger autosave
    saveState();
    if (autoSaveEnabled) {
        saveToLocalStorage();
        updateAutoSaveStatus('saved');
    }
}

function populateMobileWorkerSelect() {
    const select = document.getElementById('mobileWorkerSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select Worker...</option>';
    workers.forEach((worker, index) => {
        const workerName = workerNames[index] || worker;
        const option = document.createElement('option');
        option.value = index;
        option.textContent = workerName;
        select.appendChild(option);
    });
}

function showMobileModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function hideMobileModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function formatTime(timeInput) {
    const parsed = parseTimeInput(timeInput);
    return parsed ? parsed.time : timeInput;
}

// ========================================
// ADDITIONAL MOBILE FUNCTIONS
// ========================================

function toggleMobileView(viewType) {
    const weekTabs = document.getElementById('mobileWeekTabs');
    const calendar = document.getElementById('mobileCalendar');
    
    if (viewType === 'monthly') {
        weekTabs.style.display = 'none';
        generateMobileMonthView();
    } else {
        weekTabs.style.display = 'flex';
        generateMobileCalendar(1);
    }
}

function generateMobileMonthView() {
    const calendar = document.getElementById('mobileCalendar');
    if (!calendar) return;
    
    calendar.innerHTML = `
        <div class="mobile-month-header">
            <h3>📅 ${monthNames[currentMonth]} ${currentYear}</h3>
        </div>
        <div class="mobile-month-grid">
            ${generateMobileMonthDays()}
        </div>
    `;
}

function generateMobileMonthDays() {
    let html = '<div class="mobile-month-days-header">';
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        html += `<div class="mobile-month-day-name">${day}</div>`;
    });
    html += '</div>';
    
    // Calculate first day of month and add padding days
    const firstDay = getDayOfWeek(1, currentMonth, currentYear);
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="mobile-month-day empty"></div>';
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = getDayOfWeek(day, currentMonth, currentYear);
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const workerCount = getWorkersForDay(day).length;
        
        html += `
            <div class="mobile-month-day ${isWeekend ? 'weekend' : ''}" onclick="showMobileDayDetail(${day})">
                <div class="mobile-day-number">${day}</div>
                <div class="mobile-day-workers">${workerCount} shifts</div>
            </div>
        `;
    }
    
    return html;
}

function getWorkersForDay(day) {
    const workersOnDay = [];
    workers.forEach((worker, index) => {
        const shiftKey = `${index}-${day}`;
        if (scheduleData[shiftKey]) {
            workersOnDay.push({
                worker: workerNames[index] || worker,
                shift: scheduleData[shiftKey]
            });
        }
    });
    return workersOnDay;
}

function showMobileDayDetail(day) {
    const workersOnDay = getWorkersForDay(day);
    const dayName = getDayName(getDayOfWeek(day, currentMonth, currentYear));
    
    let content = `
        <div class="mobile-day-detail-header">
            <h3>${dayName}, ${monthNames[currentMonth]} ${day}</h3>
        </div>
        <div class="mobile-day-shifts">
    `;
    
    if (workersOnDay.length === 0) {
        content += '<div class="mobile-no-shifts">No shifts scheduled</div>';
    } else {
        workersOnDay.forEach(({worker, shift}) => {
            content += `
                <div class="mobile-day-shift-item">
                    <div class="mobile-shift-worker">${worker}</div>
                    <div class="mobile-shift-time">${shift.time}</div>
                </div>
            `;
        });
    }
    
    content += '</div>';
    
    showMobileToast(content, 3000);
}

function openMobileAnalytics() {
    const analytics = calculateAnalytics();
    
    // Create mobile-optimized analytics page
    const analyticsHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Analytics - Scheduler Pro</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 15px; background: #f5f5f5; margin: 0; }
                .container { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .header { text-align: center; margin-bottom: 30px; }
                .stat-card { background: #f8f9fa; border-radius: 6px; padding: 15px; margin-bottom: 15px; }
                .stat-title { font-weight: 600; color: #2c3e50; margin-bottom: 10px; }
                .stat-list { list-style: none; padding: 0; }
                .stat-item { padding: 5px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
                .back-btn { position: fixed; top: 15px; right: 15px; background: #3498db; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; }
            </style>
        </head>
        <body>
            <button class="back-btn" onclick="window.close()">✕ Close</button>
            <div class="container">
                <div class="header">
                    <h1>📊 Analytics Dashboard</h1>
                    <p>Schedule analysis for ${monthNames[currentMonth]} ${currentYear}</p>
                </div>
                
                <div class="stat-card">
                    <div class="stat-title">👥 Worker Hours</div>
                    <ul class="stat-list">
                        ${Object.entries(analytics.workers).map(([worker, data]) => 
                            `<li class="stat-item"><span>${worker}</span><span>${data.totalHours}h</span></li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="stat-card">
                    <div class="stat-title">🔄 Shift Distribution</div>
                    <ul class="stat-list">
                        ${Object.entries(analytics.shiftTypes).map(([type, count]) => 
                            `<li class="stat-item"><span>${type} Shifts</span><span>${count}</span></li>`
                        ).join('')}
                    </ul>
                </div>
            </div>
        </body>
        </html>
    `;
    
    const analyticsWindow = window.open('', '_blank');
    analyticsWindow.document.write(analyticsHtml);
    analyticsWindow.document.close();
}

function openMobileGuide() {
    const guideHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Guide - Scheduler Pro</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 15px; background: #f5f5f5; margin: 0; line-height: 1.6; }
                .container { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .header { text-align: center; margin-bottom: 30px; }
                .section { margin-bottom: 25px; }
                .section h3 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                .feature-list { background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 10px 0; }
                .back-btn { position: fixed; top: 15px; right: 15px; background: #3498db; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; }
            </style>
        </head>
        <body>
            <button class="back-btn" onclick="window.close()">✕ Close</button>
            <div class="container">
                <div class="header">
                    <h1>📖 Mobile User Guide</h1>
                    <p>How to use Scheduler Pro on mobile</p>
                </div>
                
                <div class="section">
                    <h3>📱 Mobile Navigation</h3>
                    <div class="feature-list">
                        <p><strong>Hamburger Menu (☰):</strong> Tap to access all features including themes, settings, export options, and worker management.</p>
                        <p><strong>View Toggle:</strong> Switch between Weekly and Monthly calendar views using the tabs.</p>
                        <p><strong>Week Navigation:</strong> Use Week 1-4 tabs to navigate through the month.</p>
                    </div>
                </div>
                
                <div class="section">
                    <h3>👥 Managing Workers</h3>
                    <div class="feature-list">
                        <p><strong>Add Worker:</strong> Use "Add Worker" in the hamburger menu.</p>
                        <p><strong>Manage Workers:</strong> Edit or remove workers from "Manage Workers" option.</p>
                        <p><strong>Manager Badge:</strong> Add "(m)" after a name to mark as manager.</p>
                    </div>
                </div>
                
                <div class="section">
                    <h3>⏰ Scheduling Shifts</h3>
                    <div class="feature-list">
                        <p><strong>Select Shift:</strong> Tap any worker's shift slot to select it.</p>
                        <p><strong>Quick Times:</strong> Use shortcut buttons (11PM-7AM, 7AM-3PM, etc.)</p>
                        <p><strong>Custom Times:</strong> Type times like "9-5" or "22-06"</p>
                    </div>
                </div>
                
                <div class="section">
                    <h3>📤 Exporting</h3>
                    <div class="feature-list">
                        <p><strong>Print:</strong> Mobile-optimized printing</p>
                        <p><strong>PDF:</strong> Compact PDF export</p>
                        <p><strong>Image:</strong> High-quality image export</p>
                        <p><strong>Data:</strong> JSON backup of schedule data</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
    
    const guideWindow = window.open('', '_blank');
    guideWindow.document.write(guideHtml);
    guideWindow.document.close();
}

function handleMobilePrint() {
    showMobileToast('🖨️ Preparing for print...', 2000);
    setTimeout(() => {
        window.print();
    }, 500);
}

function handleMobileExport(type) {
    showMobileToast('📤 Preparing export...', 2000);
    
    setTimeout(() => {
        switch(type) {
            case 'pdf':
                if (typeof exportCompactPdf === 'function') {
                    exportCompactPdf();
                } else {
                    showMobileToast('❌ PDF export not available', 2000);
                }
                break;
            case 'image':
                if (typeof exportFullImage === 'function') {
                    exportFullImage();
                } else {
                    showMobileToast('❌ Image export not available', 2000);
                }
                break;
            case 'json':
                if (typeof exportScheduleData === 'function') {
                    exportScheduleData();
                } else {
                    exportMobileJSON();
                }
                break;
        }
    }, 500);
}

function exportMobileJSON() {
    const data = {
        scheduleData,
        workerNames,
        workers,
        currentMonth,
        currentYear,
        daysInMonth,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `schedule-${monthNames[currentMonth]}-${currentYear}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showMobileToast('✅ JSON file downloaded!', 2000);
}

function showMobileSaveToast() {
    const status = autoSaveEnabled ? 'Auto-save: ON' : 'Auto-save: OFF';
    showMobileToast(`💾 ${status}`, 2000);
}

function showMobileToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.mobile-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'mobile-toast';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function updateMobileHistoryUI() {
    const undoBtn = document.getElementById('mobileUndoBtn');
    const redoBtn = document.getElementById('mobileRedoBtn');
    
    if (undoBtn) {
        undoBtn.disabled = historyIndex <= 0;
        undoBtn.style.opacity = historyIndex <= 0 ? '0.5' : '1';
    }
    
    if (redoBtn) {
        redoBtn.disabled = historyIndex >= history.length - 1;
        redoBtn.style.opacity = historyIndex >= history.length - 1 ? '0.5' : '1';
    }
}

function updateMobileWorkerList() {
    const workerList = document.getElementById('mobileWorkerList');
    if (!workerList) return;
    
    workerList.innerHTML = '';
    
    workers.forEach((worker, index) => {
        const workerName = workerNames[index] || worker;
        const workerItem = document.createElement('div');
        workerItem.className = 'mobile-worker-item';
        
        workerItem.innerHTML = `
            <div class="mobile-worker-name">${workerName}</div>
            <div class="mobile-worker-actions">
                <button class="mobile-worker-btn" onclick="editMobileWorker(${index})">Edit</button>
                <button class="mobile-worker-btn" onclick="removeMobileWorker(${index})">Remove</button>
            </div>
        `;
        
        workerList.appendChild(workerItem);
    });
}

function editMobileWorker(index) {
    const newName = prompt('Enter new name:', workerNames[index] || workers[index]);
    if (newName && newName.trim()) {
        workerNames[index] = newName.trim();
        updateMobileWorkerList();
        populateMobileWorkerSelect();
        generateMobileCalendar(1);
        showMobileToast(`✅ Updated to ${newName.trim()}`, 2000);
        
        saveState();
        if (autoSaveEnabled) {
            saveToLocalStorage();
        }
    }
}

function removeMobileWorker(index) {
    const workerName = workerNames[index] || workers[index];
    if (confirm(`Remove ${workerName}?`)) {
        // Remove worker's shifts
        Object.keys(scheduleData).forEach(key => {
            if (key.startsWith(`${index}-`)) {
                delete scheduleData[key];
            }
        });
        
        // Remove worker
        workers.splice(index, 1);
        delete workerNames[index];
        
        // Reindex remaining workers
        const newWorkerNames = {};
        Object.keys(workerNames).forEach(oldIndex => {
            const idx = parseInt(oldIndex);
            if (idx > index) {
                newWorkerNames[idx - 1] = workerNames[oldIndex];
            } else if (idx < index) {
                newWorkerNames[idx] = workerNames[oldIndex];
            }
        });
        workerNames = newWorkerNames;
        
        // Reindex schedule data
        const newScheduleData = {};
        Object.keys(scheduleData).forEach(key => {
            const [workerIdx, day] = key.split('-');
            const idx = parseInt(workerIdx);
            if (idx > index) {
                newScheduleData[`${idx - 1}-${day}`] = scheduleData[key];
            } else if (idx < index) {
                newScheduleData[key] = scheduleData[key];
            }
        });
        scheduleData = newScheduleData;
        
        updateMobileWorkerList();
        populateMobileWorkerSelect();
        generateMobileCalendar(1);
        showMobileToast(`❌ Removed ${workerName}`, 2000);
        
        saveState();
        if (autoSaveEnabled) {
            saveToLocalStorage();
        }
    }
}

// Override history functions to update mobile UI
const originalSaveState = saveState;
saveState = function() {
    originalSaveState.call(this);
    if (isMobileDevice) {
        updateMobileHistoryUI();
    }
};

const originalUndo = undo;
undo = function() {
    originalUndo.call(this);
    if (isMobileDevice) {
        generateMobileCalendar(1);
        populateMobileWorkerSelect();
        showMobileToast('↶ Undone', 1500);
    }
};

const originalRedo = redo;
redo = function() {
    originalRedo.call(this);
    if (isMobileDevice) {
        generateMobileCalendar(1);
        populateMobileWorkerSelect();
        showMobileToast('↷ Redone', 1500);
    }
};

console.log('✅ Core app.js loaded successfully!');
