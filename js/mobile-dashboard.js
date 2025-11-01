// ========================================
// MOBILE DASHBOARD - READ-ONLY SCHEDULE VIEWER
// ========================================

console.log('📱 Loading Mobile Dashboard...');

let mobileScheduleData = null;
let mobileWorkerNames = {};
let mobileCurrentView = 'today';
let currentSearchTerm = ''; // Store current search term

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
                <button class="mobile-nav-item" id="mobileExportBtn">
                    <span>📤</span> Share
                </button>
                <div class="mobile-nav-divider"></div>
                <button class="mobile-nav-item" id="mobileAnalyticsBtn">
                    <span>📊</span> Analytics
                </button>
                <div class="mobile-nav-divider"></div>
                <button class="mobile-nav-item desktop-promo" id="mobileDesktopBtn">
                    <span>💻</span> Full Editor (Desktop)
                </button>
            </div>
        </div>

        <!-- Mobile Content Area -->
        <div class="mobile-content">
            <!-- Desktop Promotion Banner -->
            <div class="mobile-desktop-banner" id="mobileDesktopBanner">
                <div class="banner-content">
                    <div class="banner-icon">💻</div>
                    <div class="banner-text">
                        <strong>Want to create or edit schedules?</strong>
                        <p>Use the full desktop version for complete editing features</p>
                    </div>
                    <div class="banner-actions">
                        <button class="banner-btn" id="bannerLearnBtn">Learn More</button>
                        <button class="banner-close" id="bannerCloseBtn">&times;</button>
                    </div>
                </div>
            </div>

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



            <!-- Share Modal -->
            <div class="mobile-modal" id="mobileExportModal">
                <div class="mobile-modal-content">
                    <div class="mobile-modal-header">
                        <h3>📤 Share Schedule</h3>
                        <button class="mobile-modal-close" data-modal="mobileExportModal">&times;</button>
                    </div>
                    <div class="mobile-share-content">
                        <p class="share-description">Share your current schedule view with others</p>
                        <div class="share-options-container">
                            <button class="mobile-share-main-btn" id="mobileShareBtn" onclick="handleMobileShare(); hideMobileModal('mobileExportModal');">
                                <span class="share-icon">📤</span>
                                <span class="share-text">Share Schedule</span>
                                <span class="share-subtitle">Tap to share URL link</span>
                            </button>
                            <div class="share-alternatives">
                                <button class="share-alt-btn" onclick="copyScheduleLink()">
                                    <span>📋</span> Copy Link
                                </button>
                                <button class="share-alt-btn" onclick="shareToWhatsApp()">
                                    <span>📱</span> WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Mobile Dashboard Functions
function initMobileDashboard() {
    console.log('🚀 Initializing Mobile Dashboard...');
    
    // Try to load existing schedule data first
    if (tryLoadExistingScheduleData()) {
        console.log('📂 Loaded existing schedule data');
    } else {
        // Check local storage for previously saved schedule
        const savedSchedule = loadFromLocalStorage();
        if (savedSchedule) {
            processMobileScheduleData(savedSchedule);
            console.log('💾 Loaded schedule from local storage');
        } else {
            // Finally, load sample data as fallback
            loadSampleSchedule();
            console.log('📄 Loaded sample schedule data');
        }
    }
    
    // Set up event listeners
    setupMobileDashboardEventListeners();
}

function setupMobileDashboardEventListeners() {
    console.log('🔧 Setting up mobile dashboard event listeners...');
    
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
    const refreshBtn = document.getElementById('mobileRefreshBtn');
    
    if (searchBtn && searchContainer) {
        searchBtn.addEventListener('click', () => {
            searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
            if (searchContainer.style.display === 'block') {
                searchInput.focus();
            }
        });
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            showMobileToast('🔄 Refreshing schedule data...', 1000);
            // Try to reload existing data or refresh from storage
            setTimeout(() => {
                if (tryLoadExistingScheduleData()) {
                    showMobileToast('✅ Schedule refreshed from main app!', 2000);
                } else {
                    updateMobileStats();
                    generateMobileScheduleView();
                    showMobileToast('✅ Schedule view refreshed!', 2000);
                }
            }, 500);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            console.log('🔍 Search input event triggered:', e.target.value);
            currentSearchTerm = e.target.value; // Store the search term
            filterScheduleContent(e.target.value);
        });
    } else {
        console.log('❌ Search input element not found');
    }
    
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchTerm = ''; // Clear stored search term
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
            
            // Reapply current search filter after view change
            if (currentSearchTerm) {
                setTimeout(() => {
                    filterScheduleContent(currentSearchTerm);
                }, 100); // Small delay to let the new view render
            }
        });
    });
    
    // Navigation items
    const navActions = {
        'mobileLoadScheduleBtn': () => document.getElementById('mobileFileInput').click(),
        'mobileThemeBtn': () => showMobileModal('mobileThemeModal'),
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
    
    // Desktop promotion banner
    const bannerCloseBtn = document.getElementById('bannerCloseBtn');
    const bannerLearnBtn = document.getElementById('bannerLearnBtn');
    const desktopBanner = document.getElementById('mobileDesktopBanner');
    
    if (bannerCloseBtn && desktopBanner) {
        bannerCloseBtn.addEventListener('click', () => {
            desktopBanner.style.display = 'none';
            // Save preference to not show banner again this session
            sessionStorage.setItem('hideBanner', 'true');
        });
    }
    
    if (bannerLearnBtn) {
        bannerLearnBtn.addEventListener('click', () => {
            showDesktopMessage();
        });
    }
    
    // Check if banner should be hidden
    if (sessionStorage.getItem('hideBanner') === 'true') {
        if (desktopBanner) desktopBanner.style.display = 'none';
    }
    
    // Export/Share button event listeners
    const shareBtn = document.getElementById('mobileShareBtn');
    const printBtn = document.getElementById('mobilePrintViewBtn');
    const imageBtn = document.getElementById('mobileImageViewBtn');
    const emailBtn = document.getElementById('mobileEmailBtn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            console.log('📱 Share button clicked');
            handleMobileShare();
            hideMobileModal('mobileExportModal');
        });
    } else {
        console.log('❌ Share button element not found');
    }
    
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            handleMobilePrint();
            hideMobileModal('mobileExportModal');
        });
    }
    
    if (imageBtn) {
        imageBtn.addEventListener('click', () => {
            handleMobileImageSave();
            hideMobileModal('mobileExportModal');
        });
    }
    
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            handleMobileEmail();
            hideMobileModal('mobileExportModal');
        });
    }
}

function tryLoadExistingScheduleData() {
    // Try to access main app's schedule data if available
    try {
        if (typeof scheduleData !== 'undefined' && 
            typeof workerNames !== 'undefined' && 
            Object.keys(scheduleData).length > 0) {
            
            const existingData = {
                month: currentMonth || new Date().getMonth(),
                year: currentYear || new Date().getFullYear(),
                workerNames: workerNames,
                scheduleData: scheduleData,
                daysInMonth: daysInMonth || new Date(currentYear, currentMonth + 1, 0).getDate()
            };
            
            processMobileScheduleData(existingData);
            return true;
        }
    } catch (error) {
        console.log('No existing schedule data found in main app');
    }
    return false;
}

function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('mobileScheduleData');
        if (savedData) {
            return JSON.parse(savedData);
        }
    } catch (error) {
        console.log('No valid schedule data in local storage');
    }
    return null;
}

function saveToLocalStorage(data) {
    try {
        localStorage.setItem('mobileScheduleData', JSON.stringify(data));
        console.log('💾 Schedule data saved to local storage');
    } catch (error) {
        console.log('Failed to save schedule data to local storage');
    }
}

function loadSampleSchedule() {
    // Use the current month/year for more realistic sample data
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    
    // Enhanced sample data with more realistic schedule entries
    const sampleData = {
        "month": month,
        "year": year,
        "workerNames": {
            "0": "Bernadette (M)",
            "1": "Osborne",
            "2": "Iran", 
            "3": "Jerome",
            "4": "Kerral"
        },
        "scheduleData": {
            "0": { // Bernadette (Manager)
                "1": {"time": "9AM-5PM", "type": "day"},
                "3": {"time": "9AM-5PM", "type": "day"},
                "5": {"time": "9AM-5PM", "type": "day"},
                "8": {"time": "10AM-6PM", "type": "day"},
                "10": {"time": "9AM-5PM", "type": "day"},
                "12": {"time": "9AM-5PM", "type": "day"},
                "15": {"time": "10AM-6PM", "type": "day"},
                "17": {"time": "9AM-5PM", "type": "day"},
                "19": {"time": "9AM-5PM", "type": "day"},
                "22": {"time": "10AM-6PM", "type": "day"},
                "24": {"time": "9AM-5PM", "type": "day"},
                "26": {"time": "9AM-5PM", "type": "day"}
            },
            "1": { // Osborne
                "2": {"time": "11PM-7AM", "type": "night"},
                "4": {"time": "11PM-7AM", "type": "night"},
                "6": {"time": "3PM-11PM", "type": "day"},
                "9": {"time": "11PM-7AM", "type": "night"},
                "11": {"time": "11PM-7AM", "type": "night"},
                "13": {"time": "3PM-11PM", "type": "day"},
                "16": {"time": "11PM-7AM", "type": "night"},
                "18": {"time": "11PM-7AM", "type": "night"},
                "20": {"time": "3PM-11PM", "type": "day"},
                "23": {"time": "11PM-7AM", "type": "night"},
                "25": {"time": "11PM-7AM", "type": "night"},
                "27": {"time": "3PM-11PM", "type": "day"}
            },
            "2": { // Iran
                "1": {"time": "7AM-3PM", "type": "day"},
                "4": {"time": "7AM-3PM", "type": "day"},
                "7": {"time": "7AM-3PM", "type": "day"},
                "10": {"time": "7AM-3PM", "type": "day"},
                "13": {"time": "7AM-3PM", "type": "day"},
                "16": {"time": "7AM-3PM", "type": "day"},
                "19": {"time": "7AM-3PM", "type": "day"},
                "22": {"time": "7AM-3PM", "type": "day"},
                "25": {"time": "7AM-3PM", "type": "day"},
                "28": {"time": "7AM-3PM", "type": "day"}
            },
            "3": { // Jerome
                "3": {"time": "3PM-11PM", "type": "day"},
                "5": {"time": "11PM-7AM", "type": "night"},
                "8": {"time": "3PM-11PM", "type": "day"},
                "12": {"time": "3PM-11PM", "type": "day"},
                "14": {"time": "11PM-7AM", "type": "night"},
                "17": {"time": "3PM-11PM", "type": "day"},
                "21": {"time": "3PM-11PM", "type": "day"},
                "23": {"time": "11PM-7AM", "type": "night"},
                "26": {"time": "3PM-11PM", "type": "day"}
            },
            "4": { // Kerral
                "2": {"time": "7AM-3PM", "type": "day"},
                "6": {"time": "11PM-7AM", "type": "night"},
                "9": {"time": "7AM-3PM", "type": "day"},
                "11": {"time": "7AM-3PM", "type": "day"},
                "15": {"time": "11PM-7AM", "type": "night"},
                "18": {"time": "7AM-3PM", "type": "day"},
                "20": {"time": "11PM-7AM", "type": "night"},
                "24": {"time": "7AM-3PM", "type": "day"},
                "27": {"time": "11PM-7AM", "type": "night"}
            }
        },
        "daysInMonth": daysInCurrentMonth
    };
    
    processMobileScheduleData(sampleData);
    
    // Save sample data for future auto-loading
    saveToLocalStorage(sampleData);
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
    
    // Save to local storage for future auto-loading
    saveToLocalStorage(data);
    
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
    
    // Show success message
    showMobileToast('✅ Schedule data loaded successfully!', 2000);
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
    
    // Reapply search filter if there's an active search
    if (currentSearchTerm) {
        setTimeout(() => {
            filterScheduleContent(currentSearchTerm);
        }, 50);
    }
}

function generateTodayView() {
    const today = new Date().getDate();
    const dayOfWeek = new Date().getDay();
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    
    // Count active shifts for today
    const activeShifts = Object.keys(mobileWorkerNames).filter(workerIndex => 
        mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][today]
    ).length;
    
    let html = `
        <div class="mobile-today-header">
            <div class="today-date">
                <h3>📅 ${dayName}</h3>
                <p class="today-full-date">${monthNames[currentMonth]} ${today}, ${currentYear}</p>
            </div>
            <div class="today-summary">
                <div class="summary-card">
                    <span class="summary-number">${activeShifts}</span>
                    <span class="summary-label">Active</span>
                </div>
                <div class="summary-card">
                    <span class="summary-number">${Object.keys(mobileWorkerNames).length - activeShifts}</span>
                    <span class="summary-label">Off</span>
                </div>
            </div>
        </div>
        <div class="mobile-today-shifts">
    `;
    
    // Sort workers: active shifts first, then by name
    const sortedWorkers = Object.keys(mobileWorkerNames).sort((a, b) => {
        const shiftA = mobileScheduleData[a] && mobileScheduleData[a][today];
        const shiftB = mobileScheduleData[b] && mobileScheduleData[b][today];
        
        if (shiftA && !shiftB) return -1;
        if (!shiftA && shiftB) return 1;
        
        return mobileWorkerNames[a].localeCompare(mobileWorkerNames[b]);
    });
    
    sortedWorkers.forEach(workerIndex => {
        const workerName = mobileWorkerNames[workerIndex];
        const shift = mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][today];
        const isManager = workerName.includes('(M)');
        
        html += `
            <div class="mobile-shift-card enhanced ${shift ? 'active' : 'off'}">
                <div class="shift-worker-info">
                    <div class="worker-avatar ${isManager ? 'manager' : 'worker'}">
                        ${isManager ? '👨‍💼' : '👤'}
                    </div>
                    <div class="worker-details">
                        <span class="worker-name ${isManager ? 'manager' : ''}">${workerName}</span>
                        <span class="worker-role">${isManager ? 'Manager' : 'Security Officer'}</span>
                    </div>
                </div>
                <div class="shift-schedule">
                    ${shift ? `
                        <div class="shift-time ${shift.type}">
                            <span class="time-display">${shift.time}</span>
                            <span class="shift-type-badge ${shift.type}">${shift.type === 'day' ? '☀️ Day' : '🌙 Night'}</span>
                        </div>
                    ` : `
                        <div class="shift-off">
                            <span class="off-display">Day Off</span>
                            <span class="off-badge">💤 Rest</span>
                        </div>
                    `}
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
            <h3>📋 Week Overview</h3>
            <p class="week-range">${monthNames[currentMonth]} ${startOfWeek}-${endOfWeek}, ${currentYear}</p>
        </div>
        <div class="mobile-week-scroll">
            <div class="mobile-week-grid">
    `;
    
    for (let day = startOfWeek; day <= endOfWeek; day++) {
        const dayDate = new Date(currentYear, currentMonth, day - 1);
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayDate.getDay()];
        const isToday = day === today;
        
        // Count shifts for this day
        const shiftCount = Object.keys(mobileWorkerNames).reduce((count, workerIndex) => {
            return count + (mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][day] ? 1 : 0);
        }, 0);
        
        html += `
            <div class="mobile-day-column ${isToday ? 'today' : ''}">
                <div class="mobile-day-header enhanced">
                    <div class="day-number ${isToday ? 'today' : ''}">${day}</div>
                    <div class="day-info">
                        <span class="day-name">${dayName}</span>
                        <span class="day-shifts">${shiftCount} shifts</span>
                    </div>
                </div>
                <div class="mobile-day-shifts enhanced">
        `;
        
        Object.keys(mobileWorkerNames).forEach(workerIndex => {
            const workerName = mobileWorkerNames[workerIndex];
            const firstName = workerName.split(' ')[0];
            const shift = mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][day];
            const isManager = workerName.includes('(M)');
            
            html += `
                <div class="mobile-mini-shift enhanced ${shift ? shift.type : 'off'} ${isManager ? 'manager' : ''}" 
                     title="${workerName}${shift ? ': ' + shift.time : ': Day Off'}">
                    <div class="mini-worker-info">
                        <span class="mini-avatar">${isManager ? '👨‍💼' : '👤'}</span>
                        <span class="mini-name">${firstName}</span>
                    </div>
                    <div class="mini-schedule">
                        ${shift ? `
                            <span class="mini-time">${shift.time.split('-')[0]}</span>
                            <span class="mini-badge ${shift.type}">${shift.type === 'day' ? '☀️' : '🌙'}</span>
                        ` : `
                            <span class="mini-off">OFF</span>
                        `}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    return html;
}

function generateMonthView() {
    let html = `
        <div class="mobile-month-header">
            <h3>🗓️ ${monthNames[currentMonth]} ${currentYear}</h3>
            <p class="month-subtitle">Tap any day for details</p>
        </div>
        <div class="mobile-month-list">
    `;
    
    // Generate day-by-day list instead of compact grid
    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = new Date(currentYear, currentMonth, day - 1).getDay();
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
        
        // Get shifts for this day
        const dayShifts = [];
        Object.keys(mobileWorkerNames).forEach(workerIndex => {
            const shift = mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][day];
            if (shift) {
                dayShifts.push({
                    worker: mobileWorkerNames[workerIndex],
                    time: shift.time,
                    type: shift.type
                });
            }
        });
        
        const isToday = day === new Date().getDate();
        const hasShifts = dayShifts.length > 0;
        
        html += `
            <div class="mobile-month-day-item ${isToday ? 'today' : ''}" onclick="showMobileDayDetail(${day})">
                <div class="month-day-header">
                    <div class="month-day-number">
                        <span class="day-num">${day}</span>
                        <span class="day-name">${dayName}</span>
                    </div>
                    <div class="month-day-status ${hasShifts ? 'has-shifts' : 'no-shifts'}">
                        ${hasShifts ? `${dayShifts.length} shifts` : 'No shifts'}
                    </div>
                </div>
                
                ${hasShifts ? `
                <div class="month-day-preview">
                    ${dayShifts.slice(0, 2).map(shift => `
                        <div class="preview-shift ${shift.type}">
                            <span class="preview-worker">${shift.worker.split(' ')[0]}</span>
                            <span class="preview-time">${shift.time}</span>
                        </div>
                    `).join('')}
                    ${dayShifts.length > 2 ? `
                        <div class="preview-more">+${dayShifts.length - 2} more</div>
                    ` : ''}
                </div>
                ` : `
                <div class="month-day-empty">
                    <span class="empty-text">Day off for all workers</span>
                </div>
                `}
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
    if (!searchTerm || searchTerm.trim() === '') {
        // Show all content if search is empty
        showAllScheduleContent();
        return;
    }
    
    const searchLower = searchTerm.toLowerCase().trim();
    console.log('🔍 Searching for:', searchLower);
    
    // Filter based on current view
    switch (mobileCurrentView) {
        case 'today':
            filterTodayView(searchLower);
            break;
        case 'week':
            filterWeekView(searchLower);
            break;
        case 'month':
            filterMonthView(searchLower);
            break;
    }
}

function showAllScheduleContent() {
    // Remove any existing search highlights and show all items
    document.querySelectorAll('.mobile-shift-card, .mobile-day-column, .mobile-month-day-item').forEach(item => {
        item.style.display = '';
        item.classList.remove('search-highlighted', 'search-hidden');
    });
}

function filterTodayView(searchTerm) {
    const shiftCards = document.querySelectorAll('.mobile-shift-card');
    let foundCount = 0;
    
    shiftCards.forEach(card => {
        const workerName = card.querySelector('.worker-name');
        const shiftTime = card.querySelector('.time-display, .off-display');
        
        const workerText = workerName ? workerName.textContent.toLowerCase() : '';
        const timeText = shiftTime ? shiftTime.textContent.toLowerCase() : '';
        
        const matches = workerText.includes(searchTerm) || 
                       timeText.includes(searchTerm) ||
                       (searchTerm === 'off' && card.classList.contains('off')) ||
                       (searchTerm === 'active' && card.classList.contains('active'));
        
        if (matches) {
            card.style.display = '';
            card.classList.add('search-highlighted');
            card.classList.remove('search-hidden');
            foundCount++;
        } else {
            card.style.display = 'none';
            card.classList.add('search-hidden');
            card.classList.remove('search-highlighted');
        }
    });
    
    showMobileToast(`🔍 Found ${foundCount} matching shifts`, 2000);
}

function filterWeekView(searchTerm) {
    const dayColumns = document.querySelectorAll('.mobile-day-column');
    let foundCount = 0;
    
    dayColumns.forEach(column => {
        const miniShifts = column.querySelectorAll('.mobile-mini-shift');
        let dayHasMatch = false;
        
        miniShifts.forEach(shift => {
            const workerName = shift.querySelector('.mini-name');
            const shiftTime = shift.querySelector('.mini-time, .mini-off');
            
            const workerText = workerName ? workerName.textContent.toLowerCase() : '';
            const timeText = shiftTime ? shiftTime.textContent.toLowerCase() : '';
            
            const matches = workerText.includes(searchTerm) || 
                           timeText.includes(searchTerm) ||
                           (searchTerm === 'off' && shift.classList.contains('off'));
            
            if (matches) {
                shift.classList.add('search-highlighted');
                shift.classList.remove('search-hidden');
                dayHasMatch = true;
                foundCount++;
            } else {
                shift.classList.add('search-hidden');
                shift.classList.remove('search-highlighted');
            }
        });
        
        // Show/hide entire day column based on matches
        if (dayHasMatch) {
            column.style.display = '';
        } else {
            column.style.opacity = '0.3';
        }
    });
    
    showMobileToast(`🔍 Found ${foundCount} matching shifts this week`, 2000);
}

function filterMonthView(searchTerm) {
    const dayItems = document.querySelectorAll('.mobile-month-day-item');
    let foundCount = 0;
    
    dayItems.forEach(dayItem => {
        const previewShifts = dayItem.querySelectorAll('.preview-shift');
        let dayHasMatch = false;
        
        // Check day number/name
        const dayNum = dayItem.querySelector('.day-num');
        const dayName = dayItem.querySelector('.day-name');
        const dayText = ((dayNum ? dayNum.textContent : '') + ' ' + (dayName ? dayName.textContent : '')).toLowerCase();
        
        if (dayText.includes(searchTerm)) {
            dayHasMatch = true;
        }
        
        // Check shift previews
        previewShifts.forEach(shift => {
            const workerName = shift.querySelector('.preview-worker');
            const shiftTime = shift.querySelector('.preview-time');
            
            const workerText = workerName ? workerName.textContent.toLowerCase() : '';
            const timeText = shiftTime ? shiftTime.textContent.toLowerCase() : '';
            
            if (workerText.includes(searchTerm) || timeText.includes(searchTerm)) {
                dayHasMatch = true;
                shift.classList.add('search-highlighted');
            }
        });
        
        // Check for "no shifts" days
        const emptyText = dayItem.querySelector('.empty-text');
        if (emptyText && (searchTerm === 'off' || searchTerm === 'no shifts' || searchTerm === 'empty')) {
            dayHasMatch = true;
        }
        
        if (dayHasMatch) {
            dayItem.style.display = '';
            dayItem.classList.add('search-highlighted');
            foundCount++;
        } else {
            dayItem.style.opacity = '0.3';
            dayItem.classList.add('search-hidden');
        }
    });
    
    showMobileToast(`🔍 Found ${foundCount} matching days`, 2000);
}

function showDesktopMessage() {
    const desktopMessage = `
        <div class="desktop-promotion-message">
            <div class="promo-header">
                <h4>💻 Desktop Editor</h4>
            </div>
            <div class="promo-content">
                <p><strong>Create & Edit schedules with full features:</strong></p>
                <ul>
                    <li>✏️ Drag & drop scheduling</li>
                    <li>📊 Advanced analytics</li>
                    <li>📤 Export to multiple formats</li>
                    <li>👥 Manage worker profiles</li>
                    <li>🎯 Auto-scheduling tools</li>
                </ul>
                <p><small>📱 This mobile view is read-only for quick schedule checking</small></p>
            </div>
        </div>
    `;
    
    showMobileToast(desktopMessage, 5000);
}

function showMobileAnalytics() {
    if (!mobileScheduleData || !mobileWorkerNames) {
        showMobileToast('📊 No schedule data loaded for analytics', 2000);
        return;
    }
    
    // Calculate comprehensive analytics
    const totalWorkers = Object.keys(mobileWorkerNames).length;
    const totalShifts = Object.values(mobileScheduleData).reduce((total, worker) => {
        return total + Object.keys(worker).length;
    }, 0);
    
    // Calculate shift type distribution
    let dayShifts = 0;
    let nightShifts = 0;
    Object.values(mobileScheduleData).forEach(worker => {
        Object.values(worker).forEach(shift => {
            if (shift.type === 'day') dayShifts++;
            else if (shift.type === 'night') nightShifts++;
        });
    });
    
    // Calculate busiest day
    const dayShiftCounts = {};
    for (let day = 1; day <= daysInMonth; day++) {
        let count = 0;
        Object.values(mobileScheduleData).forEach(worker => {
            if (worker[day]) count++;
        });
        dayShiftCounts[day] = count;
    }
    
    const busiestDay = Object.keys(dayShiftCounts).reduce((a, b) => 
        dayShiftCounts[a] > dayShiftCounts[b] ? a : b
    );
    
    // Calculate worker with most shifts
    const workerShiftCounts = {};
    Object.keys(mobileWorkerNames).forEach(workerIndex => {
        const shiftCount = mobileScheduleData[workerIndex] ? Object.keys(mobileScheduleData[workerIndex]).length : 0;
        workerShiftCounts[mobileWorkerNames[workerIndex]] = shiftCount;
    });
    
    const busiestWorker = Object.keys(workerShiftCounts).reduce((a, b) => 
        workerShiftCounts[a] > workerShiftCounts[b] ? a : b
    );
    
    // Create detailed analytics notification
    const analyticsContent = `
        <div class="mobile-analytics-notification">
            <div class="analytics-header">
                <h4>📊 Schedule Analytics</h4>
                <p>${monthNames[currentMonth]} ${currentYear}</p>
            </div>
            
            <div class="analytics-stats">
                <div class="analytics-row">
                    <span class="analytics-label">👥 Total Workers:</span>
                    <span class="analytics-value">${totalWorkers}</span>
                </div>
                
                <div class="analytics-row">
                    <span class="analytics-label">📅 Total Shifts:</span>
                    <span class="analytics-value">${totalShifts}</span>
                </div>
                
                <div class="analytics-row">
                    <span class="analytics-label">☀️ Day Shifts:</span>
                    <span class="analytics-value">${dayShifts} (${Math.round(dayShifts/totalShifts*100)}%)</span>
                </div>
                
                <div class="analytics-row">
                    <span class="analytics-label">🌙 Night Shifts:</span>
                    <span class="analytics-value">${nightShifts} (${Math.round(nightShifts/totalShifts*100)}%)</span>
                </div>
                
                <div class="analytics-row">
                    <span class="analytics-label">🔥 Busiest Day:</span>
                    <span class="analytics-value">${busiestDay}${getOrdinalSuffix(busiestDay)} (${dayShiftCounts[busiestDay]} shifts)</span>
                </div>
                
                <div class="analytics-row">
                    <span class="analytics-label">⭐ Most Active:</span>
                    <span class="analytics-value">${busiestWorker} (${workerShiftCounts[busiestWorker]} shifts)</span>
                </div>
            </div>
            
            <div class="analytics-footer">
                <small>💡 Use desktop version for detailed reports</small>
            </div>
        </div>
    `;
    
    showMobileToast(analyticsContent, 6000);
}

function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// Mobile Modal Helper Functions
function showMobileModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function hideMobileModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function showMobileToast(message, duration = 3000) {
    console.log('📱 Toast message:', message);
    
    // Fallback for debugging - also use alert if toast fails
    try {
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
        
        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    } catch (error) {
        console.error('Toast error:', error);
        // Fallback to alert for debugging
        if (typeof message === 'string' && message.length < 100) {
            alert(message.replace(/<[^>]*>/g, ''));
        }
    }
}

// Mobile Export/Share Functions
async function handleMobileShare() {
    // Check if native sharing is available (mobile browsers)
    if (navigator.share && navigator.canShare) {
        try {
            await navigator.share({
                title: `Security Schedule - ${monthNames[currentMonth]} ${currentYear}`,
                text: `Check out this security shift schedule for ${monthNames[currentMonth]} ${currentYear}`,
                url: window.location.href
            });
            showMobileToast('✅ Schedule shared successfully!', 2000);
        } catch (error) {
            if (error.name !== 'AbortError') {
                copyScheduleLink();
            }
        }
    } else {
        copyScheduleLink();
    }
}

function copyScheduleLink() {
    const currentUrl = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl).then(() => {
            showMobileToast('📋 Schedule URL copied to clipboard!', 2500);
        }).catch(() => {
            showMobileToast('❌ Unable to copy link. Please copy manually: ' + currentUrl, 4000);
        });
    } else {
        // Fallback for older browsers
        showMobileToast('📱 Share URL: ' + currentUrl, 4000);
    }
}

function shareToWhatsApp() {
    const currentUrl = encodeURIComponent(window.location.href);
    const message = encodeURIComponent(`Check out this security shift schedule for ${monthNames[currentMonth]} ${currentYear}`);
    const whatsappUrl = `https://wa.me/?text=${message}%20${currentUrl}`;
    
    window.open(whatsappUrl, '_blank');
    showMobileToast('📱 Opening WhatsApp...', 2000);
}

function fallbackShare(scheduleData) {
    // Fallback: Copy to clipboard
    const shareText = `🛡️ Security Schedule - ${monthNames[currentMonth]} ${currentYear}\n\n${scheduleData}\n\nGenerated by Security Shift Scheduler Pro`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showMobileToast('📋 Schedule copied to clipboard!', 2500);
        }).catch(() => {
            showShareOptions(shareText);
        });
    } else {
        showShareOptions(shareText);
    }
}

function showShareOptions(shareText) {
    const options = `
        <div class="share-options">
            <h4>📤 Share Options</h4>
            <button onclick="copyToClipboard('${shareText.replace(/'/g, "\\'")}')">📋 Copy Text</button>
            <button onclick="shareViaEmail('${shareText.replace(/'/g, "\\'")}')">📧 Email</button>
            <button onclick="shareViaSMS('${shareText.replace(/'/g, "\\'")}')">📱 SMS</button>
        </div>
    `;
    showMobileToast(options, 5000);
}

function generateShareableScheduleData() {
    if (!mobileScheduleData || !mobileWorkerNames) {
        return 'No schedule data available';
    }
    
    let result = '';
    const today = new Date().getDate();
    
    // Generate today's shifts summary
    result += `📅 Today (${today}${getOrdinalSuffix(today)}):\n`;
    Object.keys(mobileWorkerNames).forEach(workerIndex => {
        const workerName = mobileWorkerNames[workerIndex];
        const shift = mobileScheduleData[workerIndex] && mobileScheduleData[workerIndex][today];
        result += `• ${workerName}: ${shift ? shift.time : 'Day Off'}\n`;
    });
    
    return result;
}



// Helper functions for sharing
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showMobileToast('📋 Copied to clipboard!', 2000);
        });
    }
}

function shareViaEmail(text) {
    const subject = `Security Schedule - ${monthNames[currentMonth]} ${currentYear}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}

function shareViaSMS(text) {
    const shortText = text.substring(0, 150) + (text.length > 150 ? '...' : '');
    window.location.href = `sms:?body=${encodeURIComponent(shortText)}`;
}

// Make functions globally available for onclick handlers
window.handleMobileShare = handleMobileShare;
window.copyScheduleLink = copyScheduleLink;
window.shareToWhatsApp = shareToWhatsApp;
window.showMobileModal = showMobileModal;
window.hideMobileModal = hideMobileModal;
window.showMobileToast = showMobileToast;

console.log('✅ Mobile Dashboard loaded successfully!');
