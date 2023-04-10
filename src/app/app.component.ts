import { Component} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private spinner:NgxSpinnerService){}
 ngOnInit(){
  // this.spinner.show();
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, 2000);
 }
  title = 'grocery-app';
  
}
