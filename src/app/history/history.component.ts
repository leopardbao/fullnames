import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  searches: any;
  constructor(
    private loginService: LoginService,
    private dashboardService: DashboardService,
    private db: AngularFireDatabase) {
      this.searches = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    }

    searchHistory() {
        this.dashboardService.getSearchHistory().subscribe( (history: any) => {
        this.searches = history;
        this.searches.sort(function(a, b){return parseInt(a.timestamp) - parseInt(b.timestamp)});
      });
    }

    sortHistory(){
      this.searches.reverse();  
    }

  ngOnInit() {
    this.searchHistory();
  }
}
