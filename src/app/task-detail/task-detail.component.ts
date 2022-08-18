import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityCreateComponent } from 'src/app/activity-create/activity-create.component';
import { Activity, IOption, Task, User } from 'src/app/comum/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
   selector: 'app-task-detail',
   templateUrl: './task-detail.component.html',
   styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
   tasks: Task[];
   taskId: string;
   activityList: Activity[];

   taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      generatorId: [''],
      generatorName: [''],
      responsibleName: [''],
   });

   optionsStatus: Array<IOption> = [
      { codigo: 0, descricao: 'Não Iniciada' },
      { codigo: 1, descricao: 'Em Andamento' },
      { codigo: 2, descricao: 'Aguardando' },
      { codigo: 3, descricao: 'Concluido' },
   ];

   constructor(
      private api: ApiService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private dialogRef: MatDialog
   ) {}

   ngOnInit() {
      this.taskId = this.route.snapshot.params.id;
      this.getTaskById();
      this.getActivities();
   }

   async getTaskById() {
      const result = await this.api.getTask(this.taskId);
      this.taskForm.patchValue(result);
   }

   async getActivities() {
      const result = await this.api.getActivities(this.taskId);
      this.activityList = result;
   }

   createActivity() {
      const dialog = this.dialogRef.open(ActivityCreateComponent, {
         data: { id: this.taskId, status: this.taskForm.get('status').value },
      });

      dialog.afterClosed().subscribe((result: Activity) => {
         this.taskForm.get('status').setValue(result.status);
         this.getActivities();
      });
   }
}
