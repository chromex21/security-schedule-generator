// ========================================
// MOBILE DASHBOARD - READ-ONLY SCHEDULE VIEWER
// ========================================

console.log('📱 Loading Mobile Dashboard...');

let mobileScheduleData = null;
let mobileWorkerNames = {};
let mobileCurrentView = 'today';

// Override getMobileLayout for simplified dashboard
function getMobileLayout() {
    return `
        <!-- Mobile Dashboard Header -->
        <div class="mobile-header">
            <div class="mobile-header-content">
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    <span></span><span></span><span></span>
                </button>
                <div class="mobile-title">
                    <h1>🛡️ Schedule Viewer</h1>
                    <p>Quick View Dashboard</p>
                </div>
                <div class="mobile-actions">
                    <button class="mobile-btn" id="mobileSearchBtn" title="Search">🔍</button>
                    <button class="mobile-btn" id="mobileRefreshBtn" title="Refresh">🔄</button>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation Sidebar -->
        <div class="mobile-sidebar" id="mobileSidebar">
            <div class="mobile-sidebar-header">
                <h3>📱 Quick View</h3>
                <button class="mobile-close-btn" id="mobileCloseBtn">&times;</button>
            </div>
            <div class="mobile-nav-items">
                <button class="mobile-nav-item" id="mobileLoadScheduleBtn">
                    <span>📂</span> Load Schedule
                </button>
                <div class="mobile-nav-divider"></div>
                <button class="mobile-nav-item" id="mobileThemeBtn">
                    <span>🎨</span> Themes
                </button>
                <button class="mobile-nav-item" id="mobileViewModeBtn">
                    <span>📅</span> View Mode
                </button>
                <div class="mobile-nav-divider"></div>
                <button class="mobile-nav-item" id="mobileExportBtn">
                    <span>📤</span> Export View
                </button>
                <button class="mobile-nav-item" id="mobileAnalyticsBtn">
                    <span>📊</span> Analytics
                </button>
                <div class="mobile-nav-divider"></div>
                <button class="mobile-nav-item" id="mobileDesktopBtn">
                    <span>💻</span> Edit on Desktop
                </button>
            </div>
        </div>

        <!-- Mobile Content Area -->
        <div class="mobile-content">
            <!-- Mobile Search Bar -->
            <div class="mobile-search-container" id="mobileSearchContainer" style="display: none;">
                <input type="text" class="mobile-search-input" id="mobileSearchInput" placeholder="Search workers or shifts...">
                <button class="mobile-search-clear" id="mobileSearchClear">&times;</button>
            </div>

            <!-- Mobile Schedule Dashboard -->
            <div class="mobile-dashboard" id="mobileDashboard" style="display: none;">
                <!-- Quick Stats -->
                <div class="mobile-stats-row">
                    <div class="mobile-stat-card">
                        <div class="stat-number" id="totalWorkers">0</div>
                        <div class="stat-label">Workers</div>
                    </div>
                    <div class="mobile-stat-card">
                        <div class="stat-number" id="totalShifts">0</div>
                        <div class="stat-label">Shifts</div>
                    </div>
                    <div class="mobile-stat-card">
                        <div class="stat-number" id="todayShifts">0</div>
                        <div class="stat-label">Today</div>
                    </div>
                </div>

                <!-- View Toggle -->
                <div class="mobile-view-toggle">
                    <button class="mobile-view-btn active" data-view="today">📅 Today</button>
                    <button class="mobile-view-btn" data-view="week">📋 This Week</button>
                    <button class="mobile-view-btn" data-view="month">🗓️ Month</button>
                </div>

                <!-- Schedule Content -->
                <div class="mobile-schedule-content" id="mobileScheduleContent">
                    <!-- Content will be dynamically generated -->
                </div>
            </div>

            <!-- Mobile Load Prompt -->
            <div class="mobile-load-prompt" id="mobileLoadPrompt">
                <div class="load-prompt-content">
                    <div class="load-prompt-icon">📂</div>
                    <h3>No Schedule Loaded</h3>
                    <p>Load a schedule file to view shifts and assignments</p>
                    <button class="load-prompt-btn" onclick="document.getElementById('mobileFileInput').click()">
                        📂 Load Schedule File
                    </button>
                    <input type="file" id="mobileFileInput" accept=".json" style="display: none;">
                    <div class="load-prompt-sample">
                        <button class="sample-btn" id="loadSampleBtn">
                            🎯 Load Sample Schedule
                        </button>
                    </div>
                    <div class="load-prompt-help">
                        <small>💡 Tip: Create schedules on desktop for full editing</small>
                    </div>
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

            <!-- View Mode Modal -->
            <div class="mobile-modal" id="mobileViewModeModal">
                <div class="mobile-modal-content">
                    <div class="mobile-modal-header">
                        <h3>📅 View Mode</h3>
                        <button class="mobile-modal-close" data-modal="mobileViewModeModal">&times;</button>
                    </div>
                    <div class="mobile-view-options">
                        <button class="mobile-view-option" data-view="today">
                            <span>📅</span>
                            <div>
                                <strong>Today's Schedule</strong>
                                <p>Current day shifts only</p>
                            </div>
                        </button>
                        <button class="mobile-view-option" data-view="week">
                            <span>📋</span>
                            <div>
                                <strong>Weekly View</strong>
                                <p>7-day schedule overview</p>
                            </div>
                        </button>
                        <button class="mobile-view-option" data-view="month">
                            <span>🗓️</span>
                            <div>
                                <strong>Monthly View</strong>
                                <p>Full month calendar</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Export Modal -->
            <div class="mobile-modal" id="mobileExportModal">
                <div class="mobile-modal-content">
                    <div class="mobile-modal-header">
                        <h3>📤 Export View</h3>
                        <button class="mobile-modal-close" data-modal="mobileExportModal">&times;</button>
                    </div>
                    <div class="mobile-export-options">
                        <button class="mobile-export-btn" id="mobileShareBtn">📱 Share</button>
                        <button class="mobile-export-btn" id="mobilePrintViewBtn">🖨️ Print</button>
                        <button class="mobile-export-btn" id="mobileImageViewBtn">🖼️ Save Image</button>
                        <button class="mobile-export-btn" id="mobileEmailBtn">✉️ Email</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Mobile Dashboard Functions
function initMobileDashboard() {
    console.log('🚀 Initializing Mobile Dashboard...');
    
    // Load sample data from JSON
    loadSampleSchedule();
    
    // Set up event listeners
    setupMobileDashboardEventListeners();
}

function setupMobileDashboardEventListeners() {
    // Menu toggle
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
    
    // Search functionality
    const searchBtn = document.getElementById('mobileSearchBtn');
    const searchContainer = document.getElementById('mobileSearchContainer');
    const searchInput = document.getElementById('mobileSearchInput');
    const searchClear = document.getElementById('mobileSearchClear');
    
    if (searchBtn && searchContainer) {
        searchBtn.addEventListener('click', () => {
            searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
            if (searchContainer.style.display === 'block') {
                searchInput.focus();
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterScheduleContent(e.target.value);
        });
    }
    
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            filterScheduleContent('');
            searchContainer.style.display = 'none';
        });
    }
    
    // View toggle buttons
    document.querySelectorAll('.mobile-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mobile-view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            mobileCurrentView = btn.dataset.view;
            generateMobileScheduleView();
        });
    });
    
    // Navigation items
    const navActions = {
        'mobileLoadScheduleBtn': () => document.getElementById('mobileFileInput').click(),
        'mobileThemeBtn': () => showMobileModal('mobileThemeModal'),
        'mobileViewModeBtn': () => showMobileModal('mobileViewModeModal'),
        'mobileExportBtn': () => showMobileModal('mobileExportModal'),
        'mobileAnalyticsBtn': () => showMobileAnalytics(),
        'mobileDesktopBtn': () => showDesktopMessage()
    };
    
    Object.keys(navActions).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                navActions[btnId]();
                sidebar.classList.remove('open');
            });
        }
    });
    
    // File input
    const fileInput = document.getElementById('mobileFileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileLoad);
    }
    
    // Sample button
    const sampleBtn = document.getElementById('loadSampleBtn');
    if (sampleBtn) {
        sampleBtn.addEventListener('click', loadSampleSchedule);
    }
    
    // Theme selection
    document.querySelectorAll('.mobile-theme-card').forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.dataset.theme;
            applyTheme(theme);
            hideMobileModal('mobileThemeModal');
        });
    });
    
    // Modal close buttons
    document.querySelectorAll('.mobile-modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modalId = closeBtn.dataset.modal;
            hideMobileModal(modalId);
        });
    });
}

function loadSampleSchedule() {
    // Use the JSON data provided in the attachment
    const sampleData = {
        "month": 10,
        "year": 2025,
        "workerNames": {
            "0": "Bernadette (M)",
            "1": "Osborne",
            "2": "Iran", 
            "3": "Jerome",
            "4": "Kerral"
        },
        "scheduleData": {
            // Sample of the data structure - in real implementation, include full data
            "0": {
                "1": {"time": "10AM-6PM", "type": "day"},
                "2": {"time": "7AM-3PM", "type": "day"},
                "3": {"time": "10AM-6PM", "type": "day"}
            }
        },
        "daysInMonth": 30
    };
    
    processMobileScheduleData(sampleData);
}

function handleFileLoad(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                processMobileScheduleData(data);
                showMobileToast('✅ Schedule loaded successfully!', 2000);
            } catch (error) {
                showMobileToast('❌ Invalid schedule file', 2000);
            }
        };
        reader.readAsText(file);
    }
}

function processMobileScheduleData(data) {
    mobileScheduleData = data.scheduleData;
    mobileWorkerNames = data.workerNames;
    currentMonth = data.month;
    currentYear = data.year;
    daysInMonth = data.daysInMonth;
    
    // Show dashboard and hide load prompt
    document.getElementById('mobileLoadPrompt').style.display = 'none';
    document.getElementById('mobileDashboard').style.display = 'block';
    
    // Update header
    const title = document.querySelector('.mobile-title p');
    if (title) {
        title.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    // Generate initial view
    updateMobileStats();
    generateMobileScheduleView();
}

function updateMobileStats() {
    const workerCount = Object.keys(mobileWorkerNames).length;
    const totalShifts = Object.values(mobileScheduleData).reduce((total, worker) => {
        return total + Object.keys(worker).length;
    }, 0);
    
    // Calculate today's shifts (using day 1 as example)
    const todayShifts = Object.values(mobileScheduleData).filter(worker => worker['1']).length;
    
    document.getElementById('totalWorkers').textContent = workerCount;
    document.getElementById('totalShifts').textContent = totalShifts;
    document.getElementById('todayShifts').textContent = todayShifts;
}

function generateMobileScheduleView() {
    const content = document.getElementById('mobileScheduleContent');
    if (!content || !mobileScheduleData) return;
    
    switch (mobileCurrentView) {
        case 'today':
            content.innerHTML = generateTodayView();
            break;
        case 'week':
            content.innerHTML = generateWeekView();
            break;
        case 'month':
            content.innerHTML = generateMonthView();
            break;
    }
}

function generateTodayView() {
    const today = new Date().getDate();
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
    
    let html = `
        <div class="mobile-today-header">
            <h3>📅 Today - ${dayName}, ${monthNames[currentMonth]} ${today}</h3>
        </div>
        <div class="mobile-today-shifts">
    `;
    
    Object.keys(mobileWorkerNames).forEach(workerIndex => {
        const workerName = mobileWorkerNames[workerIndex];
        const shift = mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][today];
        
        html += `
            <div class="mobile-shift-card">
                <div class="shift-worker">
                    <span class="worker-name ${workerName.includes('(M)') ? 'manager' : ''}">${workerName}</span>
                </div>
                <div class="shift-time ${shift ? shift.type : 'off'}">
                    ${shift ? shift.time : 'Day Off'}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

function generateWeekView() {
    const today = new Date().getDate();
    const startOfWeek = Math.max(1, today - 3);
    const endOfWeek = Math.min(daysInMonth, startOfWeek + 6);
    
    let html = `
        <div class="mobile-week-header">
            <h3>📋 This Week (Days ${startOfWeek}-${endOfWeek})</h3>
        </div>
        <div class="mobile-week-grid">
    `;
    
    for (let day = startOfWeek; day <= endOfWeek; day++) {
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(currentYear, currentMonth, day).getDay()];
        
        html += `
            <div class="mobile-day-column">
                <div class="mobile-day-header">
                    <span class="day-number">${day}</span>
                    <span class="day-name">${dayName}</span>
                </div>
                <div class="mobile-day-shifts">
        `;
        
        Object.keys(mobileWorkerNames).forEach(workerIndex => {
            const workerName = mobileWorkerNames[workerIndex].split(' ')[0]; // First name only
            const shift = mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][day];
            
            html += `
                <div class="mobile-mini-shift ${shift ? shift.type : 'off'}">
                    <div class="mini-worker">${workerName}</div>
                    <div class="mini-time">${shift ? shift.time.split('-')[0] : 'OFF'}</div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

function generateMonthView() {
    let html = `
        <div class="mobile-month-header">
            <h3>🗓️ ${monthNames[currentMonth]} ${currentYear}</h3>
        </div>
        <div class="mobile-month-calendar">
    `;
    
    // Calendar grid
    for (let day = 1; day <= daysInMonth; day++) {
        const shiftCount = Object.keys(mobileWorkerNames).reduce((count, workerIndex) => {
            return count + (mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][day] ? 1 : 0);
        }, 0);
        
        html += `
            <div class="mobile-calendar-day" onclick="showMobileDayDetail(${day})">
                <div class="calendar-day-number">${day}</div>
                <div class="calendar-day-count">${shiftCount}</div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

function showMobileDayDetail(day) {
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(currentYear, currentMonth, day - 1).getDay()];
    
    let content = `
        <div class="mobile-day-detail">
            <h4>${dayName}, ${monthNames[currentMonth]} ${day}</h4>
            <div class="day-detail-shifts">
    `;
    
    Object.keys(mobileWorkerNames).forEach(workerIndex => {
        const workerName = mobileWorkerNames[workerIndex];
        const shift = mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][day];
        
        if (shift) {
            content += `
                <div class="detail-shift-item">
                    <span class="detail-worker">${workerName}</span>
                    <span class="detail-time ${shift.type}">${shift.time}</span>
                </div>
            `;
        }
    });
    
    content += '</div></div>';
    
    showMobileToast(content, 4000);
}

function filterScheduleContent(searchTerm) {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
}

function showDesktopMessage() {
    showMobileToast('💻 For full editing capabilities, please use the desktop version of this application.', 3000);
}

function showMobileAnalytics() {
    // Simple mobile analytics
    const totalWorkers = Object.keys(mobileWorkerNames).length;
    const totalShifts = Object.values(mobileScheduleData).reduce((total, worker) => {
        return total + Object.keys(worker).length;
    }, 0);
    
    showMobileToast(`📊 Analytics: ${totalWorkers} workers, ${totalShifts} total shifts this month`, 3000);
}

console.log('✅ Mobile Dashboard loaded successfully!');