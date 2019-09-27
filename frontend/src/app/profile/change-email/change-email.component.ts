import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS,NgForm,FormBuilder,Validators,FormGroup} from '@angular/forms';
import { Users } from '../../users/users';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;

    formData:Users = new Users();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
        
    }

    get f() { return this.registerForm.controls; }
    
    onSubmit(form : NgForm){
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log(this.registerForm.value.email);
    }

}