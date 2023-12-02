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
const getYoutubeSubscribers = async () =>{
    const getSubData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Youtube_ID}&key=${Api_Key}`)
    console.log(getSubData);

    const youtube_subscribers = getSubData.data.items[0].statistics.subscriberCount;
    const youtube_videos = getSubData.data.items[0].statistics.videoCount;
    const youtube_views = getSubData.data.items[0].statistics.viewCount;

    subscriber_count.innerHTML = formatNumber(parseInt(youtube_subscribers));
    video_count.innerHTML = youtube_videos;
    views.innerHTML = formatNumber(parseInt(youtube_views));
};

// Function to fatching channel name and description.
const getYoutubeTitle = async () =>{
    const getTitleData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${Youtube_ID}&key=${Api_Key}`)
    console.log(getTitleData);

    const channel_name = getTitleData.data.items[0].brandingSettings.channel.title; 
    const channel_description = getTitleData.data.items[0].brandingSettings.channel.description;
    
    title.innerHTML = channel_name;
    description.innerHTML = channel_description;
};

getYoutubeSubscribers();
getYoutubeTitle();