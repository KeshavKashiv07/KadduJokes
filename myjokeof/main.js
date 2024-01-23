const Youtube_ID = "UCpAhbPa2OudKAxnnmkxsxNQ";
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

    document.querySelector(".subs_count").innerHTML = formatNumber(parseInt(youtube_subscribers));
    document.querySelector(".videos_count").innerHTML = formatNumber(parseInt(youtube_videos));
    document.querySelector(".views_count").innerHTML = formatNumber(parseInt(youtube_views));
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


//Function to fetch latest video details and display in a card && its for My Joke Of
const getLatestYoutubeVideo = async () => {
    // GET https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&&maxResults=25&playlistId=UUpAhbPa2OudKAxnnmkxsxNQ&key=AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
    try {
        const Latest_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbzgoWqojbX8bbEOnYVhTV7Wxi_hXaa8gwCcTkCdlimfyscTBXSGEpVwjr_O-gT_-hws/exec'

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
            const truncate_title = truncateText(videoTitle, 7);
            document.querySelector(".cards-content").innerHTML +=
            `<div class="card border border-4 shadow shadow-lg rounded-3 m-1">
                            <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                                    src="${videoThumnnail}" alt=""
                                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-bottom-0 img-fluid"></a>
                            <div
                                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-3 border border-0">
                                <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                                    <p class="card-title fs-5 py-2 rounded-5 fw-normal">${truncate_title}</p>
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




// Function to fetch most popular video details and display in a card && its for My Joke Of
const getMostPopularVideo = async () => {
    //GET - https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCpAhbPa2OudKAxnnmkxsxNQ&maxResults=25&order=viewCount&regionCode=IN&key=AIzaSyCnktjLOeks-FDU9hb-zvVXUd-WvP9YrPI
    try {
        const most_popular_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbyysjG-SD_4ArTSEtdHaL6nGsN_QZ2awOGhhxGnV-w7BbQKL4PGMR66_EVp82qKd_h4/exec'

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
            `<div class="card border border-4 shadow shadow-lg rounded-3 m-1">
                            <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                                    src="${videoThumnnail}" alt=""
                                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-bottom-0 img-fluid"></a>
                            <div
                                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-3 border border-0">
                                <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                                    <p class="card-title fs-5 py-2 rounded-5 fw-normal">${truncate_title}</p>
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




// Function to fetch Takla Neta kala kaddu comedy video details and display in a card && its for My Joke of
const getTaklaNetaKalaKadduComedy = async () => {
    //Takla Neta Kala Kaddu Comedy = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=40&playlistId=PLTJGSCxoSkBuYqA4KvMs6lVh_xciHh5Gk&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    const TaklaNetaKalaKaddu_jsonUrl = 'https://script.google.com/macros/s/AKfycbxoK5ll9tbOebN9Q8AmNLNjMk21VHaXZ1fV4EnUxg9EOcQW4AKrfQoyvpu0Ceigjhvs/exec'
    try {

        const response = await fetch(TaklaNetaKalaKaddu_jsonUrl);
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
            document.querySelector(".TaklaNetaKalaKaddu-cards-content").innerHTML +=
            `<div class="card border border-4 shadow shadow-lg rounded-3 m-1">
                            <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                                    src="${videoThumnnail}" alt=""
                                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-bottom-0 img-fluid"></a>
                            <div
                                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-3 border border-0">
                                <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                                    <p class="card-title fs-5 py-2 rounded-5 fw-normal">${truncate_title}</p>
                                </a>
                            </div>
                        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getTaklaNetaKalaKadduComedy();

// //Slider Code for TaklaNetaKalaKaddu Videos
const next_TaklaNetaKalaKaddu = document.querySelector('#next_TaklaNetaKalaKaddu')
const prev_TaklaNetaKalaKaddu = document.querySelector('#prev_TaklaNetaKalaKaddu')

function handleScrollNext_TaklaNetaKalaKaddu(direction) {
    const cards = document.querySelector('.TaklaNetaKalaKaddu-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_TaklaNetaKalaKaddu(direction) {
    const cards = document.querySelector('.TaklaNetaKalaKaddu-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_TaklaNetaKalaKaddu.addEventListener('click', handleScrollNext_TaklaNetaKalaKaddu)
prev_TaklaNetaKalaKaddu.addEventListener('click', handleScrollPrev_TaklaNetaKalaKaddu)



// Function to fetch KalaKaddu Or Takla Neta Animated Comedy video details and display in a card && its for My joke Of
const getKalaKadduTaklaNetaAnimatedComedy = async () => {
    // getKalaKadduTaklaNetaAnimatedComedy = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=40&playlistId=PLTJGSCxoSkBsntySMgcVcgo6MglKT6FHG&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    const KalaKadduTaklaNetaAnimated_jsonUrl = 'https://script.google.com/macros/s/AKfycbwhPCrUkz5DylC2Mq-T7Y9IQdis7MGVMiDOX8BE9sS3L2GDGxg384ZoV6eHzTIZvVph/exec'
    try {

        const response = await fetch(KalaKadduTaklaNetaAnimated_jsonUrl);
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
            document.querySelector(".KalaKadduTaklaNetaAnimated-cards-content").innerHTML +=
            `<div class="card border border-4 shadow shadow-lg rounded-3 m-1">
                            <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                                    src="${videoThumnnail}" alt=""
                                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-bottom-0 img-fluid"></a>
                            <div
                                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-3 border border-0">
                                <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                                    <p class="card-title fs-5 py-2 rounded-5 fw-normal">${truncate_title}</p>
                                </a>
                            </div>
                        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getKalaKadduTaklaNetaAnimatedComedy();

// //Slider Code for KalaKadduTaklaNetaAnimatedComedy Videos
const next_KalaKadduTaklaNetaAnimated = document.querySelector('#next_KalaKadduTaklaNetaAnimated')
const prev_KalaKadduTaklaNetaAnimated = document.querySelector('#prev_KalaKadduTaklaNetaAnimated')

function handleScrollNext_KalaKadduTaklaNetaAnimated(direction) {
    const cards = document.querySelector('.KalaKadduTaklaNetaAnimated-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_KalaKadduTaklaNetaAnimated(direction) {
    const cards = document.querySelector('.KalaKadduTaklaNetaAnimated-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_KalaKadduTaklaNetaAnimated.addEventListener('click', handleScrollNext_KalaKadduTaklaNetaAnimated)
prev_KalaKadduTaklaNetaAnimated.addEventListener('click', handleScrollPrev_KalaKadduTaklaNetaAnimated)



// Function to fetch KalaKadduKaJudwaa Or Takla Neta Animated Comedy video details and display in a card && its for My joke Of
const getKalaKadduKaJudwaa = async () => {
    // getKalaKadduTaklaNetaAnimatedComedy = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLTJGSCxoSkBvCVvRUNlkBJ4xq6g1FSISf&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    const KalaKadduKaJudwaa_jsonUrl = 'https://script.google.com/macros/s/AKfycbzF9eWuqVtoEXx8MwIq3lHZcnBK8C1oOq9OHCCrGjzYkpdSTthJXdhU9B8yHwIZTNEw/exec'
    try {

        const response = await fetch(KalaKadduKaJudwaa_jsonUrl);
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
            document.querySelector(".KalaKadduKaJudwaa-cards-content").innerHTML +=
            `<div class="card border border-4 shadow shadow-lg rounded-3 m-1">
                            <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                                    src="${videoThumnnail}" alt=""
                                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-bottom-0 img-fluid"></a>
                            <div
                                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-3 border border-0">
                                <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                                    <p class="card-title fs-5 py-2 rounded-5 fw-normal">${truncate_title}</p>
                                </a>
                            </div>
                </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getKalaKadduKaJudwaa();

// //Slider Code for KalaKadduKaJudwaa Videos
const next_KalaKadduKaJudwaa = document.querySelector('#next_KalaKadduKaJudwaa')
const prev_KalaKadduKaJudwaa = document.querySelector('#prev_KalaKadduKaJudwaa')

function handleScrollNext_KalaKadduKaJudwaa(direction) {
    const cards = document.querySelector('.KalaKadduKaJudwaa-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_KalaKadduKaJudwaa(direction) {
    const cards = document.querySelector('.KalaKadduKaJudwaa-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_KalaKadduKaJudwaa.addEventListener('click', handleScrollNext_KalaKadduKaJudwaa)
prev_KalaKadduKaJudwaa.addEventListener('click', handleScrollPrev_KalaKadduKaJudwaa)




// Function to fetch GarmiMaiBaarish video details and display in a card && its for My Joke Of
const getGarmiMaiBaarishVideo = async () => {
    // GarmiMaiBaarish = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=40&playlistId=PLTJGSCxoSkBvjgan_cNw0H_ddcJVxasFi&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    const GarmiMaiBaarish_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbzI5PxEW7EqMQk2r34vRsd0q-G9IjlhP5QcDzH79zrb8MD46u9HTfqbu4WhOwVNZJp4/exec'
    try {

        const response = await fetch(GarmiMaiBaarish_video_jsonUrl);
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
            document.querySelector(".GarmiMaiBaarish-cards-content").innerHTML +=
            `<div class="card border border-4 shadow shadow-lg rounded-3 m-1">
                            <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                                    src="${videoThumnnail}" alt=""
                                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-bottom-0 img-fluid"></a>
                            <div
                                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-3 border border-0">
                                <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                                    <p class="card-title fs-5 py-2 rounded-5 fw-normal">${truncate_title}</p>
                                </a>
                            </div>
                        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getGarmiMaiBaarishVideo();

//Slider Code for GarmiMaiBaarish Videos
const next_GarmiMaiBaarish = document.querySelector('#next_GarmiMaiBaarish')
const prev_GarmiMaiBaarish = document.querySelector('#prev_GarmiMaiBaarish')

function handleScrollNext_GarmiMaiBaarish(direction) {
    const cards = document.querySelector('.GarmiMaiBaarish-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_GarmiMaiBaarish(direction) {
    const cards = document.querySelector('.GarmiMaiBaarish-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_GarmiMaiBaarish.addEventListener('click', handleScrollNext_GarmiMaiBaarish)
prev_GarmiMaiBaarish.addEventListener('click', handleScrollPrev_GarmiMaiBaarish)




// Function to fetch ComedyToons video details and display in a card && its for My joke Of
const getComedyToonsVideo = async () => {
    // ComedyToons = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLTJGSCxoSkBvZYQQRByMrUfO0eEY2Mcp8&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    const ComedyToons_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbwzYmVtaS1IfSf_rTEPlci5OcjksJ8zC4otMFQhdFdYEgUoO1ij_KHwfVHngPIAqKI/exec'
    try {

        const response = await fetch(ComedyToons_video_jsonUrl);
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
            document.querySelector(".ComedyToons-cards-content").innerHTML +=
            `<div class="card border border-4 shadow shadow-lg rounded-3 m-1">
                            <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                                    src="${videoThumnnail}" alt=""
                                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-bottom-0 img-fluid"></a>
                            <div
                                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-3 border border-0">
                                <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                                    <p class="card-title fs-5 py-2 rounded-5 fw-normal">${truncate_title}</p>
                                </a>
                            </div>
                        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getComedyToonsVideo();

//Slider Code for ComedyToons Videos
const next_ComedyToons = document.querySelector('#next_ComedyToons')
const prev_ComedyToons = document.querySelector('#prev_ComedyToons')

function handleScrollNext_ComedyToons(direction) {
    const cards = document.querySelector('.ComedyToons-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_ComedyToons(direction) {
    const cards = document.querySelector('.ComedyToons-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_ComedyToons.addEventListener('click', handleScrollNext_ComedyToons)
prev_ComedyToons.addEventListener('click', handleScrollPrev_ComedyToons)



// Function to fetch movies video details and display in a card && its for My joke Of
const getMoviesVideo = async () => {
    // ComedyToons = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLTJGSCxoSkBtObeTN7LCMKyEls2wdkq34&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    const movies_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbyfoe7VsmYEP46h1s-GSvLZ6e7er79IO8KY7Ju9yhmOcONTJzXZPH5FqLE_HuYM7ZbY/exec'
    try {

        const response = await fetch(movies_video_jsonUrl);
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
            document.querySelector(".movies-cards-content").innerHTML +=
            `<div class="card border border-4 shadow shadow-lg rounded-3 m-1">
                            <a href="${videoUrl}" target="_blank" class="thumbnail_link"><img
                                    src="${videoThumnnail}" alt=""
                                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-bottom-0 img-fluid"></a>
                            <div
                                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-3 border border-0">
                                <a href="${videoUrl}" target="_blank" class="title_link text-decoration-none">
                                    <p class="card-title fs-5 py-2 rounded-5 fw-normal">${truncate_title}</p>
                                </a>
                            </div>
                        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getMoviesVideo();

//Slider Code for movies Videos
const next_movies = document.querySelector('#next_movies')
const prev_movies = document.querySelector('#prev_movies')

function handleScrollNext_movies(direction) {
    const cards = document.querySelector('.movies-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_movies(direction) {
    const cards = document.querySelector('.movies-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_movies.addEventListener('click', handleScrollNext_movies)
prev_movies.addEventListener('click', handleScrollPrev_movies)

