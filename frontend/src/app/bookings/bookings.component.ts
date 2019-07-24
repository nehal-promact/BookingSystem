import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { SpacesService } from '../spaces/spaces.service';
import { Spaces } from '../spaces/spaces';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [SpacesService]
})

export class BookingsComponent implements OnInit {

    spaces : Spaces;
    constructor(
      private http: HttpClient,
      private spaceservice: SpacesService
    ) { }

    ngOnInit() {
        this.getSpaces();
    }
    
    getSpaces(): void {
        this.spaceservice.getSpaces().subscribe(
        data => { 
                this.spaces = data;
                console.log(data);
            }
        );
    }

}
