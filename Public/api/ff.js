const axios = require('axios');

module.exports = async (req, res) => {
  // Set CORS headers untuk hanya mengizinkan gamesnowku.xyz
  const allowedOrigins = [
    'https://gamesnowku.xyz',
    'https://www.gamesnowku.xyz'
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
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Parameter id diperlukan',
        example: '/api/ff?id=123456789'
      });
    }

    const apiUrl = `https://api.isan.eu.org/nickname/ff?id=${id}`;
    console.log('Fetching Free Fire data from:', apiUrl);
    
    const response = await axios.get(apiUrl, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    res.json({
      success: true,
      game: "Free Fire", 
      id: id,
      data: response.data
    });
    
  } catch (error) {
    console.error('Error fetching Free Fire data:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json({
        success: false,
        message: 'Error dari API external Free Fire',
        error: error.response.data
      });
    } else if (error.request) {
      res.status(503).json({
        success: false,
        message: 'Tidak dapat terhubung ke API external Free Fire'
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
