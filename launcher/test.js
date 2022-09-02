// loadFile();

function loadFile() {
	const chartContainer = document.createElement("canvas");
	chartContainer.setAttribute("id", "chartContainer");
	document.body.appendChild(chartContainer);

	const script = document.createElement("script");
	script.src = "https://cdn.jsdelivr.net/npm/chart.js";
	document.body.appendChild(script);
	script.onload = () => {
		const domScript = document.createElement("script");
		domScript.src = chrome.extension.getURL("js/dom/chart.js");
		document.body.appendChild(domScript);
	};
}

// makingFile();
// const makingFile = () => {
// 	console.log(imgArr)
// 	<a href="imgArr:application/octet-stream;charset=utf-16le;base64,//5mAG8AbwAgAGIAYQByAAoA" alt="txt.csv">text file</a>
// };



// const st_Mkt_ImgUrl = Array.from(document.body.getElementsByClassName("wrap_img uk-width-1-1 no_gap"));
// const imgArr = st_Mkt_ImgUrl.map((x) => x.lastChild.dataset.src);
const st_Scans_ImgUrl_M = Array.from(document.body.getElementsByClassName("alignnone"));
const imgArr = st_Scans_ImgUrl_M.map(x=> x.attributes.src.nodeValue);

console.log(imgArr)

const file = new File(imgArr, "note.json", {
	type: "text/javascript",
});


const download = () => {
	const link = document.createElement("a");
	const url = URL.createObjectURL(file);

	link.href = url;
	link.download = file.name;
	document.body.appendChild(link);
	link.click();

	document.body.removeChild(link);
	window.URL.revokeObjectURL(url);
};
download();
