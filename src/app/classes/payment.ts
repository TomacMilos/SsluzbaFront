import{Student}from'./student';

export class Payment implements PaymentInterface{

    public id: number;
    public svrhaUplate: string;
    public vrednostUplate: number;
    public date: Date;
	public student: Student;
		
	constructor(paymentCfg:PaymentInterface)
	{	
        this.id = paymentCfg.id;
        this.svrhaUplate = paymentCfg.svrhaUplate;
        this.vrednostUplate = paymentCfg.vrednostUplate;
        this.date = paymentCfg.date;
		this.student = paymentCfg.student;
	}

}

interface PaymentInterface{
    id?: number;
    svrhaUplate: string;
    vrednostUplate: number;
    date: Date;
	student: Student;
}
