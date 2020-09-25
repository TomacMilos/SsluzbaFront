import { Course } from './course';
import { ExamPeriod } from './exam-period';
import { Student } from './student';

export class Exam {
    public id: number;
    public examPoints: number;
    public labPoints: number;
    public date: Date;
    public course: Course;
    public student: Student;
    public examPeriod: ExamPeriod;

    constructor(examCfg: ExamInterface)
	{
  this.id = examCfg.id;
  this.examPeriod = examCfg.examPeriod;
  this.labPoints = examCfg.labPoints;
  this.date = examCfg.date;
  this.course = examCfg.course;
  this.student = examCfg.student;
  this.examPeriod = examCfg.examPeriod;
	}
}

interface ExamInterface{
	id?: number;
    examPoints: number;
    labPoints: number;
    date: Date;
    course: Course;
    student: Student;
    examPeriod: ExamPeriod;
}

