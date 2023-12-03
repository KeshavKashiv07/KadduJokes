const Api_Key = "AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E";
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
                `<div class="cards">
                <a href="${videoUrl}" class="latest_video_title_link" target="_blank">
                <div class="cards-img">                      
                      <img src="${videoThumnnail}" alt="" height="250" width="300">
                </div>
                <div class="cards-text">
                    <h6>${videoTitle}</h6>
                </div>
                </a>
            </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }

};

getYoutubeSubscribers();
getYoutubeTitle();
getYoutubeVideoDetails();



// Slider Code
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