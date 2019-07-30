import { Component, OnInit,ElementRef } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { SpacesService } from '../spaces/spaces.service';
import { Spaces } from '../spaces/spaces';
import { TIMES } from './time';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [SpacesService]
})

export class BookingsComponent implements OnInit {

    spaces : Spaces;
    times = TIMES;
    time;
    space_id;
    
    constructor(
      private http: HttpClient,
      private spaceservice: SpacesService,
      private el: ElementRef
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
    
    booking($event){
        this.time = $event.target.getAttribute('data-time');
        this.space_id = $event.target.getAttribute('data-spaceid');
        
        
    }

}
