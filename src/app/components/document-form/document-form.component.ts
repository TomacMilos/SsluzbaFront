import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Documents } from '../../classes/documents';
import { Student } from '../../classes/student';
import { StudentService } from "../../shared_service/student.service";
import { DocumentsService } from "../../shared_service/documents.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {

  documents: Documents;
  students: Student[];

  constructor(private route: ActivatedRoute, private studentService: StudentService,
     private documentsService: DocumentsService,
    private location: Location) {
    this.documents = new Documents({
      naziv: null,
      student: new Student({
        cardNumber: '',
        firstName: '',
        lastName: ''
      }),
    });

  }

  ngOnInit() {
    this.studentService.getStudents().then(students =>
      this.students = students);
  }

  add(): void {
    this.documentsService.addDocument(this.documents)
      .then(documents => {
        this.documentsService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
