/**
 * CTF Challenge: Level 1 - Phase Logic
 */

// ページ読み込み時にコンソールにヒントを出す
window.onload = () => {
    console.log("%cSYSTEM: 脆弱性を検出しました。", "color: red; font-weight: bold; font-size: 16px;");
    console.log("ヒント: 認証アルゴリズムに欠陥があります。' OR '1'='1 などの SQLインジェクションが有効かもしれません。");
};

// ログインボタン押下時のメイン処理
function submitFeedback() {
    const user = document.getElementById('login_form').value;
    const pass = document.getElementById('password_form').value;

    // --- Level 2: SQL Injection Simulation ---
    const sqliPattern = /' OR '1'='1/i;

    if (sqliPattern.test(user) || sqliPattern.test(pass)) {
        startHackingEffect();
    } else {
        alert("認証エラー: ユーザーIDまたはパスワードが正しくありません。");
        console.warn("ATTEMPT: ログイン失敗 - " + user);
    }
}

// --- Level 3: Hacking Visual Effect ---
function startHackingEffect() {
    const body = document.body;

    // --- ここで背景のグラデーションを完全に消去 ---
    body.style.background = "black"; // 背景色とグラデーションの両方をリセット
    body.style.backgroundImage = "none"; 
    body.style.color = "#00FF00";
    body.style.fontFamily = "'Courier New', Courier, monospace";
    body.style.padding = "20px";
    body.style.display = "block"; // 中央寄せを解除して上からログが出るようにする
    body.style.overflowY = "auto";
    
    // 既存のコンテンツ（ログインフォーム）を消去
    body.innerHTML = '<div id="terminal" style="font-size: 1.2rem; line-height: 1.5;"></div>';

    const terminal = document.getElementById('terminal');
    
    const logs = [
        "> [CRITICAL] Authentication Bypass detected...",
        "> Initializing exploit: 'SQLi-Gate-Cracker'...",
        "> Connecting to remote server... [SUCCESS]",
        "> Bypassing firewall... [DONE]",
        "> Injecting SQL payload: ' OR '1'='1' --",
        "> Extracting database: table 'users'...",
        "> Found administrator credentials.",
        "> Fetching system logs...",
        "> [!] SYSTEM COMPROMISED",
        "> ---------------------------------------",
        "> FLAG{sql_injection_master_2026}",
        "> ---------------------------------------",
        "> Clearing logs and exiting..."
    ];

    let lineIndex = 0;

    function printLog() {
        if (lineIndex < logs.length) {
            const line = document.createElement('div');
            line.style.marginBottom = "5px";
            // 最後のフラグだけ色を変えて目立たせる
            if (logs[lineIndex].includes("FLAG")) {
                line.style.color = "#FFFF00"; // 黄色
                line.style.fontWeight = "bold";
                line.style.fontSize = "1.5rem";
            }
            
            line.textContent = logs[lineIndex];
            terminal.appendChild(line);
            lineIndex++;
            
            // スクロールを自動で下へ
            window.scrollTo(0, document.body.scrollHeight);
            
            setTimeout(printLog, Math.random() * 400 + 100);
        } else {
            setTimeout(() => {
                alert("MISSION COMPLETE: 全てのデータを取得しました。");
            }, 500);
        }
    }

    printLog();
}