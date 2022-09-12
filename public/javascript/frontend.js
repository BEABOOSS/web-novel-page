// $(document).ready(function () {
//     $("#btn-bookmark").on("click",() => {
//         $.ajax({
//             type: "POST",
//             url: "/:id/users",
//             data: { manga_id: 1357 },
//             success: function (result) {
//                 if (result == 1) {
//                     // $(this).toggleClass("on")
//                     // $(".bookmarked").removeClass("on");
//                     alert('Success');
//                     // window.location.reload();
//                 } else {
//                     alert("Please login");
//                 }
//             },
//         });
//     });
//     $("#btnUnsubscribe").click(function () {
//         $.ajax({
//             type: "POST",
//             url: "/:id/users",
//             data: { manga_id: 1357 },
//             success: function (result) {
//                 if (result == 1) {
//                     // $(this).toggleClass("on");
//                     // $(".bookmark").removeClass("on");
//                     alert('Success');
//                     // window.location.reload();
//                 } else {
//                     alert("Please login");
//                 }
//             },
//         });
//     });


// });
$(document).ready(function () {
	$("#btn-bookmarkJQ").click(function () {
		const marks = JSON.parse(localStorage.getItem("bookmark"));
		const i = $(this).data("id");
		const pos = marks.indexOf(i)



		$.post(location + "/users", () => {
			$(this).toggleClass("marked");
			if(marks.includes(i)) {
				marks.splice(pos, 1);
				return localStorage.setItem("bookmark", JSON.stringify(marks))
			} else {
				marks.push(i)
				return localStorage.setItem("bookmark", JSON.stringify(marks))
			}
		});
    });

});

// $("#btn-bookmark")
// $.delete(location + "/users" )
//  bookmark [
//     {
//         manga_title: "",
//         manga_ID: "",
//         time: number,
//     }
// ] 