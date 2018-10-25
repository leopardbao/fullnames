import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  fName: string;
  lName: string;
  isMatch: boolean;
  constructor(private dashboardService: DashboardService, private loginService: LoginService) {
  }

  search(){
    var results = this.dashboardService.search(this.fName, this.lName)
        .subscribe(match => {
          this.displayResult(match);
          this.isMatch = match;
        });
    this.dashboardService.updateHistory(this.fName, this.lName, 'searched');
  }

  addName(){
    if(!this.isMatch){
      this.dashboardService.addName(this.fName, this.lName);
      this.dashboardService.updateHistory(this.fName, this.lName, 'added');
    } else {
        document.getElementById('result').innerHTML = `${this.fName} ${this.lName} already exists!`;
    }
  }

  displayResult(isMatch: boolean){
    if(isMatch == true){
      document.getElementById('result').innerHTML = `${this.fName} ${this.lName} is a valid full name!`;
    } else {
      document.getElementById('result').innerHTML = `${this.fName} ${this.lName} is not a valid full name!`;
    }
  }

  ngOnInit() {
  }
  
  logout() {
    this.loginService.signOut();
  }

}
