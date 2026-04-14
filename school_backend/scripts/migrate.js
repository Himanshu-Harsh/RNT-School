const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function migrate() {
    console.log("🚀 Starting Cloud Migration...");
    
    if (!process.env.DB_HOST || process.env.DB_HOST.includes('localhost')) {
        console.error("❌ Error: DB_HOST is set to localhost. Please update your .env with Aiven credentials.");
        process.exit(1);
    }

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        multipleStatements: true
    });

    try {
        const sqlPath = path.resolve(__dirname, '../../school_backup.sql');
        
        if (!fs.existsSync(sqlPath)) {
            console.error(`❌ Error: Backup file not found at ${sqlPath}`);
            process.exit(1);
        }

        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        console.log(`📡 Connected to: ${process.env.DB_HOST}`);
        console.log("⏳ Uploading data to Aiven (this may take a moment)...");
        
        await connection.query(sql);
        
        console.log("✅ Success! Your database is now live on Aiven.");
    } catch (err) {
        console.error("❌ Migration Failed:", err.message);
    } finally {
        await connection.end();
    }
}

migrate();
