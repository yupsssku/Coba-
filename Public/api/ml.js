const axios = require('axios');

module.exports = async (req, res) => {
  // Set CORS headers untuk hanya mengizinkan gamesnowku.xyz
  const allowedOrigins = [
    'https://gamesnowku.xyz/freefire/',
    'https://www.gamesnowku.xyz/mobilelegends/'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { id, server } = req.query;
    
    if (!id || !server) {
      return res.status(400).json({
        success: false,
        message: 'Parameter id dan server diperlukan',
        example: '/api/ml?id=1114917746&server=13486'
      });
    }

    const apiUrl = `https://api.isan.eu.org/nickname/ml?id=${id}&server=${server}`;
    console.log('Fetching Mobile Legends data from:', apiUrl);
    
    const response = await axios.get(apiUrl, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    res.json({
      success: true,
      game: "Mobile Legends",
      id: id,
      server: server,
      data: response.data
    });
    
  } catch (error) {
    console.error('Error fetching Mobile Legends data:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json({
        success: false,
        message: 'Error dari API external Mobile Legends',
        error: error.response.data
      });
    } else if (error.request) {
      res.status(503).json({
        success: false,
        message: 'Tidak dapat terhubung ke API external Mobile Legends'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
};
