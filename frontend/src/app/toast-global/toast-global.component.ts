import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-global',
  templateUrl: './toast-global.component.html',
  styleUrls: ['./toast-global.component.css']
})
export class ToastGlobalComponent implements OnInit {

  constructor(
    public toastService: ToastService
  ) { }

  ngOnInit() {
  }

}
