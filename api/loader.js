export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // ===================================================
    // VERSI SUPER SIMPLE: HAMPIR SEMUA LOLOS
    // Cuma blokir yang jelas-jelas merusak server
    // ===================================================
    
    // Daftar hitam yang sangat minimal
    const BLACKLIST = [
        'curl',           // Command line tool - biasanya untuk scraping
        'python',         // Python scripts
        'go-http',        // Go language clients
        'java',           // Java clients
        'nikto',          // Security scanner
        'sqlmap',         // SQL injection tool
        'hydra'           // Brute force tool
    ];
    
    // Cek apakah ini serangan berbahaya
    const isAttack = BLACKLIST.some(agent => 
        userAgent.toLowerCase().includes(agent.toLowerCase())
    );
    
    // Log semua request untuk monitoring
    console.log(`${new Date().toISOString()} - ${ip} - ${userAgent || 'No UA'}`);
    
    // Blokir hanya yang benar-benar mencurigakan
    if (isAttack) {
        console.log(`⚠️ ATTACK DETECTED: ${ip} using ${userAgent}`);
        return res.status(403).send('Forbidden');
    }
    
    // Sisanya lolos semua
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow semua origin
    return res.redirect(307, 'https://raw.githubusercontent.com/xploitforceofficial-stack/pinathubheavy1/refs/heads/main/main.lua');
}
