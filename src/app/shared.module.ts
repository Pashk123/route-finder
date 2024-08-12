import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
        MatCardModule, MatAutocompleteModule, MatButtonModule, MatInputModule, MatSelectModule, ReactiveFormsModule
  ],
  exports: [
    
    CommonModule,
    MatCardModule, MatAutocompleteModule, MatButtonModule, MatInputModule, MatSelectModule, ReactiveFormsModule
  ]
})
export class SharedModule { }