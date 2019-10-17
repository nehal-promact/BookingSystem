import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';


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
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule
    ]
})
export class MaterialModule { }