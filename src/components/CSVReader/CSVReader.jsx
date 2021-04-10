import React from "react";
import CSVReader from "react-csv-reader";


// const handleForce = (data, fileInfo) => console.log(data, fileInfo);

const papaparseOptions = {
  // header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

const Reader =(props)=>{
    return(

    <CSVReader
      cssClass="react-csv-input"
      // label="Select CSV with secret Death Star statistics"
      onFileLoaded={props.handleForce}
      parserOptions={papaparseOptions}
    />
  
    )

}
export default Reader