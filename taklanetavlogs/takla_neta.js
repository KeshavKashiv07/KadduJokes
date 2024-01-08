// Hersh API Key : AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs
// Keshav API Key : AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
// Harsh New API KEY : AIzaSyDmfzTHpIxSzmy1dvzKQLRxgq8uY07i4jM

// Api Keys
const subscriber_count_Api_Key = "AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs";
const video_count_Api_Key = "AIzaSyDGDUyX4agDmz2x3o8MKv48dEEDHPBRgO0";

// Takla neta vlogs channel id 
const Youtube_ID = "UCUmu2O8bSFbaUki1WCxs92A";

const subscriber_count = document.querySelector(".subs_number")
const video_count = document.querySelector(".videos_number")
const views = document.querySelector(".views_number")
//const title = document.querySelector(".channel_name_heading")
//const description = document.querySelector("#description")


// Create an object to store fetched data
const FetchedVideosData = {
    videosArray: []
};

// Function to format a numbers in K and M.
function formatNumber(number) {
    if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + 'M';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
}

// Reduce langth of a text after 20 words
function truncateText(text, numWords) {
    const words = text.split(' ');
    if (words.length > numWords) {
        const truncatedText = words.slice(0, numWords).join(' ') + '...';
        return truncatedText;
    }
    return text;
}

// Function for found search videos
const searchVideos = () => {
    try {
        //console.log("Search button clicked");
        const videoName = document.getElementById('searchInput').value.toLowerCase();
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';       

        const matchingVideos = FetchedVideosData.videosArray.filter(video => video.videoTitle.toLowerCase().includes(videoName.toLowerCase()));
        console.log("Matching videos:", matchingVideos);            

        if (videoName == "" || !videoName || matchingVideos.length == 0) {
            document.querySelector(".search-results").style.display = 'none'
        } else {
            document.querySelector(".search-results").style.display = 'block'

            document.querySelector(".search-results").innerHTML += `<div class="search-cards-content p-1"></div>`
            matchingVideos.forEach(video => {
                //console.log(`Title: ${video.videoTitle}, URL: ${video.videoUrl}, Thumbnail: ${video.videoThumnnail}`);
                let videoTitle = truncateText(video.videoTitle, 9);
                document.querySelector(".search-cards-content").innerHTML +=
                    `<li>
            <a href="${video.videoUrl}" class="search_video_title_link text-decoration-none" target="_blank">
            <div class="search_list d-flex">
                <img class="search_thumbnails img-fluid rounded-1" src="${video.videoThumnnail}" alt="..">
                <p class="search_title ms-2">${videoTitle}</p>
            </div>
            </a>
        </li>`
            });
        }
    } catch (error) {
        console.error("Error fetching search video data:", error);
    }
};


// Function to fatching subscribers , views and videos.
const getYoutubeSubscribers = async () => {
    const getSubData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Youtube_ID}&key=${subscriber_count_Api_Key}`)
    //console.log(getSubData);

    const youtube_subscribers = getSubData.data.items[0].statistics.subscriberCount;
    const youtube_videos = getSubData.data.items[0].statistics.videoCount;
    const youtube_views = getSubData.data.items[0].statistics.viewCount;
    //console.log(youtube_subscribers)

    subscriber_count.innerHTML = formatNumber(parseInt(youtube_subscribers));
    video_count.innerHTML = formatNumber(parseInt(youtube_videos));
    views.innerHTML = formatNumber(parseInt(youtube_views));
};

// Function to fatching channel name Title and description.
const getYoutubeTitle = async () => {
    const getTitleData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${Youtube_ID}&key=${video_count_Api_Key}`)
   // console.log(getTitleData);

    const channel_name = getTitleData.data.items[0].brandingSettings.channel.title;
    const channel_description = getTitleData.data.items[0].brandingSettings.channel.description;
   // console.log(channel_name);

    title.innerHTML = channel_name;
    description.innerHTML = channel_description;
};

//Function to fetch latest video details and display in a card && its for kddu joks sated api link
const getYoutubeLatestVideos = async () => {
    //const getVideoData = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UUUmu2O8bSFbaUki1WCxs92A&key=${Api_Key}`);
    try {        
        const lastest_videos_jsonUrl = 'https://script.google.com/macros/s/AKfycbxXmVY0Lftw2P47I3vGuEeEmLaiHJKcuiRYVO72VghfAXJ847cvxnkskkhbNf3L1unr/exec'

        const response = await fetch(lastest_videos_jsonUrl);
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
          `<div class="card mx-2 my-2 border border-0 rounded-3 shadow shadow-lg shadow-dark">
          <a href="${videoUrl}" class="latest_video_title_link text-decoration-none" target="_blank">
          <div class="embed-responsive embed-responsive-16by9">  
          <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid rounded-bottom-0">
          </div>
          <div class="card-body p-0 py-3 px-2 rounded-3">
              <p class="card-title latest_video_title fs-6">${videoTitle}</p>
          </div>
          </a>
          </div>`              
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};


// Function for Most Popular videos to takla neta vlogs
const getMostPopularVideos = async () => {
    // Get most popular Video from YouTube Data Api = get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${Youtube_ID}&maxResults=20&order=viewCount&regionCode=IN&key=${Popular_videos_api_key}`);

    try {
        const Most_popular_jsonUrl = 'https://script.google.com/macros/s/AKfycbwXaExHBkl47w17SqGNU9T0MBtnkjufndJ1uKF7ENkXAp2IObE070KJC4ZXXk_UyrCa/exec'

        const response = await fetch(Most_popular_jsonUrl);
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
                `<div class="card mx-2 my-2 border border-0 rounded-3 shadow shadow-lg shadow-dark">
        <a href="${videoUrl}" class="mostpopular_video_title_link text-decoration-none" target="_blank">
        <div class="embed-responsive embed-responsive-16by9">  
        <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid rounded-bottom-0">
        </div>
        <div class="card-body p-0 py-3 px-2 rounded-3">
            <p class="card-title mostpopular_video_title">${videoTitle}</p>
        </div>
        </a>
    </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}


// Function for kedranath videos to takla neta vlogs
const getSeriesKedranathVlogs = async () => {
    // Get kedranath Videos from YouTube Data Api = get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLa6FtKNCB5x928bdMQOlM00xZkAjwQonf&key=${api_key}`)

    try {
        const Series_kedarnath_jsonUrl = 'https://script.google.com/macros/s/AKfycbwYcpZqS-OSTOuSbsNqTOI5pnRdXB4X840Q35MojCKVikI0WcCz28Vc5MSU6S13XMfJ/exec'

        const response = await fetch(Series_kedarnath_jsonUrl);
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

            document.querySelector(".kedharnath-cards-content").innerHTML +=
            `<div class="card mx-2 my-2 broder border-0 shadow-lg shadow shadow-dark rounded-3">
            <a href="${videoUrl}" class="mostpopular_video_title_link text-decoration-none" target="_blank">
            <div class="embed-responsive embed-responsive-16by9">  
            <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid rounded-bottom-0">
            </div>
            <div class="card-body series_card_body p-0 py-3 px-2 rounded-bottom-3">
                <p class="card-title mostpopular_video_title"><b class="text-uppercase">Episode:</b> ${videoTitle}</p>
            </div>
            </a>
        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}


// Function for Jaipur videos to takla neta vlogs
const getSeriesJaipurVlogs = async () => {
    // Get jaipur Videos from YouTube Data Api = get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLa6FtKNCB5x9tpuOrKK-O7WkYvZPeh9EC&key=${api_key}`)

    try {
        const Series_Jaipur_jsonUrl = 'https://script.google.com/macros/s/AKfycbxUAdg9zykqlThPAEli0muAzE1wPoCji1kBAt53-EJiN4HfcapDb1s_gedfv5MZ-05u/exec'

        const response = await fetch(Series_Jaipur_jsonUrl);
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

            document.querySelector(".jaipur-cards-content").innerHTML +=
            `<div class="card mx-2 my-2 shadow shadow-lg- shadow-large rounded-3 border border-0">
            <a href="${videoUrl}" class="mostpopular_video_title_link text-decoration-none" target="_blank">
            <div class="embed-responsive embed-responsive-16by9">  
            <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid rounded-bottom-0">
            </div>
            <div class="card-body series_card_body p-0 py-3 px-2 rounded-bottom-3">
                <p class="card-title mostpopular_video_title"><b class="text-uppercase">Episode:</b>${videoTitle}</p>
            </div>
            </a>
        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}

// Function for ladhak videos to takla neta vlogs
const getSeriesLadhakVlogs = async () => {
    // Get Ladhak Videos from YouTube Data Api = get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLa6FtKNCB5x_Oouclkcicz-f-V_QZS9YO&key=${api_key}`)
    try {
        const Series_ladhak_jsonUrl = 'https://script.google.com/macros/s/AKfycbyjk3p5eISfI3L2KTCwX4Y43Ei6Un8nuOAWYXEcKxWNl4NT2ujudY9DzGtkMcS7EQtm/exec'

        const response = await fetch(Series_ladhak_jsonUrl);
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

            document.querySelector(".ladhak-cards-content").innerHTML +=
            `<div class="card mx-2 my-2 rounded-3 border border-0 shadow shadow-lg shadow-dark">
            <a href="${videoUrl}" class="mostpopular_video_title_link text-decoration-none" target="_blank">
            <div class="embed-responsive embed-responsive-16by9">  
            <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid rounded-bottom-0">
            </div>
            <div class="card-body series_card_body p-0 py-3 px-2 rounded-bottom-3">
                <p class="card-title mostpopular_video_title"><b class="text-uppercase">Episode:</b> ${videoTitle}</p>
            </div>
            </a>
        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}


getSeriesLadhakVlogs();
getSeriesJaipurVlogs();
getSeriesKedranathVlogs();
getMostPopularVideos();
getYoutubeLatestVideos();
getYoutubeSubscribers();
//getYoutubeTitle();



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


//Slider Code for Kedharnath Vlogs
const next_kedharnath = document.querySelector('#next_kedharnath')
const prev_kedharnath = document.querySelector('#prev_kedharnath')

function handleScrollNext_kedharnath(direction) {
    const cards = document.querySelector('.kedharnath-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_kedharnath(direction) {
    const cards = document.querySelector('.kedharnath-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_kedharnath.addEventListener('click', handleScrollNext_kedharnath)
prev_kedharnath.addEventListener('click', handleScrollPrev_kedharnath)


//Slider Code for Jaipur Vlogs
const next_jaipur = document.querySelector('#next_jaipur')
const prev_jaipur = document.querySelector('#prev_jaipur')

function handleScrollNext_jaipur(direction) {
    const cards = document.querySelector('.jaipur-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_jaipur(direction) {
    const cards = document.querySelector('.jaipur-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_jaipur.addEventListener('click', handleScrollNext_jaipur)
prev_jaipur.addEventListener('click', handleScrollPrev_jaipur)


//Slider Code for Ladhak Vlogs
const next_ladhak = document.querySelector('#next_ladhak')
const prev_ladhak = document.querySelector('#prev_ladhak')

function handleScrollNext_ladhak(direction) {
    const cards = document.querySelector('.ladhak-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_ladhak(direction) {
    const cards = document.querySelector('.ladhak-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_ladhak.addEventListener('click', handleScrollNext_ladhak)
prev_ladhak.addEventListener('click', handleScrollPrev_ladhak)