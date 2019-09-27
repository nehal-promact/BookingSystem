import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../toast-global/toast.service';
import { ToastsContainer } from '../../toast-global/toast-container.component';
import { SpacesService } from '../spaces.service';
import { Spaces } from '../spaces';

@Component({
  selector: 'app-spaces-create',
  templateUrl: './spaces-create.component.html',
  styleUrls: ['./spaces-create.component.css']
})
export class SpacesCreateComponent implements OnInit {

    model : Spaces;
    response;
    submitted = false; 
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef:MatDialogRef<SpacesCreateComponent>,
        private spaceservice: SpacesService,
        public toastService: ToastService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.model = new Spaces();
    }
  
    onSubmit() { 
        this.spaceservice.addSpace(this.model).subscribe((res:any) => { 
            this.response = res.body;
            this.submitted = true;
            this.toastService.show(res.body.message);
            this.dialogRef.close();
            this.router.navigateByUrl('space'); 
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
