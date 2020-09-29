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
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentService } from './shared_service/payment.service';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ExamComponent } from './components/exam/exam.component';
import { ExamFormComponent } from './components/exam-form/exam-form.component';
import { ExamInformationFormComponent } from './components/exam-information-form/exam-information-form.component';
import { TeacherPageComponent } from './components/teacher-page/teacher-page.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './shared_service/login.service';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterTeacherComponent } from './components/register-teacher/register-teacher.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { StudentPageComponent } from './components/student-page/student-page.component';
import { ExamRegistrationComponent } from './components/exam-registration/exam-registration.component';
import { ExamDateComponent } from './components/exam-date/exam-date.component';



const appRoutes: Routes = [
  { path: 'students', component: StudentComponent},
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
  { path: 'payments', component: PaymentComponent},
  { path: 'payment-form', component: PaymentFormComponent},
  { path: 'exams', component: ExamComponent},
  { path: 'exam-form', component: ExamFormComponent},
  { path: 'exam-info', component: ExamInformationFormComponent},
  { path: 'teacher-page', component: TeacherPageComponent},
  { path: '', component: LoginComponent},
  { path: 'register-admin', component: RegisterAdminComponent},
  { path: 'register-student', component: RegisterStudentComponent},
  { path: 'register-teacher', component: RegisterTeacherComponent},
  { path: 'student-page', component: StudentPageComponent},
  { path: 'exam-registration', component: ExamRegistrationComponent},
  {path: 'exam-date', component: ExamDateComponent}

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
    DocumentFormComponent,
    PaymentComponent,
    PaymentFormComponent,
    ExamComponent,
    ExamFormComponent,
    ExamInformationFormComponent,
    TeacherPageComponent,
    LoginComponent,
    RegisterStudentComponent,
    RegisterTeacherComponent,
    RegisterAdminComponent,
    StudentPageComponent,
    ExamRegistrationComponent,
    ExamDateComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StudentService, CourseService, TeacherService, EnrollmentService,
    ExamPeriodServiceService, DocumentsService,ExamService, PaymentService, PaymentFormComponent, ExamComponent,
    ExamFormComponent, LoginService, ExamRegistrationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
