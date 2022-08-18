import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IOption, Task, User } from 'src/app/comum/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
   selector: 'app-task-create',
   templateUrl: './task-create.component.html',
   styleUrls: ['./task-create.component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class TaskCreateComponent implements OnInit {
   tasks: Task[];
   users: User[];

   task = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      responsible: [''],
      responsibleId: [''],
      responsibleName: [''],
   });

   editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '150px',
      maxHeight: 'auto',
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
      private router: Router,
      private formBuilder: FormBuilder,
      private api: ApiService
   ) {}

   optionsStatus: Array<IOption> = [
      { codigo: 0, descricao: 'Não Iniciada' },
      { codigo: 1, descricao: 'Em Andamento' },
      { codigo: 2, descricao: 'Aguardando' },
      { codigo: 3, descricao: 'Concluido' },
   ];

   async ngOnInit() {
      await this.getResponsible();
      this.task.get('status').setValue(0);
   }

   async getResponsible() {
      const result = await this.api.getUsers();
      this.users = result;
   }

   async createTask() {
      this.task
         .get('responsibleId')
         .setValue(this.task.get('responsible').value.id);
      this.task
         .get('responsibleName')
         .setValue(this.task.get('responsible').value.name);
      await this.api.createTask(this.task.getRawValue());
      this.router
         .navigateByUrl('/', { skipLocationChange: true })
         .then(() => this.router.navigate(['/task/list']));
   }

   getOptionText(option) {
      return option.name;
   }
}
