import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacesComponent } from './spaces.component';
import { SpacesCreateComponent } from './spaces-create/spaces-create.component';
import { SpacesEditComponent } from './spaces-edit/spaces-edit.component';
import { SpacesDeleteComponent } from './spaces-delete/spaces-delete.component';



@NgModule({
  declarations: [SpacesComponent, SpacesCreateComponent, SpacesEditComponent, SpacesDeleteComponent],
  imports: [
    CommonModule
  ]
})
export class SpacesModule { }
