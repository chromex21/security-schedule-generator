# 🚀 DEPLOYMENT GUIDE

## Quick Start - GitHub Pages

### 1️⃣ Create GitHub Repository
1. Go to https://github.com/new
2. Name: `security-shift-scheduler` (or your choice)
3. Description: "Professional shift scheduling web application"
4. Public or Private
5. DO NOT initialize with README (we already have one)
6. Click "Create repository"

### 2️⃣ Push Code to GitHub

Open terminal/command prompt in the `scheduler-pro` folder:

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Security Shift Scheduler Pro v2.0"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under "Source":
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

---

## Alternative Deployment Options

### Option A: Netlify (Drag & Drop)
1. Go to https://app.netlify.com/drop
2. Drag the `scheduler-pro` folder
3. Get instant URL!

### Option B: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd scheduler-pro
vercel
```

### Option C: Your Own Server
Upload files via FTP/SFTP to:
```
/public_html/scheduler/
```

Access at: `https://yourdomain.com/scheduler/`

---

## 📝 Customization Before Deploy

### Update Contact Info
Edit `index.html` and all HTML generators:
- Change "Keyran Lewis" to your name
- Change "chrmxfinal@gmail.com" to your email

### Update README
Edit `README.md`:
- Update GitHub URLs
- Add your name/info
- Customize description

---

## 🔒 Important Notes

### Privacy & Data
- All data is stored locally in browser
- No data sent to servers
- Users should export/backup important schedules

### Browser Compatibility
- Requires modern browser (Chrome, Firefox, Safari, Edge)
- Minimum: ES6 JavaScript support
- localStorage support required

### External Dependencies
- html2canvas and jsPDF loaded from CDN
- First load requires internet
- After cached, works offline

---

## 🎯 Post-Deployment Checklist

- [ ] Test on desktop browser
- [ ] Test print functionality
- [ ] Test PDF export
- [ ] Test theme switching
- [ ] Test auto-save
- [ ] Test import/export JSON
- [ ] Share with team!

---

## 📊 Analytics (Optional)

### Add Google Analytics

Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🐛 Troubleshooting

### GitHub Pages not loading?
- Check that `index.html` is in root folder
- Wait 5 minutes after enabling
- Check repo is Public (or has Pages enabled for Private)

### Export features not working?
- Check browser console (F12)
- Ensure CDN libraries loaded
- Try different browser

### Lost data?
- Check browser localStorage hasn't been cleared
- Import from JSON backup if available
- Enable auto-save for future

---

## 🎉 You're Ready!

Your app is now live and ready for the world!

**Next Steps:**
1. Share URL with team
2. Add to bookmarks
3. Create documentation/training
4. Gather feedback
5. Plan improvements

---

Made with ❤️ by Keyran Lewis
