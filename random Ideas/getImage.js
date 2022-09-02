const imgObj = require("./data.json");
const newImg = document.createElement("img");
const currentDiv = document.body.getElementsByClassName("currentDiv");
// I think I should do a get request for the body and add the info I need to the data base  
// Only need to run once though!!






// ONLY WORKS FOR https://levelingwithgods.com/manga/leveling-with-the-gods/

const st_ImgURl = Array.from(document.head.querySelectorAll("[property='og:image']"));
const st_title = document.head.querySelectorAll("[property='og:title']");

st_ImgUrl.map(x=> x.content)



// ----------------------------------------------------------------
// 						ASURA SCANS
// ----------------------------------------------------------------



const st_Scans_ImgUrl_FL = Array.from(document.body.getElementsByClassName("aligncenter"));
const st_Scans_ImgUrl_M = Array.from(document.body.getElementsByClassName("alignnone"));

st_Scans_ImgUrl_M.map(x=> x.attributes.src.nodeValue);




// ----------------------------------------------------------------
// 						Manga Katana
// ----------------------------------------------------------------



const st_Mkt_ImgUrl = Array.from(document.body.getElementsByClassName("wrap_img uk-width-1-1 no_gap"))
const st_Mkt_Genre = Array.from(document.body.getElementsByClassName("text_0"))
const st_Mkt_Description = Array.from(document.body.getElementsByClassName("summary"))

st_Mkt_Description[0].lastElementChild.childNodes
st_Mkt_Genre.map(x=> x.innerText)
st_Mkt_ImgUrl.map(x => x.lastChild.dataset.src);



// ----------------------------------
// to display the image on the page
// ----------------------------------
const displayImg = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		currentDiv.insertAdjacentElement("beforeend", (newImg.src = arr[i]));
	}
};

displayImg(imgObj);
