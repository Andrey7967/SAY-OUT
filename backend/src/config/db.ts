import dotenv from 'dotenv'
import path from 'path' 
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { Pool } from 'pg';
 const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
 
  
  ssl: {
    rejectUnauthorized: false 
  }
});


export default pool;
