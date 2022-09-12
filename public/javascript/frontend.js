$(document).ready(function () {
	$(function () {
		if (localStorage.getItem("bookmark") === null) {
			// const a = JSON.parse(localStorage.getItem("bookmark"));
			localStorage.setItem("bookmark", JSON.stringify(["afsdfas"]));
			// alert("hi new user!")
		}
	});
	$(function () {
		const marks = JSON.parse(localStorage.getItem("bookmark"));
		const i = $("#btn-bookmarkJQ").data("id");
		if (localStorage.getItem("bookmark") === undefined || !marks.includes(i)) {
			return $("#btn-bookmarkJQ").addClass("marked");
		}
	});

	$("#btn-bookmarkJQ").click(function () {
		const marks = JSON.parse(localStorage.getItem("bookmark"));
		const i = $(this).data("id");
		const pos = marks.indexOf(i);

		if (localStorage.getItem("bookmark") === undefined || !marks.includes(i)) {
			marks.push(i);
			localStorage.setItem("bookmark", JSON.stringify(marks));
			$("#btn-bookmarkJQ").addClass("marked");
			location.reload();
		} else {
			marks.splice(pos, 1);
			localStorage.setItem("bookmark", JSON.stringify(marks));
			$("#btn-bookmarkJQ").removeClass("marked");
			location.reload();
		}
	});
});

//  bookmark [
//     {
//         manga_title: "",
//         manga_ID: "",
//         time: number,
//     }
// ]
