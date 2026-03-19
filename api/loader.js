export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    const robloxId = req.headers['x-roblox-id']; // Header khusus dari internal Roblox
    const isRoblox = userAgent.includes('Roblox');

    // 1. DAFTAR BLOKIR (Termasuk Browser, Curl, Python, Go-http, dll)
    const blacklistedAgents = [
        'Mozilla', 'Chrome', 'Safari', 'Firefox', 'Edge', // Browser
        'curl', 'python-requests', 'postman', 'insomnia', // Tools
        'go-http-client', 'axios', 'node-fetch'           // Libraries
    ];

    const isBlacklisted = blacklistedAgents.some(agent => 
        userAgent.toLowerCase().includes(agent.toLowerCase())
    );

    // 2. LOGIKA VALIDASI
    // Kita cek: Harus ada unsur "Roblox" DAN bukan dari daftar blacklist
    if (isBlacklisted || !isRoblox) {
        return res.status(403).send(`
            <html>
                <body style="background:#000;color:#ff4444;font-family:mono;text-align:center;padding-top:100px;">
                    <h1>403 FORBIDDEN</h1>
                    <p>Security Breach Detected: Unauthorized Header</p>
                    <p style="color:#555;">IP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}</p>
                </body>
            </html>
        `);
    }

    // 3. REDIRECT JIKA LOLOS FILTER
    // Gunakan 307 Temporary Redirect agar browser/cache tidak menyimpan link aslinya
    res.setHeader('Cache-Control', 'no-store');
    return res.redirect(307, 'https://raw.githubusercontent.com/xploitforceofficial-stack/pinathubheavy1/refs/heads/main/main.lua');
}
