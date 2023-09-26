import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, iif, map, of, retry } from 'rxjs';
import { Dreams } from '../mockBackendData/mock-backend-data.service';

const mockBackendUrl = 'api/dreams/';

@Injectable({
  providedIn: 'root',
})
export class DreamsService {
  isDreamEdited = false;
  isDreamAdded = false;
  constructor(private readonly http: HttpClient) {}

  getDreams(id?: number): Observable<Dreams[]> {
    const dataFromBackend$ = this.http.get<Dreams[]>(mockBackendUrl);
    const data: Observable<Dreams[]> = iif(
      () => !!id,
      dataFromBackend$.pipe(
        retry(3),
        map((data) => data.filter((el) => el.id === id)),
        catchError((err: HttpErrorResponse) => this.handleError(err))
      ),
      dataFromBackend$.pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => this.handleError(err))
      )
    );

    return data;
  }

  addDream(dream?: Dreams): Observable<any> {
    return this.http.post(mockBackendUrl, dream).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  updateDream(dream: Dreams): Observable<any> {
    return this.http.put(mockBackendUrl + dream.id, dream).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  deleteDream(id: number): Observable<any> {
    return this.http.delete(mockBackendUrl + id).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status !== 0) {
      return of(`Error! Server responded: ${err.message}.`);
    } else {
      return of('Error! You may have an issue with your internet connection.');
    }
  }

  onDreamEdited(data: boolean): void {
    console.log(data);
    this.isDreamEdited = data;
  }

  onDreamAdded(data: boolean): void {
    this.isDreamAdded = data;
  }
}
