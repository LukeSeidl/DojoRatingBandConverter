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
  l_bullet = 0;
  l_bulletRD = 500;
  l_blitz = 0;
  l_blitzRD = 500;
  l_rapid = 0;
  l_rapidRD = 500;
  l_classical = 0;
  l_classicalRD = 500;
  c_bullet = 0;
  c_bulletRD = 500;
  c_blitz = 0;
  c_blitzRD = 500;
  c_rapid = 0;
  c_rapidRD = 500;
  returned = 0;
  requested = 0;

  estimateUSCF() {
    this.L_MESSAGE = "";
    this.C_MESSAGE = "";
    this.l_bullet = 0;
    this.l_bulletRD = 500;
    this.l_blitz = 0;
    this.l_blitzRD = 500;
    this.l_rapid = 0;
    this.l_rapidRD = 500;
    this.l_classical = 0;
    this.l_classicalRD = 500;
    this.c_bullet = 0;
    this.c_bulletRD = 500;
    this.c_blitz = 0;
    this.c_blitzRD = 500;
    this.c_rapid = 0;
    this.c_rapidRD = 500;
    this.requested = 0;
    this.returned = 0;
    if (this.lichessUserID != "") {
      this.requested += 1;
    }
    if (this.chessComUserID != "") {
      this.requested += 1;
    }
    if (this.lichessUserID != "") {
      this.getLichessUserData(this.lichessUserID).then(l_results => {
        this.l_bullet = l_results[0];
        this.l_bulletRD = l_results[1];
        this.l_blitz = l_results[2];
        this.l_blitzRD = l_results[3];
        this.l_rapid = l_results[4];
        this.l_rapidRD = l_results[5];
        this.l_classical = l_results[6];
        this.l_classicalRD = l_results[7];
        if (this.L_MESSAGE != "User does not exist") {
          var l_ratingsUsed = 'Ratings used: ';
          if (this.l_bulletRD < 150) {
            l_ratingsUsed += 'Bullet: ' + this.l_bullet + ', ';
          }
          if (this.l_blitzRD < 150) {
            l_ratingsUsed += 'Blitz: ' + this.l_blitz + ', ';
          }
          if (this.l_rapidRD < 150) {
            l_ratingsUsed += 'Rapid: ' + this.l_rapid + ', ';
          }
          if (this.l_classicalRD < 150) {
            l_ratingsUsed += 'Classical: ' + this.l_classical + ', ';
          }
          if (this.l_bulletRD < 150 || this.l_blitzRD < 150 || this.l_rapidRD < 150 || this.l_classicalRD < 150) {
            l_ratingsUsed = l_ratingsUsed.substring(0, l_ratingsUsed.length - 2);
            this.L_MESSAGE = l_ratingsUsed;
          }
          else {
            this.L_MESSAGE = 'User has no eligble ratings';
          }
        }
        this.returned += 1;
        this.estimateUSCFFromLichessAndChessCom();
      });
    }
    if (this.chessComUserID != "") {
      this.getChessComUserData(this.chessComUserID).then(c_results => {
        this.c_bullet = c_results[0];
        this.c_bulletRD = c_results[1];
        this.c_blitz = c_results[2];
        this.c_blitzRD = c_results[3];
        this.c_rapid = c_results[4];
        this.c_rapidRD = c_results[5];
        if (this.C_MESSAGE != "User does not exist") {
          var c_ratingsUsed = 'Ratings used: ';
          if (this.c_bulletRD < 150) {
            c_ratingsUsed += 'Bullet: ' + this.c_bullet + ', ';
          }
          if (this.c_blitzRD < 150) {
            c_ratingsUsed += 'Blitz: ' + this.c_blitz + ', ';
          }
          if (this.c_rapidRD < 150) {
            c_ratingsUsed += 'Rapid: ' + this.c_rapid + ', ';
          }
          if (this.c_bulletRD < 150 || this.c_blitzRD < 150 || this.c_rapidRD < 150) {
            c_ratingsUsed = c_ratingsUsed.substring(0, c_ratingsUsed.length - 2);
            this.C_MESSAGE = c_ratingsUsed;
          }
          else {
            this.C_MESSAGE = 'User has no eligible ratings';
          }
        }
        this.returned += 1;
        this.estimateUSCFFromLichessAndChessCom();
      });
    }
  }

  async getLichessUserData(userID: string) {
    this.L_MESSAGE = "";
    var result = await fetch("http://lichess.org/api/user/" + userID + "?callback=JSON_CALLBACK").then(response => response.json()).then(data => {
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

  async getChessComUserData(userID: string) {
    this.C_MESSAGE = "";
    var result = await fetch("https://api.chess.com/pub/player/" + userID + "/stats").then(response => response.json()).then(data => {
      try {
        if (data['code'] == 0) {
          this.C_MESSAGE = "User does not exist";
          return [0, 500, 0, 500, 0, 500];
        }
      }
      catch(e) {}
      try {
        var bullet = parseInt(data['chess_bullet']['last']['rating']);
        var bulletRD = parseInt(data['chess_bullet']['last']['rd']);
      }
      catch (e) {
        var bullet = 0;
        var bulletRD = 500;
      }
      try {
        var blitz = parseInt(data['chess_blitz']['last']['rating']);
        var blitzRD = parseInt(data['chess_blitz']['last']['rd']);
      }
      catch (e) {
        var blitz = 0;
        var blitzRD = 500;
      }
      try {
        var rapid = parseInt(data['chess_rapid']['last']['rating']);
        var rapidRD = parseInt(data['chess_rapid']['last']['rd']);
      }
      catch (e) {
        var rapid = 0;
        var rapidRD = 500;
      }
      bullet = bulletRD < 150 ? bullet : 0;
      blitz = blitzRD < 150 ? blitz : 0;
      rapid = rapidRD < 150 ? rapid : 0;
      return [bullet, bulletRD, blitz, blitzRD, rapid, rapidRD];
    }).catch(() => {
      this.C_MESSAGE = "User does not exist";
      return [0, 500, 0, 500, 0, 500];
    });
    return result;
  }

  estimateUSCFFromLichessAndChessCom() {
    return 0;
    /*if (this.returned == this.requested) {
      var numRatings = 0;
      var l_bulletEstimate = 0;
      var l_blitzEstimate = 0;
      var l_rapidEstimate = 0;
      var l_classicalEstimate = 0;
      var c_bulletEstimate = 0;
      var c_blitzEstimate = 0;
      var c_rapidEstimate = 0;
      var totalRD = this.l_bulletRD + this.l_blitzRD + this.l_rapidRD + this.l_classicalRD + this.c_bulletRD + this.c_blitzRD + this.c_rapidRD;
      var l_bulletWeight = 1 - (this.l_bulletRD / totalRD);
      var l_blitzWeight = 1 - (this.l_blitzRD / totalRD);
      var l_rapidWeight = 1 - (this.l_rapidRD / totalRD);
      var l_classicalWeight = 1 - (this.l_classicalRD / totalRD);
      var c_bulletWeight = 1 - (this.c_bulletRD / totalRD);
      var c_blitzWeight = 1 - (this.c_blitzRD / totalRD);
      var c_rapidWeight = 1 - (this.c_rapidRD / totalRD);
      if (this.l_bullet >= 100 && this.l_bullet <= 3000) {
        numRatings += 1;
        var highLowResult = getHighLow(this.L_BULLET, this.l_bullet);
        var l_bulletLow = highLowResult[0];
        var l_bulletHigh = highLowResult[1];
        var L = this.L_BULLET[l_bulletLow];
        var H = this.L_BULLET[l_bulletHigh];
        l_bulletEstimate = (this.L_USCF[l_bulletLow] * (H - L - (this.l_bullet - L)) / (H - L)) + (this.L_USCF[l_bulletHigh] * (H - L - (H - this.l_bullet)) / (H - L));
        l_bulletEstimate = l_bulletEstimate * l_bulletWeight;
      }
      else
      {
        l_bulletWeight = 0;
      }
    
      if (this.l_blitz >= 100 && this.l_blitz <= 3000) {
        numRatings += 1;
        var highLowResult = getHighLow(this.L_BLITZ, this.l_blitz);
        var l_blitzLow = highLowResult[0];
        var l_blitzHigh = highLowResult[1];
        var L = this.L_BLITZ[l_blitzLow];
        var H = this.L_BLITZ[l_blitzHigh];
        l_blitzEstimate = (this.L_USCF[l_blitzLow] * (H - L - (this.l_blitz - L)) / (H - L)) + (this.L_USCF[l_blitzHigh] * (H - L - (H - this.l_blitz)) / (H - L));
        l_blitzEstimate = l_blitzEstimate * l_blitzWeight;
      } 
      else {
        l_blitzWeight = 0;
      }


      if (this.l_rapid >= 100 && this.l_rapid <= 3000) {
        numRatings += 1;
        var highLowResult = getHighLow(this.L_RAPID, this.l_rapid);
        var l_rapidLow = highLowResult[0];
        var l_rapidHigh = highLowResult[1];
        var L = this.L_RAPID[l_rapidLow];
        var H = this.L_RAPID[l_rapidHigh];
        l_rapidEstimate = (this.L_USCF[l_rapidLow] * (H - L - (this.l_rapid - L)) / (H - L)) + (this.L_USCF[l_rapidHigh] * (H - L - (H - this.l_rapid)) / (H - L));
        l_rapidEstimate = l_rapidEstimate * l_rapidWeight;
      }
      else {
        l_rapidWeight = 0;
      }

      if (this.l_classical >= 100 && this.l_classical <= 3000)
      {
        numRatings += 1;
        var highLowResult = getHighLow(this.L_CLASSICAL, this.l_classical);
        var l_classicalLow = highLowResult[0];
        var l_classicalHigh = highLowResult[1];
        var L = this.L_CLASSICAL[l_classicalLow];
        var H = this.L_CLASSICAL[l_classicalHigh];
        l_classicalEstimate = (this.L_USCF[l_classicalLow] * (H - L - (this.l_classical - L)) / (H - L)) + (this.L_USCF[l_classicalHigh] * (H - L - (H - this.l_classical)) / (H - L));
        l_classicalEstimate = l_classicalEstimate * l_classicalWeight;
      }
      else
      {
        l_classicalWeight = 0;
      }

      if (c_bullet >= 100 and c_bullet <= 3000)
      {
        numRatings += 1
        c_bulletLow, c_bulletHigh = getHighLow(C_BULLET, c_bullet)
        L = C_BULLET[c_bulletLow]
        H = C_BULLET[c_bulletHigh]
        c_bulletEstimate = (C_USCF[c_bulletLow] * (H - L - (c_bullet - L)) / (H - L)) + (C_USCF[c_bulletHigh] * (H - L - (H - c_bullet)) / (H - L))
        c_bulletEstimate = c_bulletEstimate * c_bulletWeight
      }
      else
      {
        c_bulletWeight = 0;
      }


      if (c_blitz >= 100 and c_blitz <= 3000)
      {
        numRatings += 1
        c_blitzLow, c_blitzHigh = getHighLow(C_BLITZ, c_blitz)
        L = C_BLITZ[c_blitzLow]
        H = C_BLITZ[c_blitzHigh]
        c_blitzEstimate = (C_USCF[c_blitzLow] * (H - L - (c_blitz - L)) / (H - L)) + (C_USCF[c_blitzHigh] * (H - L - (H - c_blitz)) / (H - L))
        c_blitzEstimate = c_blitzEstimate * c_blitzWeight
      }
      else
      {
        c_blitzWeight = 0;
      }
      

      if (c_rapid >= 100 and c_rapid <= 3000)
      {
        numRatings += 1
        c_rapidLow, c_rapidHigh = getHighLow(C_RAPID, c_rapid)
        L = C_RAPID[c_rapidLow]
        H = C_RAPID[c_rapidHigh]
        c_rapidEstimate = (C_USCF[c_rapidLow] * (H - L - (c_rapid - L)) / (H - L)) + (C_USCF[c_rapidHigh] * (H - L - (H - c_rapid)) / (H - L))
        c_rapidEstimate = c_rapidEstimate * c_rapidWeight
      }
      else
      {
        c_rapidWeight = 0
      }

      if numRatings > 0 {
        totalEstimate = l_bulletEstimate + l_blitzEstimate + l_rapidEstimate + l_classicalEstimate + c_bulletEstimate + c_blitzEstimate + c_rapidEstimate
        totalWeight = l_bulletWeight + l_blitzWeight + l_rapidWeight + l_classicalWeight + c_bulletWeight + c_blitzWeight + c_rapidWeight
        uscfEstimate = totalEstimate / totalWeight
        return round(uscfEstimate)
      }
      else {
        return 0;
      }
      





















      if (uscfEstimate != 0) {
        this.uscfEstimate = uscfEstimate.toString();
      }
    }*/
  }

  /*def getHighLow(timeControl, currentRating):
        low = -1
        high = 0
        for count, rating in enumerate(timeControl):
            if(currentRating >= rating):
                low = count
                if(len(timeControl) > count + 1):
                    high = count + 1
                else:
                    high = -1
            else:
                break
        return (low,high)*/
      
}
