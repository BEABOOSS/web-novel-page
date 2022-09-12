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
		let i = $(this).data("id");
		$.post(location + "/users");
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