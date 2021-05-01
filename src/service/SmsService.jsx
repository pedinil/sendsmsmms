import { Sendernumber } from "variables/config";
export const SMSCall = (to,text) => {


  var randomNumber = Math.floor(Math.random() * Sendernumber.length);
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic QUM0ODJiOTFkZWI3MjdiZmFjZTk1NWVhYzZmODRmYjczNDpjNGYxZDcxOWM5NDY0YzI4YjY1YzZlMjY0NGUzMzg0Yg==");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


  var urlencoded = new URLSearchParams();
urlencoded.append("Body", text);
urlencoded.append("From", "+"+Sendernumber[randomNumber]);
urlencoded.append("To", "+1"+to);
 
  
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};
  
  return fetch("https://api.twilio.com/2010-04-01/Accounts/AC482b91deb727bface955eac6f84fb734/Messages.json", requestOptions).then((response)=>{
    return response
  })
}






