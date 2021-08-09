import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseComponent } from './components/course/course.component';
import { CourseService } from './shared_service/course.service';
import { StudentComponent } from './components/student/student.component';
import { StudentService } from './shared_service/student.service';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherFormComponent } from './components/teacher-form/teacher-form.component';
import { TeacherService } from './shared_service/teacher.service';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { EnrollmentService } from './shared_service/enrollment.service';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExamPeriodComponent } from './components/exam-period/exam-period.component';
import { ExamPeriodServiceService } from './shared_service/exam-period-service.service';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { DatePipe } from '@angular/common';
import { TokenInterceptorService } from './shared_service/token-interceptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';



const appRoutes: Routes = [

  {
    path: 'students', component: StudentComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'courses', component: CourseComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'student-form/:id', component: StudentFormComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'course-form/:id', component: CourseFormComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN', 'NASTAVNIK']
    }
  },
  {
    path: 'teachers', component: TeacherComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'enrollment-form', component: EnrollmentComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN', 'NASTAVNIK']
    }
  },
  {
    path: 'teacher-form/:id', component: TeacherFormComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'exam-period', component: ExamPeriodComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'exam-period-form/:id', component: ExamPeriodFormComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'document-form', component: DocumentFormComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'payments', component: PaymentComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'payment-form', component: PaymentFormComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'exams', component: ExamComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'exam-form', component: ExamFormComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'exam-info', component: ExamInformationFormComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN', 'NASTAVNIK', 'STUDENT']
    }
  },
  {
    path: 'teacher-page', component: TeacherPageComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN', 'NASTAVNIK']
    }
  },
  { path: '', component: LoginComponent },
  {
    path: 'register-admin', component: RegisterAdminComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  { path: 'register-student', component: RegisterStudentComponent },
  {
    path: 'register-teacher', component: RegisterTeacherComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'student-page', component: StudentPageComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN', 'STUDENT']
    }
  },
  {
    path: 'exam-registration', component: ExamRegistrationComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN', 'NASTAVNIK', 'STUDENT']
    }
  },
  {
    path: 'exam-date', component: ExamDateComponent, canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  }

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
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule
  ],
  providers: [StudentService, CourseService, TeacherService, EnrollmentService,
    ExamPeriodServiceService, DocumentsService, ExamService, PaymentService, PaymentFormComponent, ExamComponent,
    ExamFormComponent, LoginService, ExamRegistrationComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true //za multiple interceptors ako su potrebni
    }, AuthGuard, RoleGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
