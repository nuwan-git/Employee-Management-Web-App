import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { AddEmployeeComponent } from '../../../add-employee/add-employee.component';
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
  
})
export class SidebarComponent implements OnInit {
 
  
  menus = [];
  

  constructor(public sidebarservice : SidebarService, private _route:ActivatedRoute) {
    this.menus = sidebarservice.menus;
   }

  ngOnInit() {
   
    
  
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

 

}
