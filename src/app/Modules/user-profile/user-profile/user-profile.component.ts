import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}
  headingText: any = 'profile';
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended successfully:', event.url);
        const array = event.url.split('/');
        this.headingText = array.pop();
      }
    });
  }
}
