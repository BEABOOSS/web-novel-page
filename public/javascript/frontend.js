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
			$("#btn-bookmarkJQ").addClass("marked").html("Bookmarked");
		}
	});
	// upon button click adds||remove the marked class 
	$("#btn-bookmarkJQ").click(function () {
		const marks = JSON.parse(localStorage.getItem("bookmark"));
		const i = $(this).data("id");
		const pos = marks.indexOf(i);

		if (!marks.includes(i)) {
			marks.push(i);
			localStorage.setItem("bookmark", JSON.stringify(marks));
			$("#btn-bookmarkJQ").addClass("marked").html("Bookmarked");
			location.reload();
		} else {
			marks.splice(pos, 1);
			localStorage.setItem("bookmark", JSON.stringify(marks));
			$("#btn-bookmarkJQ").removeClass("marked").html("Bookmark")
			location.reload();
		}
	});
});

