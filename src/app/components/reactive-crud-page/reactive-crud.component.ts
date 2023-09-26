import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DreamsService } from './services/dreams-service/dreams.service';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  forkJoin,
  map,
  of,
  tap,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Dreams } from './services/mockBackendData/mock-backend-data.service';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-crud',
  templateUrl: './reactive-crud.component.html',
  standalone: true,
  styleUrls: ['./reactive-crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HighlightDirective],
})
export class ReactiveCrudComponent implements OnInit {
  isSelectedRowIdSubject = new BehaviorSubject<number>(0);
  isSelectedRowId$ = this.isSelectedRowIdSubject.asObservable();
  dreams$!: Observable<Dreams[]>;
  lastDreamId = 0;

  constructor(
    private readonly dreamsService: DreamsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.dreams$ = this.getDreams().pipe(
      tap((data: Dreams[]) => {
        this.lastDreamId = data.length + 1;
      })
    );
  }

  onRowSelected(id: number): void {
    this.isSelectedRowIdSubject.next(id);
  }

  navigateToEditDreamPage(id: number): void {
    this.router.navigate(['/edit-dream', id]);
  }

  getDreams(): Observable<Dreams[]> {
    return this.dreamsService.getDreams().pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return EMPTY;
      })
    );
  }

  addDream(): void {
    this.router.navigate(['/add-dream', this.lastDreamId]);
  }

  deleteDream(id: number): void {
    const deleteDream = this.dreamsService.deleteDream(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return EMPTY;
      })
    );
    const data: Observable<Dreams[]> = forkJoin([
      this.getDreams(),
      deleteDream,
    ]).pipe(map(([dreams, _]) => dreams));
    this.dreams$ = data;
  }

  handleError(err: HttpErrorResponse): Observable<HttpErrorResponse> {
    return of(err);
  }
}
