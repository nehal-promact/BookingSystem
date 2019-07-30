import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../toast-global/toast.service';
import { ToastsContainer } from '../toast-global/toast-container.component';
import { SpacesService } from './spaces.service';
import { Spaces } from './spaces';
@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent implements OnInit {

    submitted = false; 
    model : Spaces;
    response;
    spaces : Spaces;
    spaceId;
    flag;
    
  constructor(
    private spaceservice: SpacesService,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService,
  ) { }

    ngOnInit() {
        this.model = new Spaces();
        this.getSpaces();
        if(this.route.snapshot.paramMap.get('id')!=null){
            let id = this.route.snapshot.paramMap.get('id');
            this.spaceId = parseInt(id);
            this.flag = 'edit';
            this.getSpaceById(parseInt(id));
        }else{
            this.flag = 'add';
        }
        
    }

    getSpaces(): void {
        this.spaceservice.getSpaces().subscribe(
        data => { 
                this.spaces = data;
                console.log(data);
            }
        );
    }
    
    getSpaceById(id:number): void {
        this.spaceservice.getSpaceById(id).subscribe(
            (data:any) => { 
                this.model = data.data;
            }
        );
    }
    
    onSubmit() { 
        if(this.flag=='add'){
            console.log(this.model);
            this.spaceservice.addSpace(this.model).subscribe((res:any) => { 
                this.response = res.body;
                this.submitted = true;
                this.toastService.show(res.body.message);
                window.location.reload();
                //this.router.navigateByUrl('space'); 
              },
              err => {
                this.toastService.show("Error");
              }
            );
        }else if(this.flag=='edit'){
            console.log(this.spaceId);
            console.log(this.model);
            this.spaceservice.editSpace(this.model,this.spaceId).subscribe((res:any) => { 
                console.log(res.body.message);
                this.response = res.body;
                this.toastService.show(res.body.message);
              },
              err => {
                this.toastService.show("Error");
              }
            );
        }
    }
    
    deleteSpace(): void {
        console.log(this.spaceId);
        this.spaceservice.deleteSpace(this.spaceId).subscribe((res:any) => { 
            console.log(res);
            this.router.navigateByUrl('space');
            this.toastService.show(res.body.message);
            },
            err => {
                this.toastService.show("Error");
            }
        );
    }  
}
