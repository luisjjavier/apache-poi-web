import {Component, OnInit} from '@angular/core';
import {DocumentsService} from '../services/documents.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {saveAs as importedSaveAs} from 'file-saver';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private documentsService: DocumentsService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      filename: [null, [Validators.required]],
      paragraph: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.documentsService.getDocument(this.validateForm.getRawValue()).subscribe((data) => {
      const blob = new Blob([data], {type: 'text/csv'});
      importedSaveAs(blob, this.validateForm.controls['filename'].value + '.docx');
      this.validateForm.reset();
    });
  }
}
