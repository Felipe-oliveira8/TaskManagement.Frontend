import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IOption, User } from 'src/app/comum/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
   selector: 'app-activity-create',
   templateUrl: './activity-create.component.html',
   styleUrls: ['./activity-create.component.scss'],
})
export class ActivityCreateComponent implements OnInit {
   users: User[];

   activity = this.formBuilder.group({
      taskId: [null],
      description: [null, [Validators.required]],
      status: [null, [Validators.required]],
   });

   optionsStatus: Array<IOption> = [
      { codigo: 0, descricao: 'Não Iniciada' },
      { codigo: 1, descricao: 'Em Andamento' },
      { codigo: 2, descricao: 'Aguardando' },
      { codigo: 3, descricao: 'Concluido' },
   ];

   editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '150px',
      maxHeight: '400px',
      width: 'auto',
      minWidth: '300px',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Informe a Descrição',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
         { class: 'arial', name: 'Arial' },
         { class: 'times-new-roman', name: 'Times New Roman' },
         { class: 'calibri', name: 'Calibri' },
         { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      ],
      customClasses: [
         {
            name: 'quote',
            class: 'quote',
         },
         {
            name: 'redText',
            class: 'redText',
         },
         {
            name: 'titleText',
            class: 'titleText',
            tag: 'h1',
         },
      ],
      sanitize: false,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
         ['bold', 'italic', 'subscript', 'superscript'],
         ['fontSize', 'insertImage', 'insertVideo'],
      ],
   };

   constructor(
      @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef: MatDialogRef<ActivityCreateComponent>,
      private api: ApiService,
      private formBuilder: FormBuilder
   ) {}

   ngOnInit() {
      if (this.data) {
         this.activity.get('taskId').setValue(this.data.id);
         this.activity.get('status').setValue(this.data.status);
      }
   }

   async createActivity() {
      await this.api.createActivity(this.activity.getRawValue());
      this.dialogRef.close(this.activity.getRawValue());
   }

   fechar() {
      this.dialogRef.close();
   }
}
