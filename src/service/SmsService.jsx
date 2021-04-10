export const SMSCall = (to,text) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + process.env.REACT_APP_API_KEY);
  
  var raw = JSON.stringify({"from":"+18022328089","to":"+"+to,"text":text});
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  return fetch(process.env.REACT_APP_API, requestOptions).then((response)=>{
    return response
  })
   



 
};
