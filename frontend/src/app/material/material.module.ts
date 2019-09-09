import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ScrollingModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule,
    MatListModule
    ]
})
export class MaterialModule { }