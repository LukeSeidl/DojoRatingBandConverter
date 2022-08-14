import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'OTBRatingEstimator';
  lichessUserID = "";
  chessComUserID = "";
  USCFID = "";
  fideEstimate = "";
  L_MESSAGE = "";
  C_MESSAGE = "";
  U_MESSAGE = "";
  l_classical = 0;
  c_rapid = 0;
  u_classical = 0;
  returned = 0;
  requested = 0;
  L_CLASSICAL = [600,1100,1225,1290,1350,1415,1475,1575,1675,1750,1825,1900,2000,2075,2150,2225,2300,2375,2450,2525,2600,3000];
  C_RAPID =     [100,650,  850, 950,1050,1150,1250,1350,1450,1550,1650,1750,1850,1950,2050,2150,2250,2350,2425,2525,2600,3000];
  U_CLASSICAL = [0,  450,  650, 750, 850, 950,1050,1150,1250,1350,1450,1550,1650,1775,1875,1975,2100,2200,2300,2400,2500,3000];
  F_CLASSICAL=  [0,  400,  600, 700, 800, 900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,3000]

  estimateFIDE() {
    this.L_MESSAGE = "";
    this.C_MESSAGE = "";
    this.U_MESSAGE = "";
    this.l_classical = 0;
    this.c_rapid = 0;
    this.u_classical = 0;
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
    if (this.USCFID != "") {
      this.USCFID = this.USCFID.trim();
      this.requested += 1;
    }
    if (this.lichessUserID != "") {
      this.getLichessUserData(this.lichessUserID).then(l_results => {
        this.l_classical = l_results;
        if (this.L_MESSAGE != "User does not exist") {
          if (this.l_classical > 0){
            var l_ratingsUsed = 'Classical: ' + this.l_classical;
            this.L_MESSAGE = l_ratingsUsed;
          }
          else {
            this.L_MESSAGE = 'User has no eligible ratings';
          }
        }
        this.returned += 1;
        this.estimateFIDEFromLichessChessComAndUSCF();
      });
    }
    if (this.chessComUserID != "") {
      this.getChessComUserData(this.chessComUserID).then(c_results => {
        this.c_rapid = c_results;
        if (this.C_MESSAGE != "User does not exist") {
          if (this.c_rapid > 0) {
            var c_ratingsUsed = 'Rapid: ' + this.c_rapid;
            this.C_MESSAGE = c_ratingsUsed;
          }
          else {
            this.C_MESSAGE = 'User has no eligible ratings';
          }
        }
        this.returned += 1;
        this.estimateFIDEFromLichessChessComAndUSCF();
      });
    }
    if (this.USCFID != "") {
      this.getUSCFUserData(this.USCFID).then(u_results => {
        this.u_classical = u_results;
        if (this.U_MESSAGE != "User does not exist") {
          if (this.u_classical > 0) {
            var u_ratingsUsed = 'Rapid: ' + this.c_rapid;
            this.U_MESSAGE =  u_ratingsUsed;
          }
          else {
            this.U_MESSAGE = 'User has no eligible ratings';
          }
        }
        this.returned += 1;
        this.estimateFIDEFromLichessChessComAndUSCF();
      });
    }
  }

  async getLichessUserData(userID: string) {
    this.L_MESSAGE = "";
    var result = await fetch("https://lichess.org/api/user/" + userID + "?callback=JSON_CALLBACK").then(response => response.json()).then(data => {
      if (data['perfs'] == undefined) {
        this.L_MESSAGE = "User does not exist";
        return 0;
      }
      else {
        return data['perfs']['classical']['rating'];
      }
    }).catch(() => {
      this.L_MESSAGE = "User does not exist";
      return 0;
    });
    return result;
  }

  async getChessComUserData(userID: string) {
    this.C_MESSAGE = "";
    var result = await fetch("https://api.chess.com/pub/player/" + userID + "/stats").then(response => response.json()).then(data => {
      try {
        if (data['code'] == 0) {
          this.C_MESSAGE = "User does not exist";
          return 0;
        }
      }
      catch(e) {}
      try {
        var rapid = parseInt(data['chess_rapid']['last']['rating']);
      }
      catch (e) {
        var rapid = 0;
      }
      return rapid;
    }).catch(() => {
      this.C_MESSAGE = "User does not exist";
      return 0;
    });
    return result;
  }

  async getUSCFUserData(userID: string) {
    this.U_MESSAGE = "";
    try{
      var result = await fetch("http://www.uschess.org/msa/thin.php?" + userID).then(response => response.json()).then(data => {
        var body = data;
        console.log(body);
      });
    }
    catch(x){
      console.log(x);
      this.U_MESSAGE = "User does not exist";
      return 0;
    };
    return 0; //result;
  }

  estimateFIDEFromLichessChessComAndUSCF() {
    var fideEstimate = 0;
    if (this.returned == this.requested) {
      var numRatings = 0;
      var l_classicalEstimate = 0;
      var c_rapidEstimate = 0;
      var u_classicalEstimate = 0;
      var l_classicalWeight = 1;
      var c_rapidWeight = 1;
      var u_classicalWeight = 1;
      if (this.l_classical >= 100 && this.l_classical <= 3000)
      {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.L_CLASSICAL, this.l_classical);
        var l_classicalLow = highLowResult[0];
        var l_classicalHigh = highLowResult[1];
        var L = this.L_CLASSICAL[l_classicalLow];
        var H = this.L_CLASSICAL[l_classicalHigh];
        l_classicalEstimate = (this.F_CLASSICAL[l_classicalLow] * (H - L - (this.l_classical - L)) / (H - L)) + (this.F_CLASSICAL[l_classicalHigh] * (H - L - (H - this.l_classical)) / (H - L));
        l_classicalEstimate = l_classicalEstimate * l_classicalWeight;
      }
      else
      {
        l_classicalWeight = 0;
      }
    
      if (this.c_rapid >= 100 && this.c_rapid <= 3000)
      {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.C_RAPID, this.c_rapid);
        var c_rapidLow = highLowResult[0];
        var c_rapidHigh = highLowResult[1];
        var L = this.C_RAPID[c_rapidLow];
        var H = this.C_RAPID[c_rapidHigh];
        c_rapidEstimate = (this.F_CLASSICAL[c_rapidLow] * (H - L - (this.c_rapid - L)) / (H - L)) + (this.F_CLASSICAL[c_rapidHigh] * (H - L - (H - this.c_rapid)) / (H - L));
        c_rapidEstimate = c_rapidEstimate * c_rapidWeight;
      }
      else
      {
        c_rapidWeight = 0;
      }

      if (this.u_classical >= 100 && this.u_classical <= 3000)
      {
        numRatings += 1;
        var highLowResult = this.getHighLow(this.U_CLASSICAL, this.u_classical);
        var u_classicalLow = highLowResult[0];
        var u_classicalHigh = highLowResult[1];
        var L = this.U_CLASSICAL[u_classicalLow];
        var H = this.C_RAPID[u_classicalHigh];
        u_classicalEstimate = (this.F_CLASSICAL[u_classicalLow] * (H - L - (this.u_classical - L)) / (H - L)) + (this.F_CLASSICAL[u_classicalHigh] * (H - L - (H - this.u_classical)) / (H - L));
        u_classicalEstimate = u_classicalEstimate * u_classicalWeight;
      }
      else
      {
        u_classicalWeight = 0;
      }

      if (numRatings > 0) {
        var totalEstimate = l_classicalEstimate + c_rapidEstimate + u_classicalEstimate;
        var totalWeight = l_classicalWeight + c_rapidWeight + u_classicalEstimate;
        fideEstimate = totalEstimate / totalWeight;
        fideEstimate = Math.round(fideEstimate);
      }
      else {
        fideEstimate = 0;
      }
      
      if (fideEstimate != 0) {
        this.fideEstimate = fideEstimate.toString();
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
