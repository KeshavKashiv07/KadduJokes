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
                style="width: 20rem;" data-aos="flip-left">
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
                style="width: 20rem;" data-aos="flip-right">
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



// Function to fetch Pagal Beta video details and display in a card && its for Kala Kaddu comedy
const getPagaBetaVideo = async () => {
    // PagaBeta = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PL5mykMgzfcCaTlnmFkwvYfqo8zcCisJis&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    const PagaBeta_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbwIgR56e5DP4D1FTbA3a2O4bQqETFCCbIqH0FxlrbMVMytaV1tSlzqMZqBHtqSOPghUbw/exec'
    try {

        const response = await fetch(PagaBeta_video_jsonUrl);
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
            const truncate_title = truncateText(videoTitle, 5);
            document.querySelector(".PagaBeta-cards-content").innerHTML +=
                `<div class="series_cards card mx-2 rounded-4 shadow shadow-lg shadow-dark bg-transparent">
                <a href="${videoUrl}" class="thumbnail_link"><img
                        src="${videoThumnnail}" alt=""
                        class="p-0 thumbnail_img thumbnail-img card-img-top rounded-top-4"></a>
                <div
                    class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-4 align-items-center">
                    <a href="${videoUrl}" class="title_link text-decoration-none">
                        <p class="card-title fs-5 py-2 rounded-5 fw-medium">${truncate_title}</p>
                    </a>
                </div>
            </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getPagaBetaVideo();

// //Slider Code for PagaBeta Videos
const next_PagaBeta = document.querySelector('#next_PagaBeta')
const prev_PagaBeta = document.querySelector('#prev_PagaBeta')

function handleScrollNext_PagaBeta(direction) {
    const cards = document.querySelector('.PagaBeta-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_PagaBeta(direction) {
    const cards = document.querySelector('.PagaBeta-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_PagaBeta.addEventListener('click', handleScrollNext_PagaBeta)
prev_PagaBeta.addEventListener('click', handleScrollPrev_PagaBeta)



// Function to fetch EnglishSpekingClasses video details and display in a card && its for Kala Kaddu comedy
const getEnglishSpekingClassesVideo = async () => {
    // EnglishSpekingClasses = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PL5mykMgzfcCbqGWj_oRjBuua1hx7kBafE&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    try {
        const EnglishSpekingClasses_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbxywI1fWZ6T0sWyphP0Xjp4VshDZE725csIf12buSGSBdop0Kv163n7d1QSPEN_I8B_tQ/exec'

        const response = await fetch(EnglishSpekingClasses_video_jsonUrl);
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
            const truncate_title = truncateText(videoTitle, 5);
            document.querySelector(".EnglishSpekingClasses-cards-content").innerHTML +=
            `<div class="series_cards card mx-2 rounded-4 shadow shadow-lg shadow-dark bg-transparent">
            <a href="${videoUrl}" class="thumbnail_link"><img
                    src="${videoThumnnail}" alt=""
                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-top-4"></a>
            <div
                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-4 align-items-center">
                <a href="${videoUrl}" class="title_link text-decoration-none">
                    <p class="card-title fs-5 py-2 rounded-5 fw-medium">${truncate_title}</p>
                </a>
            </div>
        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getEnglishSpekingClassesVideo();

//Slider Code for English Speking Classes Videos
const next_EnglishSpekingClasses = document.querySelector('#next_EnglishSpekingClasses')
const prev_EnglishSpekingClasses = document.querySelector('#prev_EnglishSpekingClasses')

function handleScrollNext_EnglishSpekingClasses(direction) {
    const cards = document.querySelector('.EnglishSpekingClasses-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_EnglishSpekingClasses(direction) {
    const cards = document.querySelector('.EnglishSpekingClasses-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_EnglishSpekingClasses.addEventListener('click', handleScrollNext_EnglishSpekingClasses)
prev_EnglishSpekingClasses.addEventListener('click', handleScrollPrev_EnglishSpekingClasses)


// Function to fetch NoteBan video details and display in a card && its for Kala Kaddu comedy
const getNoteBanVideo = async () => {
    // 2000 Ka note Ban = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PL5mykMgzfcCafN03at0O0aZ7W7y5tjayT&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    try {
        const NoteBan_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbz2yHk8reIbzPa0gkjj8ptlDums0JBkEi0ARkVk3Oot1-0pB3zhT5YDlNx52w7_aOrxQA/exec'

        const response = await fetch(NoteBan_video_jsonUrl);
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
            // console.log(videoUrl)

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });
            const truncate_title = truncateText(videoTitle, 5);
            document.querySelector(".NoteBan-cards-content").innerHTML +=
            `<div class="series_cards card mx-2 rounded-4 shadow shadow-lg shadow-dark bg-transparent">
            <a href="${videoUrl}" class="thumbnail_link"><img
                    src="${videoThumnnail}" alt=""
                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-top-4"></a>
            <div
                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-4 align-items-center">
                <a href="${videoUrl}" class="title_link text-decoration-none">
                    <p class="card-title fs-5 py-2 rounded-5 fw-medium">${truncate_title}</p>
                </a>
            </div>
        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getNoteBanVideo();

//Slider Code for Note Ban Videos
const next_NoteBan = document.querySelector('#next_NoteBan')
const prev_NoteBan = document.querySelector('#prev_NoteBan')

function handleScrollNext_NoteBan(direction) {
    const cards = document.querySelector('.NoteBan-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_NoteBan(direction) {
    const cards = document.querySelector('.NoteBan-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_NoteBan.addEventListener('click', handleScrollNext_NoteBan)
prev_NoteBan.addEventListener('click', handleScrollPrev_NoteBan)



// Function to fetch TrainYatra video details and display in a card && its for Kala Kaddu comedy
const getTrainYatraVideo = async () => {
    // TrainYatra = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PL5mykMgzfcCbSgBGYLwaS42pKbawD2rg1&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    try {
        const TrainYatra_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbzBkUswBeu088CGDPqHTQ5dxiZR27GDzFKOOZJcwjW_Y7UtjNjIYHXWCTEjn9fTVwhW/exec'

        const response = await fetch(TrainYatra_video_jsonUrl);
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
            const truncate_title = truncateText(videoTitle, 5);
            document.querySelector(".TrainYatra-cards-content").innerHTML +=
            `<div class="series_cards card mx-2 rounded-4 shadow shadow-lg shadow-dark bg-transparent">
            <a href="${videoUrl}" class="thumbnail_link"><img
                    src="${videoThumnnail}" alt=""
                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-top-4"></a>
            <div
                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-4 align-items-center">
                <a href="${videoUrl}" class="title_link text-decoration-none">
                    <p class="card-title fs-5 py-2 rounded-5 fw-medium">${truncate_title}</p>
                </a>
            </div>
        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getTrainYatraVideo();

//Slider Code for Train Yatra Videos
const next_TrainYatra = document.querySelector('#next_TrainYatra')
const prev_TrainYatra = document.querySelector('#prev_TrainYatra')

function handleScrollNext_TrainYatra(direction) {
    const cards = document.querySelector('.TrainYatra-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_TrainYatra(direction) {
    const cards = document.querySelector('.TrainYatra-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_TrainYatra.addEventListener('click', handleScrollNext_TrainYatra)
prev_TrainYatra.addEventListener('click', handleScrollPrev_TrainYatra)



// Function to fetch School Life video details and display in a card && its for Kala Kaddu comedy
const getSchoolLifeVideo = async () => {
    // School Life = Get_Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PL5mykMgzfcCY7YNtopdCYhNsVH-_cSlMZ&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    try {
        const SchoolLife_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbx7g7v2SVHWrIw2F6DLxOn8g6-9qWifRNPpYdXPZrLFX5ToO-V1VltJVLBJsUc0R32LoQ/exec'

        const response = await fetch(SchoolLife_video_jsonUrl);
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
            const truncate_title = truncateText(videoTitle, 5);
            document.querySelector(".SchoolLife-cards-content").innerHTML +=
            `<div class="series_cards card mx-2 rounded-4 shadow shadow-lg shadow-dark bg-transparent">
            <a href="${videoUrl}" class="thumbnail_link"><img
                    src="${videoThumnnail}" alt=""
                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-top-4"></a>
            <div
                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-4 align-items-center">
                <a href="${videoUrl}" class="title_link text-decoration-none">
                    <p class="card-title fs-5 py-2 rounded-5 fw-medium">${truncate_title}</p>
                </a>
            </div>
        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getSchoolLifeVideo();

//Slider Code for School Life Videos
const next_SchoolLife = document.querySelector('#next_SchoolLife')
const prev_SchoolLife = document.querySelector('#prev_SchoolLife')

function handleScrollNext_SchoolLife(direction) {
    const cards = document.querySelector('.SchoolLife-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_SchoolLife(direction) {
    const cards = document.querySelector('.SchoolLife-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_SchoolLife.addEventListener('click', handleScrollNext_SchoolLife)
prev_SchoolLife.addEventListener('click', handleScrollPrev_SchoolLife)




// Function to fetch ShadiKaRishta video details and display in a card && its for Kala Kaddu comedy
const getShadiKaRishtaVideo = async () => {
    // Shadi ka rishta = Get-Api ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PL5mykMgzfcCaLpuFglAFw9-OJxljWT2ch&key=AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs")
    try {
        const ShadiKaRishta_video_jsonUrl = 'https://script.google.com/macros/s/AKfycbwH6xYVsHgaCzPgru_lL4Rf6d8WBlGlSfMzd0pa85ykbPLn4bCNRESNYB5mQVsNf6MO7A/exec'

        const response = await fetch(ShadiKaRishta_video_jsonUrl);
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
            const truncate_title = truncateText(videoTitle, 5);
            document.querySelector(".ShadiKaRishta-cards-content").innerHTML +=
            `<div class="series_cards card mx-2 rounded-4 shadow shadow-lg shadow-dark bg-transparent">
            <a href="${videoUrl}" class="thumbnail_link"><img
                    src="${videoThumnnail}" alt=""
                    class="p-0 thumbnail_img thumbnail-img card-img-top rounded-top-4"></a>
            <div
                class="card-body py-2 px-2 d-flex justify-content-center rounded-bottom-4 align-items-center">
                <a href="${videoUrl}" class="title_link text-decoration-none">
                    <p class="card-title fs-5 py-2 rounded-5 fw-medium">${truncate_title}</p>
                </a>
            </div>
        </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getShadiKaRishtaVideo();

// Slider Code for Shadi Ka Rishta Videos
const next_ShadiKaRishta = document.querySelector('#next_ShadiKaRishta')
const prev_ShadiKaRishta = document.querySelector('#prev_ShadiKaRishta')

function handleScrollNext_ShadiKaRishta(direction) {
    const cards = document.querySelector('.ShadiKaRishta-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_ShadiKaRishta(direction) {
    const cards = document.querySelector('.ShadiKaRishta-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_ShadiKaRishta.addEventListener('click', handleScrollNext_ShadiKaRishta)
prev_ShadiKaRishta.addEventListener('click', handleScrollPrev_ShadiKaRishta)



