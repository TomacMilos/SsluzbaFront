import{Student}from'./student';

export class Documents implements DocumentsInterface{
	public id: number;
	public naziv: string;
	public student: Student;
		
	constructor(documentsCfg:DocumentsInterface)
	{	
        this.id = documentsCfg.id;
        this.naziv = documentsCfg.naziv;
        this.student = documentsCfg.student;		
	}
}

interface DocumentsInterface{
    id?: number;
    naziv: string;
    student: Student;
}