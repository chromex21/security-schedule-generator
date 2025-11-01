// CONTINUATION OF APP.JS - HTML GENERATORS & EVENT LISTENERS

function generateOverviewHTML(analytics) {
    const workersHTML = Object.keys(analytics.workers).map(name => {
        const data = analytics.workers[name];
        const shiftsBreakdown = Object.keys(data.shifts).map(type => 
            `<span class="shift-tag shift-${type}">${type}: ${data.shifts[type]} days</span>`
        ).join(' ');

        return `<tr><td style="font-weight: 700; color: #2c3e50;">${name}</td><td style="text-align: center; font-size: 18px; font-weight: 700; color: #27ae60;">${data.totalHours} hrs</td><td style="text-align: center;">${data.daysWorked}</td><td style="text-align: center;">${data.daysOff}</td><td>${shiftsBreakdown}</td></tr>`;
    }).join('');

    const pairsHTML = Object.keys(analytics.shiftPairs).map(pair => {
        return `<tr><td style="font-weight: 600;">${pair}</td><td style="text-align: center; font-weight: 700; color: #3498db;">${analytics.shiftPairs[pair]} days</td></tr>`;
    }).join('');

    return `<!DOCTYPE html><html><head><title>Schedule Analytics</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;padding:20px;background:#f5f5f5}.container{max-width:1200px;margin:0 auto;background:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden}.header{background:linear-gradient(135deg,#2c3e50 0%,#34495e 100%);color:white;padding:30px;text-align:center}.header h1{font-size:28px;margin-bottom:10px}.content{padding:30px}.section{margin-bottom:40px;padding:20px;background:#f8f9fa;border-radius:8px}.section-title{font-size:20px;font-weight:700;color:#2c3e50;margin-bottom:20px}table{width:100%;border-collapse:collapse;background:white;border-radius:6px;overflow:hidden}th,td{padding:12px;text-align:left;border-bottom:1px solid #ddd}th{background:#34495e;color:white;font-weight:600}tr:last-child td{border-bottom:none}tr:hover{background:#f8f9fa}.shift-tag{display:inline-block;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:600;margin:2px}.shift-night{background:#e3f2fd;color:#1565c0}.shift-day{background:#fff9c4;color:#f57f17}.shift-evening{background:#fce4ec;color:#c2185b}.shift-off{background:#ffccbc;color:#d84315}.back-link{display:inline-block;margin:20px 0;padding:10px 20px;background:#3498db;color:white;text-decoration:none;border-radius:4px;font-weight:600}.back-link:hover{background:#2980b9}.footer{padding:20px;background:#2c3e50;color:white;text-align:center}.footer a{color:#3498db;text-decoration:none}</style></head><body><div class="container"><div class="header"><h1>📊 Schedule Analytics & Overview</h1><p>${monthNames[currentMonth]} ${currentYear} - Comprehensive Report</p></div><div class="content"><a href="#" onclick="window.close();return false;" class="back-link">← Back to Schedule</a><div class="section"><div class="section-title">👥 Worker Hours & Attendance</div><table><thead><tr><th>Worker Name</th><th style="text-align:center;">Total Hours</th><th style="text-align:center;">Days Worked</th><th style="text-align:center;">Days Off</th><th>Shift Breakdown</th></tr></thead><tbody>${workersHTML || '<tr><td colspan="5" style="text-align:center;color:#999;">No schedule data available</td></tr>'}</tbody></table></div><div class="section"><div class="section-title">🤝 Workers on Same Shifts</div><table><thead><tr><th>Worker Pair</th><th style="text-align:center;">Days Together</th></tr></thead><tbody>${pairsHTML || '<tr><td colspan="2" style="text-align:center;color:#999;">No overlapping shifts found</td></tr>'}</tbody></table></div></div><div class="footer">Made by <strong>Keyran Lewis</strong> | Email: <a href="mailto:chrmxfinal@gmail.com">chrmxfinal@gmail.com</a></div></div></body></html>`;
}

function generateGuideHTML() {
    return `<!DOCTYPE html><html><head><title>Security Scheduler Pro - Complete User Guide</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;padding:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh}.container{max-width:1200px;margin:0 auto;background:white;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.2);overflow:hidden}.hero{background:linear-gradient(135deg,#2c3e50 0%,#34495e 100%);color:white;padding:60px 40px;text-align:center}.hero h1{font-size:42px;margin-bottom:15px}.content{padding:40px;line-height:1.8}.section{margin-bottom:40px;padding:25px;background:#f8f9fa;border-radius:8px;border-left:4px solid #3498db}.section h2{color:#2c3e50;font-size:24px;margin-bottom:15px;display:flex;align-items:center;gap:10px}.section h3{color:#34495e;font-size:18px;margin:20px 0 10px 0}.section ul{margin-left:25px;margin-top:10px}.section ul li{margin-bottom:8px}.section code{background:#ecf0f1;padding:3px 8px;border-radius:4px;font-family:'Courier New',monospace;font-size:13px;color:#c0392b}.section p{margin-bottom:15px;color:#555}.tip-box{background:#d4edda;border-left:4px solid #28a745;padding:15px;margin:15px 0;border-radius:4px}.tip-box strong{color:#155724}.warning-box{background:#fff3cd;border-left:4px solid#ffc107;padding:15px;margin:15px 0;border-radius:4px}.warning-box strong{color:#856404}.back-link{display:inline-block;margin:20px 0;padding:12px 30px;background:#3498db;color:white;text-decoration:none;border-radius:6px;font-weight:600;transition:all 0.3s}.back-link:hover{background:#2980b9;transform:translateY(-2px)}.footer{padding:25px;background:#2c3e50;color:white;text-align:center}.footer a{color:#3498db;text-decoration:none}.shift-badge{display:inline-block;padding:4px 10px;border-radius:4px;font-size:12px;font-weight:600;margin:3px}.badge-night{background:#e3f2fd;color:#1565c0}.badge-day{background:#fff9c4;color:#f57f17}.badge-evening{background:#fce4ec;color:#c2185b}.badge-off{background:#ffccbc;color:#d84315}</style></head><body><div class="container"><div class="hero"><h1>📖 Complete User Guide</h1><p>Everything you need to know about Security Shift Scheduler Pro v2.0</p></div><div class="content"><a href="#" onclick="window.close();return false;" class="back-link">← Back to Scheduler</a><div class="section"><h2>🚀 Getting Started</h2><h3>First Time Setup</h3><p>When you first open the scheduler, you'll see a default schedule for November 2025 with 8 workers. Here's how to customize it:</p><ol><li>Click the <strong>⚙️ Settings</strong> icon in the top right</li><li>Adjust the <strong>Number of Workers</strong> (1-50)</li><li>Select your desired <strong>Month</strong> and <strong>Year</strong></li><li>Click <strong>Generate Schedule</strong> to create your calendar</li></ol><div class="tip-box"><strong>💡 Pro Tip:</strong> The scheduler auto-saves every 30 seconds. You'll see a save indicator in the top bar showing your save status.</div></div><div class="section"><h2>👥 Managing Workers</h2><h3>Editing Worker Names</h3><p>Click on any worker name in the left column to edit it. Press Enter or click outside to save.</p><h3>Designating Managers</h3><p>Add <code>(m)</code> after any worker's name to mark them as a manager. Example: <code>John Smith (m)</code></p><p>Managers get a special <strong>MGR</strong> badge and highlighted row with an orange border.</p><h3>Adding/Removing Workers</h3><ol><li>Open Settings (⚙️)</li><li>Change the number in <strong>Number of Workers</strong></li><li>Click <strong>Generate Schedule</strong></li><li>Your existing shift data will be preserved</li></ol><div class="warning-box"><strong>⚠️ Note:</strong> Increasing workers adds new ones. Decreasing workers removes from the bottom of the list.</div></div><div class="section"><h2>⏰ Entering Shift Times</h2><h3>Quick Entry Shortcuts</h3><p>Use these shortcuts for instant shift entry:</p><ul><li><code>11-7</code> → <span class="shift-badge badge-night">11PM-7AM (Night)</span></li><li><code>7-3</code> → <span class="shift-badge badge-day">7AM-3PM (Day)</span></li><li><code>3-11</code> → <span class="shift-badge badge-evening">3PM-11PM (Evening)</span></li><li><code>10-6</code> → <span class="shift-badge badge-day">10AM-6PM (Day)</span></li><li><code>off</code> → <span class="shift-badge badge-off">OFF (Day Off)</span></li></ul><h3>Custom Time Ranges</h3><p>Type any time range like <code>9-5</code>, <code>6-2</code>, or <code>12-8</code>. The system automatically determines AM/PM and shift type.</p><h3>Keyboard Navigation</h3><ul><li>Press <code>Tab</code> to move to the next cell</li><li>Press <code>Shift+Tab</code> to move to the previous cell</li><li>Press <code>Enter</code> to save and move to the next row</li></ul><div class="tip-box"><strong>💡 Pro Tip:</strong> Click any filled shift to edit it. The scheduler uses color coding: blue for night, yellow for day, pink for evening, and orange for off.</div></div><div class="section"><h2>👁️ View Modes</h2><h3>Bi-Weekly View (Default)</h3><p>Shows two tables: Days 1-15 and Days 16-31. Best for:</p><ul><li>Quick overview of the entire month</li><li>Side-by-side comparison of first and second half</li><li>Desktop and large screen viewing</li></ul><h3>Weekly Stacked View</h3><p>Shows separate tables for Week 1, 2, 3, and 4. Best for:</p><ul><li>Printing and PDF exports</li><li>Focused week-by-week planning</li><li>Mobile and tablet viewing</li><li>Sharing specific weeks</li></ul><p>To switch views:</p><ol><li>Open Settings (⚙️)</li><li>Select view from <strong>Layout</strong> dropdown</li><li>Click <strong>Switch View</strong></li></ol></div><div class="section"><h2>📤 Exporting Your Schedule</h2><h3>Print Schedule</h3><p>Click <strong>🖨️ Print Schedule</strong> to open your browser's print dialog. The schedule automatically formats to fit 1-2 pages in landscape mode.</p><h3>Export Compact PDF</h3><p>Generates a compressed PDF with all schedule data on 1-2 pages. Perfect for emailing or archiving.</p><h3>Export Full Image</h3><p>Captures the entire schedule as a high-resolution PNG image. Great for sharing on messaging apps or posting on bulletin boards.</p><h3>Export Standard PDF</h3><p>Creates a multi-page PDF with each week on its own page. Professional format for formal distribution.</p><h3>Save/Load Schedule Data</h3><p>Use <strong>💾 Save Schedule Data</strong> to export as JSON (backup format). Use <strong>📂 Load Schedule Data</strong> to restore from a previous save.</p><div class="warning-box"><strong>⚠️ Export Tip:</strong> For best printing results, use <strong>Weekly Stacked View</strong> before exporting to PDF or printing.</div></div><div class="section"><h2>📊 Analytics Dashboard</h2><p>Click the <strong>📊 View Analytics</strong> icon to open a detailed report showing:</p><ul><li><strong>Worker Hours:</strong> Total hours worked by each person</li><li><strong>Days Worked/Off:</strong> Attendance tracking</li><li><strong>Shift Breakdown:</strong> Count of night, day, and evening shifts per worker</li><li><strong>Shift Pairs:</strong> Which workers are scheduled together most often</li></ul><p>Use analytics to:</p><ul><li>Ensure fair distribution of hours</li><li>Identify scheduling patterns</li><li>Balance workload across team members</li><li>Track manager availability</li></ul></div><div class="section"><h2>🎨 Themes & Customization</h2><p>Click the <strong>🎨 Theme</strong> icon to choose from 6 professional themes:</p><ul><li><strong>☀️ Light:</strong> Classic bright theme (default)</li><li><strong>🌙 Dark:</strong> Easy on the eyes for night work</li><li><strong>💙 Ocean Blue:</strong> Professional blue tones</li><li><strong>🌿 Forest Green:</strong> Natural green theme</li><li><strong>💜 Royal Purple:</strong> Elegant purple theme</li><li><strong>⚫ High Contrast:</strong> Maximum readability and accessibility</li></ul><p>Your theme choice is automatically saved and will persist across sessions.</p></div><div class="section"><h2>↶↷ Undo & Redo</h2><p>Made a mistake? No problem! The scheduler tracks your last 50 changes.</p><ul><li>Click <strong>↶ Undo</strong> to reverse your last action</li><li>Click <strong>↷ Redo</strong> to restore an undone action</li><li>View your history count in the status display</li></ul><p>Undo/redo works for:</p><ul><li>Shift time changes</li><li>Worker name edits</li><li>Schedule regeneration</li><li>Data imports</li></ul></div><div class="section"><h2>💾 Auto-Save System</h2><p>Your schedule automatically saves to your browser every 30 seconds. Watch the save indicator:</p><ul><li><strong>💾 Saved:</strong> All changes are saved</li><li><strong>⏳ Saving...:</strong> Currently saving</li><li><strong>⚠️ Unsaved:</strong> Changes pending</li><li><strong>❌ Error:</strong> Save failed (check browser storage)</li></ul><p>To disable auto-save:</p><ol><li>Open Settings (⚙️)</li><li>Uncheck <strong>Auto-Save (Every 30 seconds)</strong></li><li>You'll need to manually export your schedule</li></ol><div class="tip-box"><strong>💡 Pro Tip:</strong> Auto-save uses your browser's local storage. Clear your browser data cautiously, and always keep JSON backups of important schedules!</div></div><div class="section"><h2>🔧 Advanced Tips</h2><h3>Bulk Operations</h3><p>To quickly fill multiple shifts:</p><ol><li>Enter a shift time in the first cell</li><li>Press Tab repeatedly while entering the same time</li><li>Use keyboard navigation for speed</li></ol><h3>Weekend Planning</h3><p>Weekend days (Saturday & Sunday) are automatically highlighted in yellow for easy identification.</p><h3>Manager Coverage</h3><p>Use the analytics dashboard to ensure at least one manager is scheduled each day. Look for the MGR badge in worker rows.</p><h3>Schedule Templates</h3><p>Save completed schedules as JSON files and use them as templates for future months. Just load, change the month/year, and adjust as needed.</p></div><div class="section"><h2>❓ Troubleshooting</h2><h3>Schedule Not Saving</h3><ul><li>Check that auto-save is enabled</li><li>Ensure your browser allows local storage</li><li>Try clearing old data and re-entering</li><li>Export as JSON for backup</li></ul><h3>Export Not Working</h3><ul><li>Allow pop-ups from the scheduler</li><li>Check your browser's download settings</li><li>Try switching to Weekly view for exports</li><li>Ensure you have enough disk space</li></ul><h3>Print Quality Issues</h3><ul><li>Use landscape orientation</li><li>Set margins to minimum (0.4cm recommended)</li><li>Switch to Weekly Stacked view</li><li>Try different browsers (Chrome/Edge work best)</li></ul><h3>Data Lost After Browser Update</h3><ul><li>Browser updates can clear local storage</li><li>Always keep JSON backups of important schedules</li><li>Export regularly to PDF for archive copies</li></ul></div><div class="section"><h2>🎉 New Features in v2.0</h2><ul><li>🎨 6 beautiful themes with instant switching</li><li>💾 Auto-save every 30 seconds with status indicator</li><li>↶↷ Undo/Redo system with 50-step history</li><li>🖨️ Enhanced printing (optimized for 1-2 pages)</li><li>📑 Compact PDF export functionality</li><li>📊 Advanced analytics dashboard</li><li>⌨️ Improved keyboard navigation</li><li>📱 Better mobile responsiveness</li></ul></div><div class="section"><h2>💬 Support & Feedback</h2><p>Need help or have suggestions?</p><p><strong>Developer:</strong> Keyran Lewis<br><strong>Email:</strong> <a href="mailto:chrmxfinal@gmail.com" style="color:#3498db">chrmxfinal@gmail.com</a></p><p><strong>Version:</strong> 2.0<br><strong>Last Updated:</strong> November 2025</p></div><a href="#" onclick="window.close();return false;" class="back-link">← Back to Scheduler</a></div><div class="footer">Made with ❤️ by <strong>Keyran Lewis</strong> | <a href="mailto:chrmxfinal@gmail.com">chrmxfinal@gmail.com</a><br><span style="font-size:11px;opacity:0.8;margin-top:5px;display:block">Security Shift Scheduler Pro v2.0</span></div></div></body></html>`;
}

// ========================================
// EXPORT FUNCTIONS
// ========================================

// Export Compact PDF - All content on 1-2 pages
async function exportCompactPdf() {
    try {
        // Hide controls and other UI elements temporarily
        const controls = document.getElementById('controls');
        const timeShortcuts = document.querySelector('.time-shortcuts');
        const legend = document.querySelector('.legend');
        const footer = document.querySelector('.footer');
        const headerActions = document.querySelector('.header-actions');
        
        const originalDisplay = {
            controls: controls.style.display,
            timeShortcuts: timeShortcuts.style.display,
            legend: legend.style.display,
            footer: footer.style.display,
            headerActions: headerActions.style.display
        };
        
        controls.style.display = 'none';
        timeShortcuts.style.display = 'none';
        legend.style.display = 'none';
        footer.style.display = 'none';
        headerActions.style.display = 'none';
        
        // Capture the schedule
        const scheduleWrapper = document.querySelector('.schedule-wrapper');
        const canvas = await html2canvas(scheduleWrapper, {
            scale: 1.5,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        // Restore UI elements
        controls.style.display = originalDisplay.controls;
        timeShortcuts.style.display = originalDisplay.timeShortcuts;
        legend.style.display = originalDisplay.legend;
        footer.style.display = originalDisplay.footer;
        headerActions.style.display = originalDisplay.headerActions;
        
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 10;
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`Schedule_Compact_${monthNames[currentMonth]}_${currentYear}.pdf`);
        
        alert('✅ Compact PDF exported successfully!');
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ Export failed. Please try again or use Print function.');
    }
}

// Export Full View as High-Res Image
async function exportFullImage() {
    try {
        const container = document.getElementById('mainContainer');
        
        // Hide non-schedule elements
        const controls = document.getElementById('controls');
        const originalDisplay = controls.style.display;
        controls.style.display = 'none';
        
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: container.scrollWidth,
            height: container.scrollHeight
        });
        
        // Restore controls
        controls.style.display = originalDisplay;
        
        // Download as PNG
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `Schedule_FullView_${monthNames[currentMonth]}_${currentYear}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            
            alert('✅ Full view image exported successfully!');
        });
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ Export failed. Please try again.');
    }
}

// Export Standard PDF - Professional format
async function exportStandardPdf() {
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
        
        // Hide UI elements
        const controls = document.getElementById('controls');
        const timeShortcuts = document.querySelector('.time-shortcuts');
        const legend = document.querySelector('.legend');
        const footer = document.querySelector('.footer');
        const headerActions = document.querySelector('.header-actions');
        
        const originalDisplay = {
            controls: controls.style.display,
            timeShortcuts: timeShortcuts.style.display,
            legend: legend.style.display,
            footer: footer.style.display,
            headerActions: headerActions.style.display
        };
        
        controls.style.display = 'none';
        timeShortcuts.style.display = 'none';
        legend.style.display = 'none';
        footer.style.display = 'none';
        headerActions.style.display = 'none';
        
        if (currentViewMode === 'weekly') {
            // Export each week on separate pages
            const weekContainers = document.querySelectorAll('#weeklyView .week-container');
            
            for (let i = 0; i < weekContainers.length; i++) {
                const canvas = await html2canvas(weekContainers[i], {
                    scale: 1.8,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });
                
                const imgData = canvas.toDataURL('image/png');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, (pdfHeight - 20) / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 10;
                
                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            }
        } else {
            // Export bi-weekly view (2 tables)
            const tables = document.querySelectorAll('#biweeklyView .week-container');
            
            for (let i = 0; i < tables.length; i++) {
                const canvas = await html2canvas(tables[i], {
                    scale: 1.8,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });
                
                const imgData = canvas.toDataURL('image/png');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, (pdfHeight - 20) / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 10;
                
                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            }
        }
        
        // Restore UI elements
        controls.style.display = originalDisplay.controls;
        timeShortcuts.style.display = originalDisplay.timeShortcuts;
        legend.style.display = originalDisplay.legend;
        footer.style.display = originalDisplay.footer;
        headerActions.style.display = originalDisplay.headerActions;
        
        pdf.save(`Schedule_Standard_${monthNames[currentMonth]}_${currentYear}.pdf`);
        alert('✅ Standard PDF exported successfully!');
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ Export failed. Please try again.');
    }
}

// Export Each Week as Separate Images
async function exportSplitImages() {
    try {
        if (currentViewMode !== 'weekly') {
            if (confirm('This feature works best in Weekly Stacked view. Switch now?')) {
                document.getElementById('viewMode').value = 'weekly';
                switchView();
                // Wait for view to render
                await new Promise(resolve => setTimeout(resolve, 500));
            } else {
                return;
            }
        }
        
        // Hide UI elements
        const controls = document.getElementById('controls');
        const timeShortcuts = document.querySelector('.time-shortcuts');
        const legend = document.querySelector('.legend');
        const footer = document.querySelector('.footer');
        const headerActions = document.querySelector('.header-actions');
        
        const originalDisplay = {
            controls: controls.style.display,
            timeShortcuts: timeShortcuts.style.display,
            legend: legend.style.display,
            footer: footer.style.display,
            headerActions: headerActions.style.display
        };
        
        controls.style.display = 'none';
        timeShortcuts.style.display = 'none';
        legend.style.display = 'none';
        footer.style.display = 'none';
        headerActions.style.display = 'none';
        
        const weekContainers = document.querySelectorAll('#weeklyView .week-container');
        
        for (let i = 0; i < weekContainers.length; i++) {
            const canvas = await html2canvas(weekContainers[i], {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            
            await new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `Schedule_Week${i + 1}_${monthNames[currentMonth]}_${currentYear}.png`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                    resolve();
                });
            });
            
            // Small delay between downloads
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        // Restore UI elements
        controls.style.display = originalDisplay.controls;
        timeShortcuts.style.display = originalDisplay.timeShortcuts;
        legend.style.display = originalDisplay.legend;
        footer.style.display = originalDisplay.footer;
        headerActions.style.display = originalDisplay.headerActions;
        
        alert(`✅ ${weekContainers.length} week images exported successfully!`);
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ Export failed. Please try again.');
    }
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Security Shift Scheduler Pro v2.0 - Initializing...');
    
    initThemeManager();
    initAutoSave();
    updateHistoryUI();
    
    const loaded = loadFromLocalStorage();
    if (!loaded) {
        generateSchedule(false);
    }
    
    // Event Listeners
    document.getElementById('settingsIcon').addEventListener('click', () => {
        document.getElementById('controls').classList.toggle('active');
    });

    document.getElementById('generateBtn').addEventListener('click', () => generateSchedule(false));
    document.getElementById('updateDateBtn').addEventListener('click', updateCalendar);
    document.getElementById('switchViewBtn').addEventListener('click', switchView);
    document.getElementById('exportJsonBtn').addEventListener('click', exportScheduleData);
    document.getElementById('exportCompactPdfBtn').addEventListener('click', exportCompactPdf);
    document.getElementById('exportFullImageBtn').addEventListener('click', exportFullImage);
    document.getElementById('exportPdfBtn').addEventListener('click', exportStandardPdf);
    document.getElementById('exportSplitImagesBtn').addEventListener('click', exportSplitImages);
    document.getElementById('overviewBtn').addEventListener('click', openOverviewPage);
    document.getElementById('guideBtn').addEventListener('click', openGuidePage);
    document.getElementById('undoBtn').addEventListener('click', undo);
    document.getElementById('redoBtn').addEventListener('click', redo);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllData);
    
    document.getElementById('importJsonBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });
    
    document.getElementById('fileInput').addEventListener('change', importScheduleData);
    
    console.log('✅ Scheduler Pro v2.0 - Ready!');
});

console.log('📦 app-part2.js loaded - Continuation functions ready');
