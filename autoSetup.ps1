# =======================================================
# Money-In-The-Bank Auto Setup + Scanner + GitHub Push
# =======================================================
$ErrorActionPreference = "Stop"

# -----------------------------
# Paths
# -----------------------------
$projectPath  = Get-Location
$srcPath      = Join-Path $projectPath "src"
$pagesPath    = Join-Path $srcPath "pages"
$jsPath       = Join-Path $srcPath "js"
$cssPath      = Join-Path $srcPath "css"
$scannerPath  = Join-Path $projectPath "scanProject.js"

# Create folders
foreach ($folder in @($srcPath, $pagesPath, $jsPath, $cssPath)) {
    if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder -Force | Out-Null }
}

# -----------------------------
# style.css
# -----------------------------
$styleCssPath = Join-Path $cssPath "style.css"
$styleCssContent = @"
body { margin:0; padding:0; font-family: Arial,sans-serif; background:#f0f2f5; }
.login-container { max-width:400px; margin:100px auto; text-align:center; background:#fff; padding:20px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1); }
button { padding:10px 20px; font-size:16px; cursor:pointer; border:none; border-radius:5px; margin-top:10px; }
#googleBtn { background:#4285F4; color:#fff; }
"@
$styleCssContent | Set-Content -Path $styleCssPath -Encoding UTF8 -Force

# -----------------------------
# login.html
# -----------------------------
$loginHtmlPath = Join-Path $pagesPath "login.html"
$loginHtmlContent = @"
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>Login</title>
<link rel='stylesheet' href='../css/style.css'>
<script type='module' src='../js/login.js'></script>
</head>
<body>
<div class='login-container'>
<h2>Login with Google</h2>
<button id='googleBtn'>Sign In with Google</button>
<p id='status'></p>
</div>
</body>
</html>
"@
$loginHtmlContent | Set-Content -Path $loginHtmlPath -Encoding UTF8 -Force

# -----------------------------
# login.js
# -----------------------------
$loginJsPath = Join-Path $jsPath "login.js"
$loginJsContent = @"
import { auth, provider, db } from './firebase-config.js';
import { signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { ref, get, set } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

document.getElementById('googleBtn').addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userRef = ref(db, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            await set(userRef, { id:user.uid, name:user.displayName, email:user.email, profilePic:user.photoURL||'', balance:5.0, status:'Pending' });
        }
        document.getElementById('status').textContent = '✅ Login successful!';
        setTimeout(()=>window.location.href='home.html',1000);
    } catch(err) {
        console.error(err);
        document.getElementById('status').textContent = '❌ Login failed: ' + err.message;
    }
});
"@
$loginJsContent | Set-Content -Path $loginJsPath -Encoding UTF8 -Force

# -----------------------------
# scanProject.js
# -----------------------------
$scannerContent = @"
const fs = require('fs');
const path = require('path');
const projectRoot = path.resolve('.');
const outputFile = 'project-structure.txt';

function scanDir(dir, indent='') {
    const items = fs.readdirSync(dir);
    for (let item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) { fs.appendFileSync(outputFile, \${indent}📁 \${item}\n); scanDir(fullPath, indent+'  '); }
        else { fs.appendFileSync(outputFile, \${indent}📄 \${item} (\${stats.size} bytes)\n); }
    }
}

fs.writeFileSync(outputFile, Project scan: \${projectRoot}\n\n);
scanDir(projectRoot);
console.log('✅ Project scanned! See project-structure.txt');
"@
$scannerPath | Set-Content -Path $scannerPath -Encoding UTF8 -Force
$scannerContent | Set-Content -Path $scannerPath -Encoding UTF8 -Force

# -----------------------------
# GitHub push
# -----------------------------
$gitRepoUrl = 'https://github.com/Samuelfloki001/MoneyIn-The-Bank-.git'
if (-not (Test-Path ".git")) { git init }
try { git pull origin main --allow-unrelated-histories } catch {}
git add .
git commit -m "Auto setup: project updated"
git push origin main

# -----------------------------
# Run Node scanner
# -----------------------------
node $scannerPath
