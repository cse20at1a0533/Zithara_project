const db = require('../models/db');

exports.getData = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, search, sortBy } = req.query;
    let query = 'SELECT * FROM data';

    if (search) {
      query += ` WHERE customer_name ILIKE '%${search}%' OR location ILIKE '%${search}%'`;
    }

    if (sortBy === 'date') {
      query += ' ORDER BY DATE(created_at)';
    } else if (sortBy === 'time') {
      query += ' ORDER BY TIME(created_at)';
    }

    query += ` LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;

    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
