import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../toast-global/toast.service';
import { ToastsContainer } from '../../toast-global/toast-container.component';
import { SpacesService } from '../spaces.service';
import { Spaces } from '../spaces';

@Component({
  selector: 'app-spaces-delete',
  templateUrl: './spaces-delete.component.html',
  styleUrls: ['./spaces-delete.component.css']
})
export class SpacesDeleteComponent implements OnInit {

    spaceId = 0;
    
    constructor(
          @Inject(MAT_DIALOG_DATA) public data,
          private dialogRef:MatDialogRef<SpacesDeleteComponent>,
          private spaceservice: SpacesService,
          public toastService: ToastService,
          private route: ActivatedRoute,
          private router: Router,
    ) {
        this.spaceId = data.id;
      }

    ngOnInit() {
        
    }

    deleteSpace(): void {
        console.log(this.spaceId);
        this.spaceservice.deleteSpace(this.spaceId).subscribe((res:any) => { 
            this.toastService.show(res.message);
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
