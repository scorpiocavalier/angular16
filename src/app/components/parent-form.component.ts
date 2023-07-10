import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'parent-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  template: `
    <form [formGroup]="form" class="space-y-8">
      <div class="flex gap-4 items-center">
        <button mat-icon-button color="primary" (click)="addSkill()">
          <mat-icon>add</mat-icon>
        </button>
        <button
          mat-icon-button
          color="primary"
          [disabled]="skills.invalid"
          (click)="onSubmit()"
        >
          <mat-icon>save</mat-icon>
        </button>
      </div>

      <ng-container formArrayName="skills">
        <div
          *ngFor="
            let skillFormGroup of skills.controls;
            index as i;
            trackBy: trackByIndex
          "
          class="flex gap-4 items-center"
          [formGroupName]="i"
        >
          <mat-form-field appearance="outline">
            <mat-label>Skill</mat-label>
            <input matInput formControlName="skill" />
            <mat-error *ngIf="skillFormGroup.invalid">Required</mat-error>
          </mat-form-field>

          <button
            mat-icon-button
            color="primary"
            (click)="removeSkill(i)"
            class="mb-6"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </ng-container>
    </form>
  `
})
export class ParentFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  form!: FormGroup;

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  ngOnInit() {
    this.form = this.fb.group({
      skills: this.fb.array([
        this.fb.group({
          id: 1,
          skill: ['Frontend Development', Validators.required]
        }),
        this.fb.group({
          id: 2,
          skill: ['Backend Development', Validators.required]
        })
      ])
    });
  }

  onSubmit() {
    console.log(this.skills.value);
  }

  addSkill() {
    this.skills.push(this.newSkill());
  }

  removeSkill(i: number) {
    this.skills.removeAt(i);
  }

  newSkill(): FormGroup {
    return this.fb.group({
      id: this.skills.length + 1,
      skill: ['', Validators.required]
    });
  }

  trackByIndex(_: number, skillFormGroup: AbstractControl): number {
    return skillFormGroup.value.id;
  }
}
