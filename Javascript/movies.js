// Hersh API Key : AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs
// Keshav API Key : AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
// Harsh New API KEY : AIzaSyDmfzTHpIxSzmy1dvzKQLRxgq8uY07i4jM

const Api_Key = "AIzaSyDmfzTHpIxSzmy1dvzKQLRxgq8uY07i4jM";
const Youtube_ID = "UCa_O4LhZxDH1MMPUCLqNC9w";


//Create an object to store fetched data
const FetchedVideosData = {
    videosArray: []
};

const getComedyMoviesVideos = async () => {
    console.log("funtion runing...")
    try {
        const playlistId ="PLQlbrD8-eMGVf6LK-zz5pgTbl6AYocaeR"
        const getMoviesVideo = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${Api_Key}`);
        console.log(getMoviesVideo);

        videos = getMoviesVideo.data.items;
        videos.forEach(video => {
            const videoId = video.snippet.resourceId.videoId;
            const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
            const videoTitle = video.snippet.title;
            const videoThumnnail = video.snippet.thumbnails.high.url;           

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });

            document.querySelector(".movies_cards").innerHTML +=
                `<div class="card m-2" style="width:20rem;">
                <img src="${videoThumnnail}" class="card-img-top img-fluid" alt="thumbnails">
                <div class="card-body px-1">
                  <h6 class="card-title movie_title_link mb-4">${videoTitle}</h6>
                  <a href="${videoUrl} target="_blank" class="watch_movie_btn btn px-1 d-flex justify-content-center ">Watch now</a>
                </div>
                <div></div>
              </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}

// Function for found search videos
const searchVideos = () => {
    try {
       // console.log("Search button clicked");
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
            matchingVideos.forEach(video => {
                console.log(`Title: ${video.videoTitle}, URL: ${video.videoUrl}, Thumbnail: ${video.videoThumnnail}`);
                document.querySelector(".Search_Cointainer").innerHTML +=
                `<div class="card m-2" style="width:20rem;">
                <img src="${video.videoThumnnail}" class="card-img-top img-fluid" alt="thumbnails">
                <div class="card-body px-1">
                  <h6 class="card-title movie_title_link mb-4">${video.videoTitle}</h6>
                  <a href="${video.videoUrl} target="_blank" class="watch_movie_btn btn px-1 d-flex justify-content-center ">Watch now</a>
                </div>
                <div></div>
              </div>`
            });
        }
    } catch (error) {
        console.error("Error fetching search video data:", error);
    }
};

getComedyMoviesVideos();