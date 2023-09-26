import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DreamsService } from '../../services/dreams-service/dreams.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Dreams } from '../../services/mockBackendData/mock-backend-data.service';
import { CommonModule } from '@angular/common';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-dream',
  templateUrl: './edit-dream.component.html',
  standalone: true,
  styleUrls: ['./edit-dream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditDreamComponent implements OnInit {
  id = 0;
  editDreamForm!: FormGroup;
  dream$!: Observable<Dreams[]>;
  get editDreamFormControls() {
    return this.editDreamForm.controls;
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dreamService: DreamsService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.dreamService.onDreamEdited(false);
    this.buildEditDreamForm();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.dream$ = this.dreamService.getDreams(+this.id);
    this.dreamService.getDreams(+this.id).subscribe((dreamsArr) => {
      console.log(dreamsArr);
      const dreams = dreamsArr[0];
      this.editDreamForm.patchValue({
        nameInput: dreams.name,
        descriptionInput: dreams.description,
        ratingInput: dreams.rating,
      });
      this.editDreamForm.updateValueAndValidity();
    });
  }

  buildEditDreamForm(): void {
    this.editDreamForm = this.fb.group({
      nameInput: new FormControl('', Validators.required),
      descriptionInput: new FormControl('', Validators.required),
      ratingInput: new FormControl('', [
        Validators.required,
        this.numberValidator(),
      ]),
    });
  }

  onSubmitEditDreamForm(): void {
    const data: Dreams = {
      id: +this.id,
      name: this.editDreamFormControls['nameInput'].value,
      description: this.editDreamFormControls['descriptionInput'].value,
      rating: +this.editDreamFormControls['ratingInput'].value,
    };
    this.dreamService
      .updateDream(data)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.handleError(err);
          return EMPTY;
        })
      )
      .subscribe();
    this.dreamService.onDreamEdited(true);
    this.router.navigateByUrl('/reactive-crud');
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control?.value;
      return isNaN(value)
        ? {
            inputValueIsNumeric: true,
          }
        : null;
    };
  }

  handleError(err: HttpErrorResponse): Observable<HttpErrorResponse> {
    return of(err);
  }
}
