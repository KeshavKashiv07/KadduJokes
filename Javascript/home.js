// Hersh API Key : AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs
// Keshav API Key : AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
// Harsh New API KEY : AIzaSyDmfzTHpIxSzmy1dvzKQLRxgq8uY07i4jM
// SURAJ BHAIA API KEY : AIzaSyCjSmsBb1vg7WdTtIHl_jSMsfS-RVbKMts

// Api Key created by one Mail(Keshavkashiv9650@gmail.com)
// const Channel_name_api_key = "AIzaSyCI-MNRmjQj_N8WDAyfBceT9ysj6vngMV8"          
// const Data_count_api_key="AIzaSyCg8wIGAkk-SrZ2ZPUZczMfrCicPHFPO_0"            
// const Latest_videos_api_key="AIzaSyAWt7PHwmN2fCRreVBthbEzvgad6Xjok5g"         
// const Popular_videos_api_key="AIzaSyAWt7PHwmN2fCRreVBthbEzvgad6Xjok5g"        
// const Movies_api_key="AIzaSyB0wSWtR6rnAsDR6nuhpDAH87N5SOT4uFk"   

// ApiKey created by five diffrents mails.
const Channel_name_api_key = "AIzaSyDRq7h25VI8dq5hdT5-qeT3UHmfS5-buZA"
const Data_count_api_key="AIzaSyDw4oaIHFsGEYnf0t9Vwz50j2fdtMAgl4w"
// const Latest_videos_api_key="AIzaSyCnktjLOeks-FDU9hb-zvVXUd-WvP9YrPI"
// const Popular_videos_api_key="AIzaSyDGDUyX4agDmz2x3o8MKv48dEEDHPBRgO0"
// const Movies_api_key="AIzaSyCx3WR-a4Yr_DlwaH8JrIPHBoTP3JbzG4g" 

const Youtube_ID = "UCa_O4LhZxDH1MMPUCLqNC9w";

const subscriber_count = document.querySelector("#subscriber_count")
const video_count = document.querySelector("#video_count")
const title = document.querySelector("#channel_name")
const description = document.querySelector("#description")
const views = document.querySelector("#views")

window.onload=function(){
    document.getElementById("autoplay").play();
}

//Create an object to store fetched data
const FetchedVideosData = {
    videosArray: []
};

//Function to format a numbers in K and M.
function formatNumber(number) {
    if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + 'M';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + 'K';
    } else {
        return number.toString();
    }
}

// Function for found search videos
const searchVideos = () => {
    try {
        //console.log("Search button clicked");
        const videoName = document.getElementById('searchInput').value.toLowerCase();
        //console.log("Search term:", videoName);
        const matchingVideos = FetchedVideosData.videosArray.filter(video => video.videoTitle.toLowerCase().includes(videoName.toLowerCase()));
        //console.log("Matching videos:", matchingVideos);

        //Clear previous search results
        document.querySelector(".not_found").innerHTML = "";
        document.querySelector(".Search_Cointainer").innerHTML = "";

        if (videoName == "" || !videoName || matchingVideos.length == 0) {
            //console.log("No videos found.");
            document.querySelector(".not_found").innerHTML = `<iframe class="d-flex justify-content-center" src="https://lottie.host/embed/a4c3efd3-6ed4-47d3-8c1c-aafec349987e/I5nustqYHy.json"></iframe>`
        } else {
            document.querySelector(".Search_Cointainer").innerHTML += `<section class="search_videos_container row my-3 m-0 px-3 container-fluid">
        <section class="search_video_heading col-lg-12 col-md-12 col-sm-12">
          <h3 class="search_video">Search Videos</h3>
        </section>
        <section class="search_video_cards_container my-3 p-0">
          <div class="slider">
            <button id="prev_search" class="btn"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256" fill="none" id="my-svg">
              <defs>
                <linearGradient id="gradient1">
                  <stop class="stop1" offset="0%" stop-color="#8f66ff"></stop>
                  <stop class="stop2" offset="100%" stop-color="#3d12ff"></stop>
                </linearGradient>
              </defs>
              <rect id="backgr" width="256" height="256" fill="none" rx="60"></rect>
              <g id="group" transform="translate(0,0) scale(1)">
                <path d="M128.000 74.667L85.333 128.000L128.000 181.333" stroke="#fcfcfc" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" id="primary"></path>
                <path d="M170.667 74.667L128.000 128.000L170.667 181.333" stroke="#feaa28" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" id="secondary"></path>
              </g>
            </svg>
          </button>
            <div class="search-cards-content d-flex"></div>
          <button id="next_search" class="btn"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256" fill="none" id="my-svg">
              <defs>
                <linearGradient id="gradient1">
                  <stop class="stop1" offset="0%" stop-color="#8f66ff"></stop>
                  <stop class="stop2" offset="100%" stop-color="#3d12ff"></stop>
                </linearGradient>
              </defs>
              <rect id="backgr" width="256" height="256" fill="none" rx="60"></rect>
              <g id="group" transform="translate(0,0) scale(1)">
                <path d="m128 74.667 42.667 53.333 -42.667 53.333" stroke="#fcfcfc" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" id="primary"></path>
                <path d="m85.333 74.667 42.667 53.333 -42.667 53.333" stroke="#feaa28" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" id="secondary"></path>
              </g>
            </svg>
          </button>
          </div>
        </section>
        </section>`
            matchingVideos.forEach(video => {
                //console.log(`Title: ${video.videoTitle}, URL: ${video.videoUrl}, Thumbnail: ${video.videoThumnnail}`);
                document.querySelector(".search-cards-content").innerHTML +=
                    `<div class="card mx-2 my-2">
            <a href="${video.videoUrl}" class="search_video_title_link text-decoration-none" target="_blank">
            <div class="embed-responsive embed-responsive-16by9">  
            <img src="${video.videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid">
            </div>
            <div class="card-body p-0 py-3 px-2">
                <p class="card-title search_video_title">${video.videoTitle}</p>
            </div>
            </a>
        </div>`
            });
            sliderSearch();
        }
    } catch (error) {
        console.error("Error fetching search video data:", error);
    }
};

// Function to fatching subscribers , views and videos.
const getYoutubeSubscribers = async () => {
    try {
        const getSubData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Youtube_ID}&key=${Data_count_api_key}`)
        console.log(getSubData);

        const youtube_subscribers = getSubData.data.items[0].statistics.subscriberCount;
        const youtube_videos = getSubData.data.items[0].statistics.videoCount;
        const youtube_views = getSubData.data.items[0].statistics.viewCount;

        subscriber_count.innerHTML = formatNumber(parseInt(youtube_subscribers));
        video_count.innerHTML = formatNumber(parseInt(youtube_videos));
        views.innerHTML = formatNumber(parseInt(youtube_views));
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};

// Function to fatching channel name and description.
const getYoutubeTitle = async () => {
    try {
        const getTitleData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${Youtube_ID}&key=${Channel_name_api_key}`)
        console.log(getTitleData);

        const channel_name = getTitleData.data.items[0].brandingSettings.channel.title;
        // const channel_description = getTitleData.data.items[0].brandingSettings.channel.description;

        title.innerHTML = channel_name;
        // description.innerHTML = channel_description;
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};

//Function to fetch latest video details and display in a card && its for kddu joks sated api link
const getYoutubeVideoDetails = async () => {
    //getLatestVideoData from YoutubeDataApi = get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=UUa_O4LhZxDH1MMPUCLqNC9w&key=${Latest_videos_api_key}`);

    try {        
        const jsonUrl = 'https://script.google.com/macros/s/AKfycbwcM0WFsycjZ-kXk9QwLW1otkKScaujrXLaj7VtC3yk2hCRLnX0AnzKeZ9LabOTdEms/exec'

        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log("Running", jsonData);

        // Access the items object in the JSON response
        const items = jsonData.items || {};

        // Iterate through each video entry
        Object.keys(items).forEach(key => {
            const videoEntry = items[key];
                // Access video details
                const videoId = videoEntry.videoId;
                const videoTitle = videoEntry.videoTitle;
                const videoThumnnail = videoEntry.videoThumbnail;

                // Construct video URL
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });

            document.querySelector(".cards-content").innerHTML +=
                `<div class="card mx-2 my-2">
                <a href="${videoUrl}" class="latest_video_title_link text-decoration-none" target="_blank">
                <div class="embed-responsive embed-responsive-16by9">  
                <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid">
                </div>
                <div class="card-body p-0 py-3 px-2">
                    <p class="card-title latest_video_title">${videoTitle}</p>
                </div>
                </a>
            </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }

};

// Function for Most Popular videos 
const getMostPopularVideos = async () => {
    // GetpopularVideo from YouTube Data Api = get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${Youtube_ID}&maxResults=20&order=viewCount&regionCode=IN&key=${Popular_videos_api_key}`);

    try {
        const jsonUrl = 'https://script.google.com/macros/s/AKfycbyVE4Dljnna1KK40VInXx1sx74gBRPqTWd7TrvJWp9Mb3Jdi_jx6M55R-jNWS5zqoSb5w/exec'

        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log("Running", jsonData);

        // Access the items object in the JSON response
        const items = jsonData.items || {};

        // Iterate through each video entry
        Object.keys(items).forEach(key => {
            const videoEntry = items[key];
                // Access video details
                const videoId = videoEntry.videoId;
                const videoTitle = videoEntry.videoTitle;
                const videoThumnnail = videoEntry.videoThumbnail;

                // Construct video URL
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

              // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });

            document.querySelector(".mostPopular-cards-content").innerHTML +=
                `<div class="card mx-2 my-2">
        <a href="${videoUrl}" class="mostpopular_video_title_link text-decoration-none" target="_blank">
        <div class="embed-responsive embed-responsive-16by9">  
        <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid">
        </div>
        <div class="card-body p-0 py-3 px-2">
            <p class="card-title mostpopular_video_title">${videoTitle}</p>
        </div>
        </a>
    </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}

// Function for Comedy Movies videos 
const getComedyMoviesVideos = async () => {
        // getMoviesVideo from YouTube Data Api = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${Movies_api_key}`);

    try { 
        const jsonUrl = 'https://script.google.com/macros/s/AKfycbyESb0oXqQhwNRr2F3cslm26kmHhFMxti8zRdSzlG76yQ1_iEpAUrU3hVWMkSdlX0Vbvw/exec'

        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log("Running", jsonData);

        // Access the items object in the JSON response
        const items = jsonData.items || {};

        // Iterate through each video entry
        Object.keys(items).forEach(key => {
            const videoEntry = items[key];
                // Access video details
                const videoId = videoEntry.videoId;
                const videoTitle = videoEntry.videoTitle;
                const videoThumnnail = videoEntry.videoThumbnail;

                // Construct video URL
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });

            document.querySelector(".movies-cards-content").innerHTML +=
                `<div class="card mx-2 my-2">
        <a href="${videoUrl}" class="movies_video_title_link text-decoration-none" target="_blank">
        <div class="embed-responsive embed-responsive-16by9">  
        <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid">
        </div>
        <div class="card-body p-0 py-3 px-2">
            <p class="card-title movies_video_title">${videoTitle}</p>
        </div>
        </a>
    </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}

// function when user will click on game banner
function playGame(banner_number) {
    console.log("funtion called...") 
    let anchor_teg = document.createElement("a");
    if(banner_number == 0){
        anchor_teg.href = "/learning.html";
    }else{
        anchor_teg.href = "/gaming.html";
    }
   // anchor_teg.target = "_blank";
    document.body.appendChild(anchor_teg); 
    
    //Trigger a click on the anchor element
    anchor_teg.click(); 
    //Remove the anchor element from the document (optional) 
    document.body.removeChild(anchor_teg);   
  }

getYoutubeSubscribers();
getYoutubeTitle();
getYoutubeVideoDetails();
getMostPopularVideos();
getComedyMoviesVideos();
//console.log(FetchedVideosData)


//Slider Code for Latest Videos
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')

function handleScrollNext(direction) {
    const cards = document.querySelector('.cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev(direction) {
    const cards = document.querySelector('.cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next.addEventListener('click', handleScrollNext)
prev.addEventListener('click', handleScrollPrev)




//Slider Code for Popular Videos
const next_mostPopular = document.querySelector('#next_mostPopular')
const prev_mostPopular = document.querySelector('#prev_mostPopular')

function handleScrollNext_mostPopular(direction) {
    const cards = document.querySelector('.mostPopular-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_mostPopular(direction) {
    const cards = document.querySelector('.mostPopular-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_mostPopular.addEventListener('click', handleScrollNext_mostPopular)
prev_mostPopular.addEventListener('click', handleScrollPrev_mostPopular)


//Slider Code for Movies Videos
const next_movies = document.querySelector('#next_movies')
const prev_movies = document.querySelector('#prev_movies')

function handleScrollNext_movies(direction) {
    const cards = document.querySelector('.mostPoupler-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_movies(direction) {
    const cards = document.querySelector('.mostPoupler-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_movies.addEventListener('click', handleScrollNext_movies)
prev_movies.addEventListener('click', handleScrollPrev_movies)



//Slider Function Code for Search Videos
const sliderSearch = () => {
    const next_search = document.querySelector('#next_search')
    const prev_search = document.querySelector('#prev_search')

    function handleScrollNext_search(direction) {
        const cards = document.querySelector('.search-cards-content')
        cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
    }
    function handleScrollPrev_search(direction) {
        const cards = document.querySelector('.search-cards-content')
        cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
    }
    next_search.addEventListener('click', handleScrollNext_search)
    prev_search.addEventListener('click', handleScrollPrev_search)
}






