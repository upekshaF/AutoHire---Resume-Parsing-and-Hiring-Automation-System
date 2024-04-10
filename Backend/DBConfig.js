import pkg from 'pg';
const {Pool} = pkg;
const itemsPool = new Pool({
    connectionString: "postgres://resumeparser:wvntrLJr2zgcuHuO35kCxoL8BlYdTutb@dpg-co3f4la1hbls73f0r7fg-a.singapore-postgres.render.com/resumeparserdb",
    ssl: {
        rejectUnauthorized: false
    }
});

export default itemsPool;
