import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  ) { }

    ngOnInit() {
        this.model = new Spaces();
        this.getSpaces();
        if(this.route.snapshot.paramMap.get('id')!=null){
            let id = this.route.snapshot.paramMap.get('id');
            this.spaceId = id;
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
            this.spaceservice.addSpace(this.model).subscribe(res => { 
                this.response = res.body;
                this.submitted = true; 
              },
              err => {
                console.log(err);
              }
            );
        }else if(this.flag=='edit'){
            console.log(this.spaceId);
            console.log(this.model);
            this.spaceservice.editSpace(this.model,this.spaceId).subscribe(res => { 
                this.response = res.body;
              },
              err => {
                console.log(err);
              }
            );
        }
    }
    
    
}
