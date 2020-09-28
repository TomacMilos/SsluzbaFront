import { Authority } from './authority';
import { Student } from './student';
import { Teacher } from './teacher';

export class Login implements LoginInterface{
	public id: number;
	public username: string;
	public password: string;
    public authority: Authority;
    public student: Student;
    public teacher: Teacher;
    
	
	constructor(loginCfg:LoginInterface)
	{	
		this.id = loginCfg.id;
		this.username = loginCfg.username;
		this.password = loginCfg.password;
        this.authority = loginCfg.authority;	
        this.student = loginCfg.student;
		this.teacher = loginCfg.teacher;			
	}
}

interface LoginInterface{
	id?: number;
	username: string;
	password: string;
    authority: Authority;
    student: Student;
    teacher: Teacher;
}