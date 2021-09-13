import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OTBRatingEstimator';
  lichessUserID = "";
  chessComUserID = "";
  uscfEstimate = "";

  estimateUSCF() {
    console.log(this.lichessUserID, this.chessComUserID);
    this.uscfEstimate = this.uscfEstimate == "3000" ? "100" : "3000";
  } 
}
