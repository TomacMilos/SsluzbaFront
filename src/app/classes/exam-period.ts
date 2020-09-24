export class ExamPeriod {
public id: number;
public name: string;
public startDate: Date;
public endDate: Date;
constructor(examCfg: ExamPeriodInterface)
{
this.id = examCfg.id;
this.name = examCfg.name;
this.startDate = examCfg.startDate;
this.endDate = examCfg.endDate;
}

}

interface ExamPeriodInterface{
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;
}


