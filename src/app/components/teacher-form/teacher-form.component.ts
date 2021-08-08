import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../classes/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../shared_service/teacher.service';
import { Subject } from 'rxjs';
import { Course } from '../../classes/course'
import { faPlus, faSave, faTimes, faTrash, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  public teacher: Teacher;
  courses: Course[];
  public teacherRank = '';
  public selectedTeacherRank = '';
  course: Course;
  teacherId: any;
  loaded = false;
  faTimes = faTimes;
  faPlus = faPlus;
  faSave = faSave;
  isAdd = false;
  coursesAdd: any;
  ranks: any[];
  faUser = faUserAlt

  constructor(private teacherService: TeacherService, private router: Router, private route: ActivatedRoute, private config: NgSelectConfig) { 
    this.ranks = ["Profesor", "Asistent", "Demonstrator" ];
  }

  ngOnInit() {
    this.config.notFoundText = "Profesor je na svim kursevima";

    this.route.params.subscribe(params => {
      this.teacherId = params['id'];
    });
    if (this.teacherId !== 'new') {

      this.teacherService.getCourses(this.teacherId).subscribe(res => {
        this.coursesAdd = res;
        console.log(this.coursesAdd)
      });


      this.teacherService.getTeacherById(this.teacherId).subscribe(res => {
        this.teacher = res;

        if (this.teacherId !== undefined) {
          this.teacherService.getTeacherCourses(this.teacherId).then(courses =>
            this.courses = courses);
            this.teacherRank = this.teacher.teacherRank;
        }

        else {
          this.teacher = {
            id: undefined,
            firstName: '',
            lastName: '',
            teacherRank: ''
          };
        }
        this.loaded = true;
      });
    }
  }

  onChange(event) {
    this.teacherRank = event.target.options[event.target.options.selectedIndex].text;
  }

  addNewCourse() {
    this.isAdd = true;
    console.log(this.isAdd)
  }

  cancelCourse() {
    this.isAdd = false;
  }

  addCourse() {
    if (!this.course) {
      alert("Izaberite kurs koji zelite da dodate")
    } else {
      var course = this.course;
      this.teacherService.addCourse(this.teacher.id, course.id)
        .then(co => {
          this.courses.push(course);
          this.coursesAdd.forEach((value, index) => {
            if (value == course) this.coursesAdd.splice(index, 1);
          });
        });
      this.isAdd = false;
    }
  }

  deleteCourse(course: Course) {
    this.teacherService.removeCourse(this.teacher.id, course.id)
      .then(co => {
        this.coursesAdd.push(course)
        this.courses.forEach((value, index) => {
          if (value == course) this.courses.splice(index, 1);
        });
      });
  }


  processForm() {
    if (this.teacher.id === undefined) {

      this.teacher.teacherRank = this.teacherRank;
      this.teacherService.addTeacher(this.teacher)
        .then(teacher => {
          this.router.navigate(['teachers']);
        });
    } else {
      this.teacher.teacherRank = this.teacherRank;
      this.teacherService.editTeacher(this.teacher)
        .then(teacher => {
          this.router.navigate(['teachers']);
        });
    }
  }

}
