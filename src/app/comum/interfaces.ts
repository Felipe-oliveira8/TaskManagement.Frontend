import { StatusTask } from 'src/app/Enums/enum';

export interface Login {
   email: string;
   password: string;
}

export interface Logged {
   token: string;
}

export interface Task {
   taskId?: string;
   sequenceNumber?: number;
   title?: string;
   description?: string;
   generatorId?: string;
   generatorName?: string;
   responsibleId?: string;
   responsibleName?: string;
   status?: StatusTask;
   openingDate?: string;
   activitiesIds?: string[];
}

export interface User {
   id: string;
   name: string;
   password: string;
   login: string;
   email: string;
   phone: number;
   cpf: number;
}

export interface Activity {
   taskId: string;
   description: string;
   status: StatusTask;
   sequence: number;
   generatorName: string;
   date: Date;
}

export interface IOption {
   codigo: string | number;
   descricao: string;
}
