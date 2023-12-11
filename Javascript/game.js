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
  }


const the_animation_right = document.querySelectorAll('.animation_right')


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation')
        }
            else {
                entry.target.classList.remove('scroll-animation')
            }
        
    })
},
   { threshold: 0.5
   });
   
  for (let i = 0; i < the_animation_right.length; i++) {
   const elements = the_animation_right[i];

    observer.observe(elements);
  }

  
  const the_animation_left = document.querySelectorAll('.animation_left')

  const observer_left = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation_left')
        }
            else {
                entry.target.classList.remove('scroll-animation_left')
            }
        
    })
},
   { threshold: 0.5
   });

  for (let i = 0; i < the_animation_left.length; i++) {
    const elements = the_animation_left[i];
 
     observer_left.observe(elements);
   }