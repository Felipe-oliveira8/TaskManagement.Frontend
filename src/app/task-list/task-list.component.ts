import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusTask } from 'src/app/Enums/enum';
import { Task } from 'src/app/comum/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
   selector: 'app-task',
   template: `<app-list
      [columns]="columns"
      [buttonAddFunction]="createTask.bind(this)"
      [detail]="taskDetail.bind(this)"
      [buttonAddName]="'Adicionar Tarefa'"
      [title]="'Lista de Tarefas'"
      [fields]="fields"
      [data]="tasks"
   ></app-list> `,
})
export class TaskListComponent implements OnInit {
   tasks: Task[];
   status = StatusTask;

   columns = [
      { name: 'Número', width: '10%' },
      { name: 'Título', width: '35%' },
      { name: 'Status', width: '15%' },
      { name: 'Gerador', width: '20%' },
      { name: 'Responsavel', width: '20%' },
   ];

   fields = [
      'sequenceNumber',
      'title',
      'status',
      'generatorName',
      'responsibleName',
   ];

   constructor(private router: Router, private api: ApiService) {}

   ngOnInit() {
      this.getTasks();
   }

   async getTasks() {
      const result = await this.api.getTasks();
      this.tasks = result;
   }

   createTask() {
      this.router.navigate(['/task/create']);
   }

   taskDetail(task: Task) {
      this.router.navigate([`/task/${task.taskId}`]);
   }

   classStatus(status: string) {
      switch (status) {
         case 'Não Iniciada':
            return 'not-started';
         case 'Em Andamento':
            return 'in-progress';
         case 'Aguardando':
            return 'waiting';
         case 'Concluido':
            return 'concluded';
      }
   }
}
