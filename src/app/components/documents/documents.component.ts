import { Component, OnInit } from '@angular/core';
import {DocumentsService} from '../../shared_service/documents.service';
import {Documents} from '../../classes/documents';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {Student} from '../../classes/student';
import { faEdit, faFileAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  public documents: Documents[];
  subscription: Subscription
  faTrash = faTrash;
  faPlus = faPlus;
  faFileAlt = faFileAlt


  constructor(private _documentsService: DocumentsService, private _router: Router) {
    this.subscription = _documentsService.RegenerateData$.subscribe(() =>
    this.getDocuments()
  );
   }

  ngOnInit(): void {

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
