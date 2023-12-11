// Download function when user will click on download button
function gameDownload() {
    console.log("funtion download...") 
    const gameLink = "https://play.google.com/store/apps/details?id=com.Kalakaddu.KalaKadduGame&hl=en&gl=US";

    let anchor_teg = document.createElement("a");
    anchor_teg.href = gameLink;
    anchor_teg.target = "_blank";
    document.body.appendChild(anchor_teg); 

    //Trigger a click on the anchor element
    anchor_teg.click(); 
    //Remove the anchor element from the document (optional) 
    document.body.removeChild(anchor_teg);   
  }S