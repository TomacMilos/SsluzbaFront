export class Teacher implements TeacherInterface{
    public id: number;
public firstName: string;
public lastName: string;
constructor(teacherCfg: TeacherInterface)
{
this.id = teacherCfg.id;
this.firstName = teacherCfg.firstName;
this.lastName = teacherCfg.lastName;
}

}

interface TeacherInterface{
id?: number;
firstName: string;
lastName: string;
}
