import { BaseDAO, schema, SqlDatabase } from "sqlite3orm";
import { EmailInput } from "../Model/Email";

export class DatabaseService {

    private static sqldb: SqlDatabase;
    emailDAO!: BaseDAO<EmailInput>;

    constructor(){
        this.emailDAO = new BaseDAO(EmailInput, DatabaseService.sqldb);
    }

    public static async init(){
        DatabaseService.sqldb = new SqlDatabase();
        await DatabaseService.sqldb.open('./db/emails.sqlite3');
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