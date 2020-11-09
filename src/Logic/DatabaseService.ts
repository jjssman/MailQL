import { BaseDAO, schema, SqlDatabase } from "sqlite3orm";
import { EmailInput } from "../Model/Email";
import path from 'path';
import fs from 'fs';
import config from 'config';

export class DatabaseService {

    private static sqldb: SqlDatabase;
    emailDAO!: BaseDAO<EmailInput>;

    constructor(){
        this.emailDAO = new BaseDAO(EmailInput, DatabaseService.sqldb);
    }

    public static async init(){
        DatabaseService.sqldb = new SqlDatabase();

        const DB_File = <string> config.get('DB_File');
        const dbDir = path.dirname(DB_File);
        if(!fs.existsSync(dbDir)){
            fs.mkdirSync(dbDir, { recursive: true });
        }
        await DatabaseService.sqldb.open(DB_File);

        await schema().createTable(DatabaseService.sqldb, 'emails');
    }

    async findById(id: Number){
        return this.emailDAO.selectAll({
            where: { id: { eq: id } },
            limit: 1
        }).then(emails => emails[0]);
    }

    async findAll(mailbox: string){
        return this.emailDAO.selectAll({ recipient: mailbox });
    }

}