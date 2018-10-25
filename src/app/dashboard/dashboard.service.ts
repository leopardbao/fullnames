import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of, concat } from 'rxjs';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  search(fName: string, lName: string) {
    const obs1 = this.db.object(`/firstNames/${fName}`).snapshotChanges();
    const obs2 = this.db.object(`/lastNames/${lName}`).snapshotChanges();
    return obs1.switchMap(action1 =>
      obs2.switchMap(action2 => {
          return of((action1.payload.val() === true) && (action2.payload.val() === true));
      }));
  }

  updateHistory(fName: string, lName: string, method: string) {
    var d = new Date();
    var year = d.getMonth() + '/' +d.getDate() + '/' + d.getFullYear();
    var time = ' '+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var data1 = year + time;
    var d2 = new Date();
    this.searchHistoryRef.push({ date: data1, timestamp: d2.getTime(), firstName: fName, lastName: lName,
       searchOrAded: method});
  }


  addName(fName: string, lName: string){
    this.db.list('/firstNames').set(fName, true);
    this.db.list('/lastNames').set(lName, true);
  }
}
