import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import{FormsModule}   from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { CourseComponent } from './components/course/course.component';
import {CourseService} from './shared_service/course.service';
import { StudentComponent } from './components/student/student.component';
import {StudentService} from './shared_service/student.service';
import { TeacherComponent } from './components/teacher/teacher.component';
import {TeacherService} from './shared_service/teacher.service';
import { StudentFormComponent } from './components/student-form/student-form.component';


const appRoutes: Routes = [
  { path: '', component: StudentComponent},
  { path: 'courses', component: CourseComponent},
  { path: 'student-form', component: StudentFormComponent},
  { path: 'teachers', component: TeacherComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    StudentComponent,
    TeacherComponent,
    StudentFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [StudentService, CourseService, TeacherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
