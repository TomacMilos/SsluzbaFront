export class TeacherStudentID implements TeacherStudentIDInterface {
    public teacherID: number;
    public studentID: number;
    constructor(teacherCfg: TeacherStudentIDInterface) {
        this.teacherID = teacherCfg.teacherID;
        this.studentID = teacherCfg.studentID;
    }

}

interface TeacherStudentIDInterface {
    teacherID: number;
    studentID: number;
}
