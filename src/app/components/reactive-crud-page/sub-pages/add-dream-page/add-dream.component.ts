import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { DreamsService } from '../../services/dreams-service/dreams.service';
import { Dreams } from '../../services/mockBackendData/mock-backend-data.service';
import { CommonModule } from '@angular/common';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-dream',
  templateUrl: './add-dream.component.html',
  styleUrls: ['./add-dream.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddDreamComponent implements OnInit {
  id = 0;
  addDreamForm!: FormGroup;
  get addDreamFormControls() {
    return this.addDreamForm.controls;
  }
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dreamService: DreamsService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.dreamService.onDreamAdded(false);
    this.buildAddDreamForm();
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  onSubmitAddDreamForm(): void {
    const data: Dreams = {
      id: +this.id,
      name: this.addDreamFormControls['nameInput'].value,
      description: this.addDreamFormControls['descriptionInput'].value,
      rating: +this.addDreamFormControls['ratingInput'].value,
    };
    this.dreamService
      .addDream(data)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.handleError(err);
          return EMPTY;
        })
      )
      .subscribe();
    this.dreamService.onDreamAdded(true);
    this.router.navigateByUrl('/reactive-crud');
  }

  onCancel(): void {
    this.dreamService.onDreamAdded(true);
    this.router.navigateByUrl('/reactive-crud');
  }

  buildAddDreamForm(): void {
    this.addDreamForm = this.fb.group({
      nameInput: new FormControl('', Validators.required),
      descriptionInput: new FormControl('', Validators.required),
      ratingInput: new FormControl('', [
        Validators.required,
        this.numberValidator(),
      ]),
    });
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
