class SchoolModel {
    constructor(db) {
        this.db = db;
    }

    async addSchool(name, address, latitude, longitude) {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const values = [name, address, latitude, longitude];
        return new Promise((resolve, reject) => {
            this.db.query(query, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    }

    async listSchools() {
        const query = 'SELECT * FROM schools';
        return new Promise((resolve, reject) => {
            this.db.query(query, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
}

module.exports = SchoolModel;