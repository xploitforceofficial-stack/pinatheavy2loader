export default async function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    const secChUa = req.headers['sec-ch-ua']; // Header modern browser (Client Hints)
    const referer = req.headers['referer'] || '';

    // 1. FILTER TOOLS OTOMATIS (Tetap blokir yang non-browser)
    const botAgents = [
        'curl', 'python', 'postman', 'insomnia', 'go-http', 
        'axios', 'node-fetch', 'wget', 'http-client'
    ];
    
    const isBot = botAgents.some(agent => userAgent.toLowerCase().includes(agent));

    // 2. LOGIKA VALIDASI
    // Browser modern biasanya mengirimkan header 'sec-ch-ua' atau 'accept' yang spesifik.
    // Tools sederhana seperti curl biasanya tidak mengirimkan ini secara lengkap.
    const isBrowser = !!secChUa || userAgent.includes('Mozilla');

    if (isBot || !isBrowser) {
        return res.status(403).json({
            error: "Security Check Failed",
            message: "Automated access is strictly prohibited."
        });
    }

    // 3. KEAMANAN TAMBAHAN (Anti-Hotlinking)
    // Opsional: Jika Anda ingin link ini hanya bisa diklik dari situs tertentu
    // const allowedReferer = 'your-website.com';
    // if (!referer.includes(allowedReferer)) { /* blokir jika perlu */ }

    // 4. PREVENT CACHE
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');

    // 5. REDIRECT
    // Menggunakan 302 agar browser selalu mengecek ke server setiap kali link diklik
    return res.redirect(302, 'https://raw.githubusercontent.com/xploitforceofficial-stack/pinathubheavy1/refs/heads/main/main.lua');
}
