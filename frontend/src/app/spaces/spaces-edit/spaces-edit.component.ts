import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../toast-global/toast.service';
import { ToastsContainer } from '../../toast-global/toast-container.component';
import { SpacesService } from '../spaces.service';
import { Spaces } from '../spaces';

@Component({
  selector: 'app-spaces-edit',
  templateUrl: './spaces-edit.component.html',
  styleUrls: ['./spaces-edit.component.css']
})
export class SpacesEditComponent implements OnInit {

    model:Spaces = new Spaces();
    response;
    submitted = false; 
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef:MatDialogRef<SpacesEditComponent>,
        private spaceservice: SpacesService,
        public toastService: ToastService,
        private route: ActivatedRoute,
        private router: Router,
    ) { 
        this.model = data.space;
    }

    ngOnInit() {
    }
  
    editSpace(): void {
        this.spaceservice.editSpace(this.model).subscribe((res:any) => { 
                this.toastService.show(res.body.message);
                this.dialogRef.close();
                this.spaceservice.getSpaces();
            },
            err => {
              this.toastService.show("Error");
            }
        );
    }
     
    onNoClick(): void {
        this.dialogRef.close();
    }

}
