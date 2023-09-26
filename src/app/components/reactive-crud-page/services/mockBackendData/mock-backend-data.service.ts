import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

export interface Dreams {
  id: number;
  name: string;
  description: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class MockBackendDataService implements InMemoryDbService {
  constructor() {}

  createDb(reqInfo?: any): {} | Observable<{}> | Promise<{}> {
    return {
      dreams: [
        {
          id: 1,
          name: 'Jeep Wrangler Rubicon',
          description: 'Looks nice and very safe.',
          rating: 2,
        },
        {
          id: 2,
          name: 'Master Angular',
          description: 'I simply love frontend development and Angular.',
          rating: 4,
        },
        {
          id: 3,
          name: 'Cosy house',
          description: 'In a small quiet village.',
          rating: 3,
        },
        {
          id: 4,
          name: 'Perfect health',
          description: 'Most of important.',
          rating: 5,
        },
      ],
    };
  }
}
