import { Component, OnInit } from '@angular/core';
import {DocumentsService} from '../../shared_service/documents.service';
import {Documents} from '../../classes/documents';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {Student} from '../../classes/student';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  public documents: Documents[];
  subscription: Subscription

  constructor(private _documentsService: DocumentsService, private _router: Router) {
    this.subscription = _documentsService.RegenerateData$.subscribe(() =>
    this.getDocuments()
  );
   }

  ngOnInit(): void {

    if (JSON.parse(localStorage.getItem('user')) == null) {
      this._router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "NASTAVNIK") {
      this._router.navigate(['/teacher-page']);
    } else if (JSON.parse(localStorage.getItem('user')).authority.name == "STUDENT") {
      this._router.navigate(['/student-page']);
    }

    this.getDocuments();
  }

  getDocuments() {
    this._documentsService.getDocuments().then(documents =>
      this.documents = documents);
  }

  deleteDocument(documents: Documents): void {
    this._documentsService.deleteDocument(documents).then(
      () => this.getDocuments()
    );
  }
  
  newDocument(){
    let documents = new Documents({ 
      naziv: '',
      student: new Student({
        cardNumber: '',
        firstName: '',
        lastName: ''
      })
    });
    this._documentsService.setter(documents);
    this._router.navigate(['/document-form']);
  }

}
