const Api_Key = "AIzaSyDmfzTHpIxSzmy1dvzKQLRxgq8uY07i4jM";
const Youtube_ID = "UCa_O4LhZxDH1MMPUCLqNC9w";

const subscriber_count = document.querySelector("#subscriber_count")
const video_count = document.querySelector("#video_count")
const title = document.querySelector("#channel_name")
const description = document.querySelector("#description")
const views = document.querySelector("#views")

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

// Function to fatching subscribers , views and videos.
const getYoutubeSubscribers = async () => {
    try {
        const getSubData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Youtube_ID}&key=${Api_Key}`)
        console.log(getSubData);

        const youtube_subscribers = getSubData.data.items[0].statistics.subscriberCount;
        const youtube_videos = getSubData.data.items[0].statistics.videoCount;
        const youtube_views = getSubData.data.items[0].statistics.viewCount;

        subscriber_count.innerHTML = formatNumber(parseInt(youtube_subscribers));
        video_count.innerHTML = youtube_videos;
        views.innerHTML = formatNumber(parseInt(youtube_views));
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};

// Function to fatching channel name and description.
const getYoutubeTitle = async () => {
    try {
        const getTitleData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${Youtube_ID}&key=${Api_Key}`)
        console.log(getTitleData);

        const channel_name = getTitleData.data.items[0].brandingSettings.channel.title;
        const channel_description = getTitleData.data.items[0].brandingSettings.channel.description;

        title.innerHTML = channel_name;
        description.innerHTML = channel_description;
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};

//Function to fetch video details and display in a card && its for kddu joks sated api link
const getYoutubeVideoDetails = async () => {
    try {
        const getVideoData = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=UUa_O4LhZxDH1MMPUCLqNC9w&key=${Api_Key}`);
        console.log(getVideoData);

        const videos = getVideoData.data.items;
        videos.forEach(video => {
            const videoUrl = 'https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId;
            const videoTitle = video.snippet.title;
            const videoThumnnail = video.snippet.thumbnails.medium.url;

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
const getMostPopularVideos = async()=>{   
    try {
   const getpopularVideo = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${Youtube_ID}&maxResults=50&order=viewCount&regionCode=IN&key=${Api_Key}`);
    console.log(getpopularVideo);

    const videos = getpopularVideo.data.items;
     videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
        console.log(videoUrl);

        const videoTitle = video.snippet.title;
        console.log(videoTitle);

        const videoThumnnail = video.snippet.thumbnails.medium.url;
        console.log(videoThumnnail)

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
const getComedyMoviesVideos = async()=>{   
    try {
         const getMoviesVideo = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLQlbrD8-eMGVf6LK-zz5pgTbl6AYocaeR&key=${Api_Key}`);
         console.log(getMoviesVideo);

        videos = getMoviesVideo.data.items;
        videos.forEach(video => {
        const videoId = video.snippet.resourceId.videoId;
        const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
        console.log(videoUrl);

        const videoTitle = video.snippet.title;
        console.log(videoTitle);

        const videoThumnnail = video.snippet.thumbnails.medium.url;
        console.log(videoThumnnail)

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

getYoutubeSubscribers();
getYoutubeTitle();
getYoutubeVideoDetails();
getMostPopularVideos();
getComedyMoviesVideos();


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