import { Authority } from './authority';

export class Login implements LoginInterface{
	public id: number;
	public username: string;
	public password: string;
    public authority: Authority;
    public studentid: number;
    public teacherid: number;
    
	
	constructor(loginCfg:LoginInterface)
	{	
		this.id = loginCfg.id;
		this.username = loginCfg.username;
		this.password = loginCfg.password;
        this.authority = loginCfg.authority;	
        this.studentid = loginCfg.studentid;
		this.teacherid = loginCfg.teacherid;			
	}
}

interface LoginInterface{
	id?: number;
	username: string;
	password: string;
    authority: Authority;
    studentid: number;
    teacherid: number;
}