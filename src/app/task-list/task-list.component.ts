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
   public tasks: Task[];
   public status = StatusTask;

   public columns = [
      { name: 'Número', width: '10%' },
      { name: 'Título', width: '35%' },
      { name: 'Status', width: '15%' },
      { name: 'Gerador', width: '20%' },
      { name: 'Responsavel', width: '20%' },
   ];

   public fields = [
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

   public async getTasks(): Promise<void> {
      const result = await this.api.getTasks();
      this.tasks = result;
   }

   public createTask(): void {
      this.router.navigate(['/task/create']);
   }

   public taskDetail(task: Task): void {
      this.router.navigate([`/task/${task.taskId}`]);
   }

   public classStatus(status: string): string {
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
