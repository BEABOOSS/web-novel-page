$(document).ready(function () {
	// checks if localStorage exist if not then create non important data 
	$(function () {
		if (localStorage.getItem("bookmark") === null) {
			localStorage.setItem("bookmark", JSON.stringify(["404"]));
		}
	});
	// checks if you have bookmarked anything in previous sessions 
	$(function () {
		const marks = JSON.parse(localStorage.getItem("bookmark"));
		const i = $("#btn-bookmarkJQ").data("id");
		if (marks.includes(i)) {
			return $("#btn-bookmarkJQ").addClass("marked");
		}
	});
	// upon button click adds||remove the marked class 
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
