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
            const videoThumnnail = video.snippet.thumbnails.medium.url;

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });

            document.querySelector(".movies_cards").innerHTML +=
                `<div class="card m-2" style="width: 18rem;">
                <img src="${videoThumnnail}" class="card-img-top" alt="thumbnails">
                <div class="card-body">
                  <h6 class="card-title">${videoTitle}</h6>
                  <a href="${videoUrl} target="_blank" class="btn btn-primary d-flex justify-content-center">Watch now</a>
                </div>
                <div></div>
              </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}

getComedyMoviesVideos();