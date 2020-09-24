import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule}   from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { CourseComponent } from './components/course/course.component';
import {CourseService} from './shared_service/course.service';
import { StudentComponent } from './components/student/student.component';
import {StudentService} from './shared_service/student.service';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherFormComponent } from './components/teacher-form/teacher-form.component';
import {TeacherService} from './shared_service/teacher.service';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import {EnrollmentService} from './shared_service/enrollment.service';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExamPeriodComponent } from './components/exam-period/exam-period.component';
import {ExamPeriodServiceService} from './shared_service/exam-period-service.service';


const appRoutes: Routes = [
  { path: '', component: StudentComponent},
  { path: 'courses', component: CourseComponent},
  { path: 'student-form', component: StudentFormComponent},
  { path: 'course-form', component: CourseFormComponent},
  { path: 'teachers', component: TeacherComponent},
  { path: 'enrollment-form', component: EnrollmentComponent},
  { path: 'teacher-form', component: TeacherFormComponent},
  { path: 'exam-period', component: ExamPeriodComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    StudentComponent,
    TeacherComponent,
    StudentFormComponent,
    TeacherFormComponent,
    CourseFormComponent,
    EnrollmentComponent,
    ExamPeriodComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StudentService, CourseService, TeacherService, EnrollmentService,ExamPeriodServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
