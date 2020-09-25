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
import { ExamPeriodFormComponent } from './components/exam-period-form/exam-period-form.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentsService } from './shared_service/documents.service';
import { DocumentFormComponent } from './components/document-form/document-form.component';
import { ExamService } from './shared_service/exam.service';


const appRoutes: Routes = [
  { path: '', component: StudentComponent},
  { path: 'courses', component: CourseComponent},
  { path: 'student-form', component: StudentFormComponent},
  { path: 'course-form', component: CourseFormComponent},
  { path: 'teachers', component: TeacherComponent},
  { path: 'enrollment-form', component: EnrollmentComponent},
  { path: 'teacher-form', component: TeacherFormComponent},
  { path: 'exam-period', component: ExamPeriodComponent},
  { path: 'exam-period-form', component: ExamPeriodFormComponent},
  { path: 'documents', component: DocumentsComponent},
  { path: 'document-form', component: DocumentFormComponent},
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
    ExamPeriodComponent,
    ExamPeriodFormComponent,
    DocumentsComponent,
    DocumentFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StudentService, CourseService, TeacherService, EnrollmentService, ExamPeriodServiceService, DocumentsService,ExamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
