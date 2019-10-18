import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../toast-global/toast.service';
import { ToastsContainer } from '../toast-global/toast-container.component';
import { SpacesService } from './spaces.service';
import { Spaces } from './spaces';
import {SpacesCreateComponent } from './spaces-create/spaces-create.component';
import {SpacesEditComponent } from './spaces-edit/spaces-edit.component';
import {SpacesDeleteComponent } from './spaces-delete/spaces-delete.component';
import { LoginuserService } from '../shared/loginuser/loginuser.service';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent implements OnInit {

    spaces : Spaces;
    spaceId;
    isAuthorized: boolean = false;
    isAdministrator: boolean = false;
    
  constructor(
    private dialog:MatDialog,
    private spaceservice: SpacesService,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService,
    public loginuserservice: LoginuserService,
    public AuthService: AuthenticationService,
    private userservice: UsersService
  ) { 
        if(localStorage.getItem('userInfo')){
            this.loginuserservice.sendUserName(JSON.parse(localStorage.getItem('userInfo')).first_name);
        }
  }

    ngOnInit() {
        this.checkAuth();
        this.isAdmin();
        this.getSpaces();
    }

    checkAuth(): void {
        this.AuthService.isAuthorized().subscribe(
            (res) => {
                  this.isAuthorized = res;
                  setTimeout(() => {
                        this.loginuserservice.setAuthorized(this.isAuthorized);
                   },0);
                }
        );
    }
    
    isAdmin(): void {
        if(localStorage.length > 0){
            this.userservice.isAdmin().subscribe(
                (res:any) => {
                    this.isAdministrator = res.data;
                    setTimeout(() => {
                        this.loginuserservice.setAdmin(this.isAdministrator);
                    },0);  
                }
            );
        }
    }
    
    getSpaces(): void {
        this.spaceservice.getSpaces().subscribe(
        data => { 
                this.spaces=data;
                console.log(data);
            }
        );
    }
    
    addSpace(): void {
        const dialogConfig =  new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "400px";         
        let MatDialogRef = this.dialog.open(SpacesCreateComponent,dialogConfig);
        MatDialogRef.afterClosed().subscribe(res =>{
            this.getSpaces();
        });
    }
    
    editSpace(space): void {
        const dialogConfig =  new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "400px";     
        dialogConfig.data = {space};    
        let MatDialogRef = this.dialog.open(SpacesEditComponent,dialogConfig);
        MatDialogRef.afterClosed().subscribe(res =>{
            this.getSpaces();
        });
    }  
    
    deleteSpace(id): void {
        const dialogConfig =  new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "290px";     
        dialogConfig.data = {id};    
        let MatDialogRef = this.dialog.open(SpacesDeleteComponent,dialogConfig);
        MatDialogRef.afterClosed().subscribe(res =>{
            this.getSpaces();
        });
    }  
}
