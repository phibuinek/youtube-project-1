import axios from "axios";
console.log(process.env.YT_API_KEY);
const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        // key:'AIzaSyD1tPeS3M6PaJmkEbKon17LGJ1zKDAN4Gc'
        key:'AIzaSyDtIgEAgQVUoHP7e2qBOner2IOae44dZnk'
        // key:'AIzaSyAVGsYSJ0eswo_BMG7gk6tTCoV61gFWwGo'
        // key:'AIzaSyDrn3qxGC3Cr-o32TUm-Yb8JSD5Ycnazcw'
        // key:'AIzaSyD4OV0NdLnr6-KHHBDYPDftu8bOE7MyAvc'
    },
    // withCredentials: true,
})

export default request