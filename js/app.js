// ========================================
// SECURITY SHIFT SCHEDULER PRO v2.0
// Complete Core Application Logic
// ========================================

console.log('📦 Security Shift Scheduler Pro v2.0 - Loading Core...');

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

console.log('✅ Core app.js loaded successfully!');
