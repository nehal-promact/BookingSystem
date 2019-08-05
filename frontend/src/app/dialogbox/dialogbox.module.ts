import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogboxComponent } from './dialogbox.component';



@NgModule({
  declarations: [DialogboxComponent],
  imports: [
    CommonModule
  ],
  exports: [DialogboxComponent]
})
export class DialogboxModule { }
