const Youtube_ID = "UCCnFJiBDyBObpeln2cZDyyA";
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


//Function to fetch latest video details and display in a card && its for Gora Kaddu comedy
const getLatestYoutubeVideo = async () => {
    // https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UUCnFJiBDyBObpeln2cZDyyA&key=AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
    try {
        const Latest_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbzBkkccNrpjqTu6luT9wYMA_gcHmtwhWNYOWjj5BO64u1bkSGNmRJE8ipFSajGqQhY_kw/exec'

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
            const newTitle = truncateText(videoTitle, 5);
            document.querySelector(".cards-content").innerHTML +=
                `<div class="card m-2 border-5 border-light" style="width: 18rem;">
            <a href="${videoUrl}" class="img_link"><img src="${videoThumnnail}"
                    class="card-img-top img-thumbnail p-2 rounded-0 rounded-bottom-2" alt="..."></a>
            <div class="card-body">
                <a href=""${videoUrl}"" class="card_title_link text-decoration-none">
                    <p class="card-text fw-medium px-0 py-0">${newTitle}</p>
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




//Function to fetch most popular video details and display in a card && its for Gora Kaddu comedy
const getMostPopularVideo = async () => {
    // https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${Youtube_ID}&maxResults=20&order=viewCount&regionCode=IN&key=${Popular_videos_api_key}
    try {
        const most_popular_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbw8v9TKk7RqLbzNj22JOchkB79iSBO0StseUTVNE-nnIeVgzkMV4GPiXVK3nEt8c_tk3Q/exec'

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

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });
            const newTitle = truncateText(videoTitle, 5);
            document.querySelector(".mostPopular-cards-content").innerHTML +=
                `<div class="card m-2 border-5 border-light" style="width: 18rem;">
                <a href="${videoUrl}" class="img_link"><img src="${videoThumnnail}"
                        class="card-img-top img-thumbnail p-2 rounded-0 rounded-bottom-2" alt="..."></a>
                <div class="card-body">
                    <a href=""${videoUrl}"" class="card_title_link text-decoration-none">
                        <p class="card-text fw-medium px-0 py-0">${newTitle}</p>
                    </a>
                </div>
            </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getMostPopularVideo();

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