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


const appRoutes: Routes = [
  { path: '', component: StudentComponent},
  { path: 'courses', component: CourseComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [StudentService, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
