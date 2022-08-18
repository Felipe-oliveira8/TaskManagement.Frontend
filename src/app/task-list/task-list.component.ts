import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusTask } from 'src/app/Enums/enum';
import { Task } from 'src/app/comum/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
   selector: 'app-task',
   templateUrl: './task-list.component.html',
   styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
   tasks: Task[];
   status = StatusTask;

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
