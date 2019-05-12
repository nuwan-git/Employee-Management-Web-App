import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  menuBtnStatus: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onloadData() {
  //  this.router.navigate(["/sidebar"]);
    this.menuBtnStatus = !this.menuBtnStatus;
  }

}
