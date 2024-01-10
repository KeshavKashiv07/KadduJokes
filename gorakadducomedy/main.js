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
            const truncate_title = truncateText(videoTitle, 5);
            document.querySelector(".cards-content").innerHTML +=
                `<div class="card m-2 border-5 rounded-3 border-light" style="width: 18rem;">
            <a href="${videoUrl}" target="_blank" class="img_link"><img src="${videoThumnnail}"
                    class="card-img-top img-thumbnail rounded-top-3 shadow rounded-bottom-0 border-0 p-0" alt="..."></a>
            <div class="card-body">
                <a href="${videoUrl}" target="_blank" class="card_title_link text-decoration-none">
                    <p class="card-text fw-medium px-0 py-0">${truncate_title}</p>
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
            const truncate_title = truncateText(videoTitle, 5);
            document.querySelector(".mostPopular-cards-content").innerHTML +=
                `<div class="card m-2 rounded-3 border-5 border-light" >
                <a href="${videoUrl}" target="_blank" class="img_link"><img src="${videoThumnnail}"
                        class="card-img-top img-thumbnail border-0 p-0 shadow rounded-top-3 rounded-bottom-0" alt="..."></a>
                <div class="card-body">
                    <a href="${videoUrl}" target="_blank" class="card_title_link text-decoration-none">
                        <p class="card-text fw-medium px-0 py-0">${truncate_title}</p>
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



//Function to fetch Band_Aur_Baraati video details and display in a card && its for Gora Kaddu comedy
const getBandAurBaraatiVideos = async () => {
    // "Playlist_id": "PLJhBye4d4noSdUK735XKPtfTpt7uTpfdU"
    // GET https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLJhBye4d4noSdUK735XKPtfTpt7uTpfdU&key=AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
    try {
        const Band_Aur_Baraati_jsonUrl = 'https://script.google.com/macros/s/AKfycbw3VKmAls5fE56Whpd90zyX82YzrohNqdRzQdeVRGQIvGwoF0TAA-Kfv8LNWLM3B1szvQ/exec'

        const response = await fetch(Band_Aur_Baraati_jsonUrl);
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
            const truncate_title = truncateText(videoTitle, 5);
            document.querySelector(".BandAurBaraati-cards-content").innerHTML +=
                `<div class="card m-2 rounded-3 border-5 border-light" >
                <a href="${videoUrl}" target="_blank" class="img_link"><img src="${videoThumnnail}"
                        class="card-img-top img-thumbnail border-0 p-0 shadow rounded-top-3 rounded-bottom-0" alt="..."></a>
                <div class="card-body">
                    <a href="${videoUrl}" target="_blank" class="card_title_link text-decoration-none">
                        <p class="card-text fw-medium px-0 py-0">${truncate_title}</p>
                    </a>
                </div>
            </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};
getBandAurBaraatiVideos();

//Slider Code for Band aur Baraati Videos
const next_BandAurBaraati = document.querySelector('#next_BandAurBaraati')
const prev_BandAurBaraati = document.querySelector('#prev_BandAurBaraati')

function handleScrollNext_BandAurBaraati(direction) {
    const cards = document.querySelector('.BandAurBaraati-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_BandAurBaraati(direction) {
    const cards = document.querySelector('.BandAurBaraati-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_BandAurBaraati.addEventListener('click', handleScrollNext_BandAurBaraati)
prev_BandAurBaraati.addEventListener('click', handleScrollPrev_BandAurBaraati)




//Function to fetch Music Classes video details and display in a card && its for Gora Kaddu comedy
const getMusicClassesVideos = async () => {
    // "playlist id": "PLJhBye4d4noQsnIi48lhjM3qm3uX7TdxR",
    // GET https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLJhBye4d4noQsnIi48lhjM3qm3uX7TdxR&key=AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
     try {
         const MusicClasses_jsonUrl = 'https://script.google.com/macros/s/AKfycbz7PcNMBgWK_1iTq4MJOJFB42w-5UfwKJ6jeFTfOUfiLeu4MrU1l2SwUwIzM2RKyDeO4Q/exec'
 
         const response = await fetch(MusicClasses_jsonUrl);
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
             const truncate_title = truncateText(videoTitle, 5);
             document.querySelector(".MusicClasses-cards-content").innerHTML +=
                 `<div class="card m-2 rounded-3 border-5 border-light" >
                 <a href="${videoUrl}" target="_blank" class="img_link"><img src="${videoThumnnail}"
                         class="card-img-top img-thumbnail border-0 p-0 shadow rounded-top-3 rounded-bottom-0" alt="..."></a>
                 <div class="card-body">
                     <a href="${videoUrl}" target="_blank" class="card_title_link text-decoration-none">
                         <p class="card-text fw-medium px-0 py-0">${truncate_title}</p>
                     </a>
                 </div>
             </div>`
         });
     } catch (error) {
         console.error("Error fetching video data:", error);
     }
 };
 getMusicClassesVideos();
 
 //Slider Code for Music Classes Videos
 const next_MusicClasses = document.querySelector('#next_MusicClasses')
 const prev_MusicClasses = document.querySelector('#prev_MusicClasses')
 
 function handleScrollNext_MusicClasses(direction) {
     const cards = document.querySelector('.MusicClasses-cards-content')
     cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
 }
 function handleScrollPrev_MusicClasses(direction) {
     const cards = document.querySelector('.MusicClasses-cards-content')
     cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
 }
 next_MusicClasses.addEventListener('click', handleScrollNext_MusicClasses)
 prev_MusicClasses.addEventListener('click', handleScrollPrev_MusicClasses)


 //Function to fetch OnlineClasses video details and display in a card && its for Gora Kaddu comedy
const getOnlineClassesVideos = async () => {
    // "Playlist id": "PLJhBye4d4noSiY1-EH1VU_fmeL-nR2Me2"
    // GET https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLJhBye4d4noSiY1-EH1VU_fmeL-nR2Me2&key=AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
     try {
         const OnlineClasses_jsonUrl = 'https://script.google.com/macros/s/AKfycbzJLZ9YL5FxKJ5eq-Nk4vXbOZ4kt0oTzmrfbKNSBOq3xOgDM0HHm2sNdvWbz7HNnZByhQ/exec'
 
         const response = await fetch(OnlineClasses_jsonUrl);
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
             const truncate_title = truncateText(videoTitle, 5);
             document.querySelector(".OnlineClasses-cards-content").innerHTML +=
                 `<div class="card m-2 rounded-3 border-5 border-light" >
                 <a href="${videoUrl}" target="_blank" class="img_link"><img src="${videoThumnnail}"
                         class="card-img-top img-thumbnail border-0 p-0 shadow rounded-top-3 rounded-bottom-0" alt="..."></a>
                 <div class="card-body">
                     <a href="${videoUrl}" target="_blank" class="card_title_link text-decoration-none">
                         <p class="card-text fw-medium px-0 py-0">${truncate_title}</p>
                     </a>
                 </div>
             </div>`
         });
     } catch (error) {
         console.error("Error fetching video data:", error);
     }
 };
 getOnlineClassesVideos();
 
 //Slider Code for Online classes Videos
 const next_OnlineClasses = document.querySelector('#next_OnlineClasses')
 const prev_OnlineClasses = document.querySelector('#prev_OnlineClasses')
 
 function handleScrollNext_OnlineClasses(direction) {
     const cards = document.querySelector('.OnlineClasses-cards-content')
     cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
 }
 function handleScrollPrev_OnlineClasses(direction) {
     const cards = document.querySelector('.OnlineClasses-cards-content')
     cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
 }
 next_OnlineClasses.addEventListener('click', handleScrollNext_OnlineClasses)
 prev_OnlineClasses.addEventListener('click', handleScrollPrev_OnlineClasses)


//Function to fetch KalaKadduLLB video details and display in a card && its for Gora Kaddu comedy
const getKalaKadduLLBVideos = async () => {
   // "Playlist id": "PLJhBye4d4noSEy5ype3HoJxDJYtI_dSJ_"
    // GET https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLJhBye4d4noSEy5ype3HoJxDJYtI_dSJ_&key=AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
     try {
         const KalaKadduLLB_jsonUrl = 'https://script.google.com/macros/s/AKfycbz0TRvWTJwj7tRRVTrzgI8UZCeHRy_3OkmxeGNR7LxW5t2pDj4D2ypmpR2U9zQOQuMk7w/exec'
 
         const response = await fetch(KalaKadduLLB_jsonUrl);
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
             const truncate_title = truncateText(videoTitle, 5);
             document.querySelector(".KalaKadduLLB-cards-content").innerHTML +=
                 `<div class="card m-2 rounded-3 border-5 border-light" >
                 <a href="${videoUrl}" target="_blank" class="img_link"><img src="${videoThumnnail}"
                         class="card-img-top img-thumbnail border-0 p-0 shadow rounded-top-3 rounded-bottom-0" alt="..."></a>
                 <div class="card-body">
                     <a href="${videoUrl}" target="_blank" class="card_title_link text-decoration-none">
                         <p class="card-text fw-medium px-0 py-0">${truncate_title}</p>
                     </a>
                 </div>
             </div>`
         });
     } catch (error) {
         console.error("Error fetching video data:", error);
     }
 };
 getKalaKadduLLBVideos();
 
 //Slider Code for KalaKadduLLB Videos
 const next_KalaKadduLLB = document.querySelector('#next_KalaKadduLLB')
 const prev_KalaKadduLLB = document.querySelector('#prev_KalaKadduLLB')
 
 function handleScrollNext_KalaKadduLLB(direction) {
     const cards = document.querySelector('.KalaKadduLLB-cards-content')
     cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
 }
 function handleScrollPrev_KalaKadduLLB(direction) {
     const cards = document.querySelector('.KalaKadduLLB-cards-content')
     cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
 }
 next_KalaKadduLLB.addEventListener('click', handleScrollNext_KalaKadduLLB)
 prev_KalaKadduLLB.addEventListener('click', handleScrollPrev_KalaKadduLLB)


  