# 🛡️ Security Shift Scheduler Pro v2.1

**Professional Shift Scheduling Application**
Made by Keyran Lewis | chrmxfinal@gmail.com

---

## 🎉 What's New in v2.1

### Latest Updates (v2.1):
✅ **All Export Functions Working** - Compact PDF, Full Image, Standard PDF, Split Images all functional  
✅ **Comprehensive User Guide** - 3,500+ words with 13 sections  
✅ **Enhanced UX** - Success/error feedback for all exports  
✅ **Zero Breaking Changes** - All v2.0 features preserved

### Major Features from v2.0:

### Major Features:
✅ **6 Beautiful Themes** - Light, Dark, Ocean Blue, Forest Green, Royal Purple, High Contrast  
✅ **Auto-Save** - Automatically saves every 30 seconds  
✅ **Undo/Redo** - 50-step history tracking  
✅ **Enhanced Print** - Compact printing on 1-2 pages  
✅ **Compact PDF Export** - Smart PDF generation  
✅ **Modular Code** - Clean separation of concerns  
✅ **All Original Features** - Maintained from v1.0

---

## 📁 File Structure

```
scheduler-pro/
├── index.html           # Main HTML structure (7KB)
├── css/
│   ├── styles.css       # Core styling (12KB)
│   └── themes.css       # 6 theme variations (18KB)
├── js/
│   ├── app.js           # Core application logic
│   └── app-part2.js     # HTML generators & event listeners
└── README.md            # This file
```

**Total Size:** ~42KB (split files) vs 87KB (original single file)

---

## 🚀 Quick Start

### Option 1: Use Directly (Easiest)
1. Open `index.html` in any modern web browser
2. Start scheduling!

### Option 2: Local Web Server (Recommended for Development)
```bash
# Using Python 3
cd scheduler-pro
python -m http.server 8000

# Or using Node.js
npx serve

# Then open: http://localhost:8000
```

### Option 3: GitHub Pages (For Public Access)
1. Push to GitHub repository
2. Enable GitHub Pages in repo settings
3. Share the URL!

---

## ✨ Features Overview

### 🎨 Theme System
- **Light** - Classic bright theme (default)
- **Dark** - Easy on the eyes
- **Ocean Blue** - Professional blue tones
- **Forest Green** - Natural, calming
- **Royal Purple** - Elegant vibes
- **High Contrast** - Maximum accessibility

**How to Change:** Click 🎨 icon → Select theme → Auto-saved

### 💾 Auto-Save System
- Saves automatically every 30 seconds
- Status indicator shows: Saved / Saving... / Unsaved
- Toggle on/off in Settings
- Data stored in browser localStorage

### ↶↷ Undo/Redo
- Tracks last 50 changes
- Works for shift assignments and name changes
- Keyboard shortcuts ready (future enhancement)

### 📅 Schedule Management
- **Bi-Weekly View** - Days 1-15, 16-31 side-by-side
- **Weekly Stacked View** - Week 1, 2, 3, 4 vertically
- Editable worker names
- Manager badges (add "(m)" after name)
- Color-coded shifts

### 📤 Export Options
1. **Print** - Compact, clean layout (1-2 pages)
2. **Compact PDF** - Smart fitting, professional
3. **Full Image** - High-res PNG
4. **Split Images** - Individual week files
5. **JSON Data** - Save/load schedule data

### 📊 Analytics
- Worker hours tracking
- Shift pattern analysis
- Overlapping shift detection

---

## ⚡ Quick Time Entry

Type shortcuts for instant conversion:
- `11-7` → 11PM-7AM (Night)
- `7-3` → 7AM-3PM (Day)
- `3-11` → 3PM-11PM (Evening)
- `10-6` → 10AM-6PM (Day)
- `off` → Day Off

---

## 🎯 Usage Tips

### For Best Print Results:
1. Switch to **Weekly Stacked View**
2. Click "Print Schedule" or "Export Compact PDF"
3. Everything fits on 1-2 pages automatically

### For Sharing:
- **Email**: Use Compact PDF export
- **Digital**: Use Full Image export
- **Presentations**: Use Split Images

### For Collaboration:
- Export JSON data
- Share file with team
- They import to load schedule

---

## 🔧 Technical Details

### Browser Support:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### External Dependencies:
- **html2canvas** (v1.4.1) - For image exports
- **jsPDF** (v2.5.1) - For PDF exports
- Loaded via CDN, works offline after first load

### Data Storage:
- **localStorage** - Auto-save data
- **JSON Export** - Manual backup
- No server required, 100% client-side

---

## 🐛 Known Limitations

1. **Export functions require internet** on first page load (to download libraries)
2. **localStorage limit** - ~5MB per domain (plenty for schedules)
3. **No cloud sync** - Data stays on local device
4. **Print quality** varies by browser (Chrome recommended)

---

## 🚀 Deployment to GitHub

### Step 1: Create Repository
```bash
cd scheduler-pro
git init
git add .
git commit -m "Initial commit: Security Shift Scheduler Pro v2.0"
```

### Step 2: Push to GitHub
```bash
# Create new repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/scheduler-pro.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to repo Settings
2. Click "Pages" in sidebar
3. Source: Deploy from branch
4. Branch: main, folder: / (root)
5. Save

Your app will be live at:
`https://YOUR_USERNAME.github.io/scheduler-pro/`

---

## 📝 Future Enhancements

### Planned Features:
- ⌨️ Full keyboard shortcuts (Ctrl+Z, Ctrl+S, etc.)
- 📱 Mobile-responsive design
- 🎯 Shift templates (save patterns)
- 🔍 Search and filter workers
- 📋 Copy/paste rows
- 🌐 Cloud sync option
- 📧 Email schedules directly
- 🔔 Shift reminders
- 👥 Team collaboration mode

---

## 🤝 Contributing

Want to add features or fix bugs?
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📜 License

Free to use for personal and commercial projects.  
Attribution appreciated but not required.

**Made with ❤️ by Keyran Lewis**

---

## 📧 Contact & Support

**Email:** chrmxfinal@gmail.com

### Having Issues?
1. Check browser console for errors (F12)
2. Clear localStorage and refresh
3. Try different browser
4. Contact me!

---

## 📊 Version History

### v2.1 (Current)
- ✅ Fixed all export functions
- ✅ Comprehensive user guide (3,500+ words)
- ✅ Export success/error feedback
- ✅ Enhanced documentation

### v2.0
- ✅ Theme system with 6 themes
- ✅ Auto-save functionality
- ✅ Undo/Redo system
- ✅ Modular code structure
- ✅ Enhanced print/PDF export
- ✅ Improved user experience

### v1.0 (Previous)
- ✅ Basic shift scheduling
- ✅ Bi-weekly and weekly views
- ✅ Export to images and PDF
- ✅ Analytics dashboard
- ✅ JSON import/export

---

## 🎓 How It Works

### Architecture:
```
index.html
    ↓
css/styles.css + css/themes.css (Visual layer)
    ↓
js/app.js (Core logic: theme, auto-save, undo/redo, schedule generation)
    ↓
js/app-part2.js (Analytics, exports, event handlers)
    ↓
External Libraries (html2canvas, jsPDF)
```

### Data Flow:
1. User inputs data
2. Stored in `scheduleData` object
3. Auto-saved to localStorage every 30s
4. Undo history tracked
5. Exported on demand

---

## 💡 Tips for Customization

### Change Auto-Save Interval:
Edit `js/app.js`, line ~90:
```javascript
}, 30000); // Change 30000 (30s) to desired milliseconds
```

### Add New Theme:
1. Add theme card in `index.html`
2. Add theme styles in `css/themes.css`
3. Theme auto-registers!

### Modify Shift Types:
Edit `parseTimeInput()` function in `js/app.js`

---

## 🎉 Thank You!

Thank you for using Security Shift Scheduler Pro!  
If this helps your team, consider sharing it or giving the repo a ⭐

**Happy Scheduling! 🛡️**

---

**Security Shift Scheduler Pro v2.1**  
© 2025 Keyran Lewis | chrmxfinal@gmail.com
