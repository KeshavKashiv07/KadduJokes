const Youtube_ID = "UC5rn9EzkT8pEOueG8P7E2Zw";
const Api_Key = "AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E"

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

// Create an object to store fetched data for search videos
const FetchedVideosData = {
    videosArray: []
};

// Function to fatching Subscribers , Views and Videos Count for Gora kaddu comedy.
const getYoutubeSubscribers = async () => {
    const getSubData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Youtube_ID}&key=${Api_Key}`)
    //console.log(getSubData);

    const youtube_subscribers = getSubData.data.items[0].statistics.subscriberCount;
    const youtube_videos = getSubData.data.items[0].statistics.videoCount;
    const youtube_views = getSubData.data.items[0].statistics.viewCount;

    document.querySelector(".subs_number").innerHTML = formatNumber(parseInt(youtube_subscribers));
    document.querySelector(".videos_number").innerHTML = formatNumber(parseInt(youtube_videos));
    document.querySelector(".views_number").innerHTML = formatNumber(parseInt(youtube_views));
};
getYoutubeSubscribers();


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

//Function to fetch latest video details and display in a card && its for Kala Kaddu comedy
const getLatestYoutubeVideo = async () => {
// GET https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UU5rn9EzkT8pEOueG8P7E2Zw&key=AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
try {
        const Latest_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbyrNFpSXDFZ-VM82rJH8gK3R-4DD5vEIOI7_8LO7gz_RRNA7uyp7cY0cnRLfCoWo5iKbw/exec'

        const response = await fetch(Latest_video_jsonUrl);
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
            const truncate_title = truncateText(videoTitle, 8);
            document.querySelector(".cards-content").innerHTML +=
                ` <div class="card mx-2 rounded-4 shadow shadow-lg shadow-dark bg-transparent border border-4"
                style="width: 20rem;">
                <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                        src="${videoThumnnail}" alt=""
                        class="p-0 thumbnail_img thumbnail-img card-img-top rounded-top-4"></a>
                <div class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-4">
                    <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                        <p class="card-title fs-5 py-2 rounded-5 fw-medium">${truncate_title}</p>
                    </a>
                </div>
            </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getLatestYoutubeVideo();


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



// Function to fetch most popular video details and display in a card && its for Gora Kaddu comedy
const getMostPopularVideo = async () => {
//GET - https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC5rn9EzkT8pEOueG8P7E2Zw&maxResults=20&order=viewCount&regionCode=IN&key=AIzaSyCnktjLOeks-FDU9hb-zvVXUd-WvP9YrPI
try {
        const most_popular_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbzWIbUILgkv0Wn7pl421XHrSSv9Jqhh9JrB-i52UvEMEADiKOfHFsambcn7ZlvGuw-tZg/exec'

        const response = await fetch(most_popular_video_jsonUrl);
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
           //console.log(videoUrl)

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });
            const truncate_title = truncateText(videoTitle, 7);
            document.querySelector(".mostPopular-cards-content").innerHTML +=
                ` <div class="card mx-2 rounded-4 shadow shadow-lg shadow-dark bg-transparent border border-4"
                style="width: 20rem;">
                <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                        src="${videoThumnnail}" alt=""
                        class="p-0 thumbnail_img thumbnail-img card-img-top rounded-top-4"></a>
                <div class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-4">
                    <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                        <p class="card-title fs-5 py-2 rounded-5 fw-medium">${truncate_title}</p>
                    </a>
                </div>
            </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getMostPopularVideo();

//Slider Code for Most Popular Videos
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