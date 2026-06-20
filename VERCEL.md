# Apollo Diagnostics Belgharia - Vercel Deployment & Integration Guide

This premium diagnostic single-page web app is fully optimized for lightning-fast speeds, zero server assets overhead, and fluid responsiveness on all mobile networks.

---

## 1. Local Setup and Hot Development

Follow these simple directions to run and review modifications locally:

```bash
# Install package dependencies from locking tree
npm install

# Live boot development server on http://localhost:3000
npm run dev
```

---

## 2. Compile Distribution Build

Compile the final assets bundle for production:

```bash
npm run build
```

The output build assets will be fully optimized, compressed, and written inside the `/dist` directory.

---

## 3. Host and Deploy on Vercel

### Step 3.1: Commit Code to GitHub
Ensure all your files are securely tracked on a GitHub repository of choice:
```bash
git init
git add .
git commit -m "feat: initial diagnostic suite launch"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 3.2: Import in Vercel Portal
1. Login to the [Vercel Dashboard](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Keep the default settings since Vercel automatically detects **Vite** as your build runner:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your professional medical site is live in less than a minute!

---

## 4. Google Apps Script Webhook Bindings (Lead Storage)

This application transfers leads securely to Google Sheets using a direct custom Apps Script. Follow these guides to integrate it:

### Step 4.1: Prepare Google Sheet
1. Create a brand new Google Sheet.
2. Label these 6 headers in Row 1:
   - **`Date`**
   - **`Name`**
   - **`Phone`**
   - **`Email`**
   - **`Test`**
   - **`Message`**

### Step 4.2: Embed Google Apps Script
1. Inside the Google Sheet, navigate to **Extensions** -> **Apps Script**.
2. Erase any pre-existing code, and paste the following snippet:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append standard row details
    sheet.appendRow([
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      data.name,
      data.phone,
      data.email,
      data.test,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": err.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (disk icon).
4. Click **Deploy** -> **New Deployment**.
5. Select type: **Web App**.
6. Set credentials access configurations:
   - *Execute as*: **Me** (your Google email)
   - *Who has access*: **Anyone** (crucial for direct secure cross-origin submissions)
7. Click **Deploy**, and copy the generated **Web App URL** (e.g., `https://script.google.com/macros/s/.../exec`).

### Step 4.3: Bind with Web Application
In our app, scroll to the **Lead Callback form**, click **"Configure Webhook Integration Settings"**, and paste your newly copied Google Web App URL. Tap **Save** to enable live recording.
