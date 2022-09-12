
$(document).ready(function () {
    $("#btnBookmark").on("click",() => {
        $.ajax({
            type: "POST",
            url: "/uploads/:id/users",
            data: { manga_id: 1357 },
            success: function (result) {
                if (result == 1) {
                    // $(this).toggleClass("on")
                    // $(".bookmarked").removeClass("on");
                    alert('Success');
                    // window.location.reload();
                } else {
                    alert("Please login");
                }
            },
        }),
    })

    // $("#btnUnsubscribe").click(function () {
    //     $.ajax({
    //         type: "POST",
    //         url: "/uploads/:id/users",
    //         data: { manga_id: 1357 },
    //         success: function (result) {
    //             if (result == 1) {
    //                 // $(this).toggleClass("on");
    //                 // $(".bookmark").removeClass("on");
    //                 alert('Success');
    //                 // window.location.reload();
    //             } else {
    //                 alert("Please login");
    //             }
    //         },
    //     });
    // });
});