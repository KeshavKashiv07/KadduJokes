// Hersh API Key : AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs
// Keshav API Key : AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
// Harsh New API KEY : AIzaSyDmfzTHpIxSzmy1dvzKQLRxgq8uY07i4jM

const Api_Key = "AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs";
// Takla neta vlogs channel id 
const Youtube_ID = "UCUmu2O8bSFbaUki1WCxs92A";

const subscriber_count = document.querySelector(".subscriber_number")
const video_count = document.querySelector(".totalvideos_number")
const title = document.querySelector(".channel_name_heading")
const description = document.querySelector("#description")
const views = document.querySelector(".totalviews_number")

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
                <img class="search_thumbnails" src="${video.videoThumnnail}" alt="..">
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
    const getSubData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Youtube_ID}&key=${Api_Key}`)
    //console.log(getSubData);

    const youtube_subscribers = getSubData.data.items[0].statistics.subscriberCount;
    const youtube_videos = getSubData.data.items[0].statistics.videoCount;
    const youtube_views = getSubData.data.items[0].statistics.viewCount;
    //console.log(youtube_subscribers)

    subscriber_count.innerHTML = formatNumber(parseInt(youtube_subscribers));
    video_count.innerHTML = formatNumber(parseInt(youtube_videos));
    views.innerHTML = formatNumber(parseInt(youtube_views));
};

// Function to fatching channel name and description.
const getYoutubeTitle = async () => {
    const getTitleData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${Youtube_ID}&key=${Api_Key}`)
   // console.log(getTitleData);

    const channel_name = getTitleData.data.items[0].brandingSettings.channel.title;
    const channel_description = getTitleData.data.items[0].brandingSettings.channel.description;
   // console.log(channel_name);

    title.innerHTML = channel_name;
    description.innerHTML = channel_description;
};

//Function to fetch latest video details and display in a card && its for kddu joks sated api link
const getYoutubeVideoDetails = async () => {
    try {
        const getVideoData = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UUUmu2O8bSFbaUki1WCxs92A&key=${Api_Key}`);
        //console.log(getVideoData);
        
        const videos = getVideoData.data.items;
        videos.forEach(video => {
            const videoId = video.snippet.resourceId.videoId;
            const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
            // console.log(videoUrl);

            const videoTitle = video.snippet.title;
            const videoTitles = document.querySelector(".videoTitle")            
            //console.log(videoTitle);

            const videoThumnnail = video.snippet.thumbnails.medium.url;
            //videoTitles.innerHTML += `<img src="${videoThumnnail}" alt=".."><h6>${videoTitle}</h6><hr>`;
            // console.log(videoThumnnail)

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });
        });

    } catch (error) {
        console.error("Error fetching video data:", error);
    }

};


getYoutubeVideoDetails();
getYoutubeSubscribers();
getYoutubeTitle();