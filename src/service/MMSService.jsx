import { Sendernumber } from "variables/config";
export const MMSCall = (to,text,subject,url) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer KEY017885264DC34E24A3D2BE9822E77C28_wYeNcb6EX7N5kq26gA0bDQ");
    
    var randomNumber = Math.floor(Math.random() * Sendernumber.length);

   


    var raw = JSON.stringify({"from":"+"+Sendernumber[randomNumber],"to":"+1"+to,"text":text,"subject":subject,"media_urls" : [
        url
      ]});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return fetch("https://api.telnyx.com/v2/messages", requestOptions).then((response)=>{
      return response
    })
     
  
  
  
   
  };
