const btn = document.body.getElementsByClassName("submit");




const gettingImageUrl = (arr) => {
	arr.forEach((el) => {
		console.log(el.content);
	});
};

const gettingMetaContent = () => {
	let arr1 = [];
	const specificTag = document.head.querySelectorAll("[property='og:image']");
	specificTag.forEach((el) => {
		arr1.push(el);
	});
	return arr1;
};

// gettingImageUrl(gettingMetaContent());


const displayer = () => {
    const disImg = document.body.getElementsByClassName("disImg");
    const newImg = document.createElement("img");
    
    document.body.insertAdjacentElement
};
btn.addEventListener("click",  )


class ExpandingImgList extends HTMLImgElement {
    constructor() {
        self = super();


        // this will be the img sources 
        const imgSrc = [];
        c
    }
}