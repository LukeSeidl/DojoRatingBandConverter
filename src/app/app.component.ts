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
  L_MESSAGE = "";
  C_MESSAGE = "";

  estimateUSCF() {
    this.L_MESSAGE = "";
    this.C_MESSAGE = "";
    var l_bullet = 0;
    var l_bulletRD = 500;
    var l_blitz = 0;
    var l_blitzRD = 500;
    var l_rapid = 0;
    var l_rapidRD = 500;
    var l_classical = 0;
    var l_classicalRD = 500;
    var c_bullet = 0;
    var c_bulletRD = 500;
    var c_blitz = 0;
    var c_blitzRD = 500;
    var c_rapid = 0;
    var c_rapidRD = 500;

    if (this.lichessUserID != "") {
      this.getLichessUserData(this.lichessUserID).then(l_results => {
        l_bullet = l_results[0];
        l_bulletRD = l_results[1];
        l_blitz = l_results[2];
        l_blitzRD = l_results[3];
        l_rapid = l_results[4];
        l_rapidRD = l_results[5];
        l_classical = l_results[6];
        l_classicalRD = l_results[7];
        if (this.L_MESSAGE != "User does not exist") {
          var l_ratingsUsed = 'Ratings used: ';
          if (l_bulletRD < 150) {
            l_ratingsUsed += 'Bullet: ' + l_bullet + ', ';
          }
          if (l_blitzRD < 150) {
            l_ratingsUsed += 'Blitz: ' + l_blitz + ', ';
          }
          if (l_rapidRD < 150) {
            l_ratingsUsed += 'Rapid: ' + l_rapid + ', ';
          }
          if (l_classicalRD < 150) {
            l_ratingsUsed += 'Classical: ' + l_classical + ', ';
          }
          if (l_bulletRD < 150 || l_blitzRD < 150 || l_rapidRD < 150 || l_classicalRD < 150) {
            l_ratingsUsed = l_ratingsUsed.substring(0, l_ratingsUsed.length - 2);
            this.L_MESSAGE = l_ratingsUsed;
          }
          else {
            this.L_MESSAGE = 'User has no eligble ratings';
          }
        }
      });
      
      
    }
    if (this.chessComUserID != "") {
      var c_results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//getChessComUserData(this.chessComUserID);
      c_bullet = c_results[0];
      c_bulletRD = c_results[1];
      c_blitz = c_results[2];
      c_blitzRD = c_results[3];
      c_rapid = c_results[4];
      c_rapidRD = c_results[5];
      if (this.C_MESSAGE != "User does not exist") {
        var c_ratingsUsed = 'Ratings used: ';
        if (c_bulletRD < 150) {
          c_ratingsUsed += 'Bullet: ' + c_bullet + ', ';
        }
        if (c_blitzRD < 150) {
          c_ratingsUsed += 'Blitz: ' + c_blitz + ', ';
        }
        if (c_rapidRD < 150) {
          c_ratingsUsed += 'Rapid: ' + c_rapid + ', ';
        }
        if (c_bulletRD < 150 || c_blitzRD < 150 || c_rapidRD < 150) {
          c_ratingsUsed = c_ratingsUsed.substring(0, c_ratingsUsed.length - 2);
          this.C_MESSAGE = c_ratingsUsed;
        }
        else {
          this.C_MESSAGE = 'User has no eligible ratings';
        }
      }
    }
    var uscfEstimate = "0";//estimateUSCFFromLichessAndChessCom(l_bullet, l_bulletRD, l_blitz, l_blitzRD, l_rapid, l_rapidRD, l_classical, l_classicalRD, c_bullet, c_bulletRD, c_blitz, c_blitzRD, c_rapid, c_rapidRD);
    if (uscfEstimate != "0") {
      this.uscfEstimate = uscfEstimate;
    }
  }

  async getLichessUserData(userID: string) {
    this.L_MESSAGE = "";
    var result = await fetch("http://lichess.org/api/user/" + userID + "?callback=JSON_CALLBACK").then(response => response.json()).then(data => {
      console.log(data);
      if (data['perfs'] == undefined) {
        this.L_MESSAGE = "User does not exist";
        return [0, 500, 0, 500, 0, 500, 0, 500];
      }
      else {
        var bullet = data['perfs']['bullet']['rating'];
        var bulletRD = data['perfs']['bullet']['rd'];
        var blitz = data['perfs']['blitz']['rating'];
        var blitzRD = data['perfs']['blitz']['rd'];
        var rapid = data['perfs']['rapid']['rating'];
        var rapidRD = data['perfs']['rapid']['rd'];
        var classical = data['perfs']['classical']['rating'];
        var classicalRD = data['perfs']['classical']['rd'];
        var bullet = bulletRD < 150 ? bullet : 0;
        var blitz = blitzRD < 150 ? blitz : 0;
        var rapid = rapidRD < 150 ? rapid : 0;
        var classical = classicalRD < 150 ? classical : 0;
        return [bullet, bulletRD, blitz, blitzRD, rapid, rapidRD, classical, classicalRD];
      }
    }).catch(() => {
      this.L_MESSAGE = "User does not exist";
      return [0, 500, 0, 500, 0, 500, 0, 500];
    });
    return result;
  }
      
}
