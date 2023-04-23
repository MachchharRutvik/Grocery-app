import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class SidebarLinksComponent implements OnInit {

  constructor(private route: Router, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  logout() {
    console.log("in logout")
    this.confirmationService.confirm({
      message: 'Do you want to logout?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        localStorage.removeItem("token")
        this.route.navigate(['/']);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Logged out successfully' });
      }
    });
  }
}
