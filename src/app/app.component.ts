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
  xl_bullet = false;
  xl_blitz = false;
  xl_rapid = false;
  xl_classical = false;
  xc_bullet = false;
  xc_blitz = false;
  xc_rapid = false;
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
  L_BULLET = [100,810,885,940,1010,1060,1135,1235,1295,1335,1400,1450,1495,1525,1590,1630,1670,1705,1750,1785,1810,1850,1900,1945,2000,2020,2105,2180,2265,2365,2455,2540,3000];
L_BLITZ = [100,845,920,1000,1090,1195,1275,1365,1420,1480,1530,1585,1625,1665,1700,1735,1780,1815,1860,1885,1910,1950,1995,2015,2050,2075,2145,2215,2290,2390,2450,2530,3000];
L_RAPID = [100,985,1125,1185,1285,1380,1480,1550,1600,1625,1670,1705,1735,1785,1815,1840,1865,1895,1930,1955,1995,2010,2040,2060,2085,2110,2170,2205,2240,2300,2395,2455,3000];
L_CLASSICAL = [100,1065,1120,1255,1355,1445,1530,1590,1620,1660,1705,1730,1755,1785,1805,1825,1855,1890,1925,1940,1960,1990,2020,2040,2055,2070,2090,2165,2195,2285,2310,2375,3000];
L_USCF = [100,285,285,300,575,700,835,1010,1070,1115,1155,1235,1290,1340,1395,1470,1505,1550,1605,1640,1705,1750,1805,1850,1880,1915,2010,2105,2200,2255,2295,2425,3000];
C_BULLET = [100,495,590,670,755,835,930,1040,1095,1130,1185,1235,1285,1330,1380,1425,1485,1535,1595,1640,1700,1755,1815,1860,1915,1965,2070,2180,2290,2405,2505,2615,2720,2815,3000];
C_BLITZ =  [100,500,600,700,800,900,1000,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000,2100,2200,2300,2400,2500,2600,2700,2800,3000];
C_RAPID = [100,685,790,890,985,1075,1165,1245,1295,1330,1375,1420,1460,1505,1545,1580,1615,1645,1685,1720,1760,1790,1825,1860,1900,1930,2005,2060,2130,2210,2290,2395,2490,2605,3000];
C_USCF = [100,285,285,300,575,700,835,1010,1070,1115,1155,1235,1290,1340,1395,1470,1505,1550,1605,1640,1705,1750,1805,1850,1880,1915,2010,2105,2200,2255,2295,2425,2535,2565,3000];


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
      this.lichessUserID = this.lichessUserID.trim();
      this.requested += 1;
    }
    if (this.chessComUserID != "") {
      this.chessComUserID = this.chessComUserID.trim();
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
          if (this.l_bulletRD < 150 && !this.xl_bullet) {
            l_ratingsUsed += 'Bullet: ' + this.l_bullet + ', ';
          }
          if (this.l_blitzRD < 150 && !this.xl_blitz) {
            l_ratingsUsed += 'Blitz: ' + this.l_blitz + ', ';
          }
          if (this.l_rapidRD < 150 && !this.xl_rapid) {
            l_ratingsUsed += 'Rapid: ' + this.l_rapid + ', ';
          }
          if (this.l_classicalRD < 150 && !this.xl_classical) {
            l_ratingsUsed += 'Classical: ' + this.l_classical + ', ';
          }
          if ((this.l_bulletRD < 150 && !this.xl_bullet) || (this.l_blitzRD < 150 && !this.xl_blitz) || (this.l_rapidRD < 150 && !this.xl_rapid) || (this.l_classicalRD < 150 && !this.xl_classical)) {
            l_ratingsUsed = l_ratingsUsed.substring(0, l_ratingsUsed.length - 2);
            this.L_MESSAGE = l_ratingsUsed;
          }
          else {
            this.L_MESSAGE = 'User has no eligible ratings';
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
          if (this.c_bulletRD < 150 && !this.xc_bullet) {
            c_ratingsUsed += 'Bullet: ' + this.c_bullet + ', ';
          }
          if (this.c_blitzRD < 150 && !this.xc_blitz) {
            c_ratingsUsed += 'Blitz: ' + this.c_blitz + ', ';
          }
          if (this.c_rapidRD < 150 && !this.xc_rapid) {
            c_ratingsUsed += 'Rapid: ' + this.c_rapid + ', ';
          }
          if ((this.c_bulletRD < 150 && !this.xc_bullet) || (this.c_blitzRD < 150 && !this.xc_blitz) || (this.c_rapidRD < 150 && !this.xc_rapid)) {
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
    var result = await fetch("https://lichess.org/api/user/" + userID + "?callback=JSON_CALLBACK").then(response => response.json()).then(data => {
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
    var uscfEstimate = 0;
    if (this.returned == this.requested) {
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
      if (!this.xl_bullet && this.l_bullet >= 100 && this.l_bullet <= 3000) {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.L_BULLET, this.l_bullet);
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
    
      if (!this.xl_blitz && this.l_blitz >= 100 && this.l_blitz <= 3000) {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.L_BLITZ, this.l_blitz);
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


      if (!this.xl_rapid && this.l_rapid >= 100 && this.l_rapid <= 3000) {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.L_RAPID, this.l_rapid);
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

      if (!this.xl_classical && this.l_classical >= 100 && this.l_classical <= 3000)
      {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.L_CLASSICAL, this.l_classical);
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

      if (!this.xc_bullet && this.c_bullet >= 100 && this.c_bullet <= 3000)
      {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.C_BULLET, this.c_bullet);
        var c_bulletLow = highLowResult[0];
        var c_bulletHigh = highLowResult[1];
        var L = this.C_BULLET[c_bulletLow];
        var H = this.C_BULLET[c_bulletHigh];
        c_bulletEstimate = (this.C_USCF[c_bulletLow] * (H - L - (this.c_bullet - L)) / (H - L)) + (this.C_USCF[c_bulletHigh] * (H - L - (H - this.c_bullet)) / (H - L));
        c_bulletEstimate = c_bulletEstimate * c_bulletWeight;
      }
      else
      {
        c_bulletWeight = 0;
      }


      if (!this.xc_blitz && this.c_blitz >= 100 && this.c_blitz <= 3000)
      {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.C_BLITZ, this.c_blitz);
        var c_blitzLow = highLowResult[0];
        var c_blitzHigh = highLowResult[1];
        var L = this.C_BLITZ[c_blitzLow];
        var H = this.C_BLITZ[c_blitzHigh];
        c_blitzEstimate = (this.C_USCF[c_blitzLow] * (H - L - (this.c_blitz - L)) / (H - L)) + (this.C_USCF[c_blitzHigh] * (H - L - (H - this.c_blitz)) / (H - L));
        c_blitzEstimate = c_blitzEstimate * c_blitzWeight;
      }
      else
      {
        c_blitzWeight = 0;
      }
      

      if (!this.xc_rapid && this.c_rapid >= 100 && this.c_rapid <= 3000)
      {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.C_RAPID, this.c_rapid);
        var c_rapidLow = highLowResult[0];
        var c_rapidHigh = highLowResult[1];
        var L = this.C_RAPID[c_rapidLow];
        var H = this.C_RAPID[c_rapidHigh];
        c_rapidEstimate = (this.C_USCF[c_rapidLow] * (H - L - (this.c_rapid - L)) / (H - L)) + (this.C_USCF[c_rapidHigh] * (H - L - (H - this.c_rapid)) / (H - L));
        c_rapidEstimate = c_rapidEstimate * c_rapidWeight;
      }
      else
      {
        c_rapidWeight = 0;
      }

      if (numRatings > 0) {
        var totalEstimate = l_bulletEstimate + l_blitzEstimate + l_rapidEstimate + l_classicalEstimate + c_bulletEstimate + c_blitzEstimate + c_rapidEstimate;
        var totalWeight = l_bulletWeight + l_blitzWeight + l_rapidWeight + l_classicalWeight + c_bulletWeight + c_blitzWeight + c_rapidWeight;
        uscfEstimate = totalEstimate / totalWeight;
        uscfEstimate = Math.round(uscfEstimate);
      }
      else {
        uscfEstimate = 0;
      }
      
      if (uscfEstimate != 0) {
        this.uscfEstimate = uscfEstimate.toString();
      }
    }
  }

  getHighLow(timeControl: Array<number>, currentRating: number)
  {
    var low = -1;
    var high = 0;
    for (var i = 0; i < timeControl.length; i++){
      if(currentRating >= timeControl[i]){
        low = i;
        if(timeControl.length > i + 1) {
          high = i + 1;
        } 
        else {
          high = -1;
        }
      }
      else{
        break;
      }     
    }
    return [low, high];
  }    
}
