import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event, context) => {
    var userID = event.queryStringParameters != null ? event.queryStringParameters.id : 0;
    var result = await fetch("http://www.uschess.org/msa/thin.php?" + userID).then(response => response.text()).then(data => {
        var body = data;
        var startIdx = data.indexOf("<tr><td>Reg. Rating</td><td>");
        var ratingLine = data.substring(startIdx);
        var endIdx = ratingLine.indexOf("</tr>")
        ratingLine = ratingLine.substring(0, endIdx);
        startIdx = ratingLine.indexOf("value=")
        var ratingValue = ratingLine.substring(startIdx);
        endIdx = ratingValue.indexOf(" ");
        ratingValue = ratingValue.substring(7,endIdx);
        var rating = parseInt(ratingValue);
        return {
            statusCode: 200,
            body: JSON.stringify(rating),
        };
    });
    return {
        statusCode: 200,
        body:JSON.stringify(result)
    };
};

export { handler };