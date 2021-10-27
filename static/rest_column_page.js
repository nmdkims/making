$(document).ready(function () {
    rest_page();
    $('#popup_auth').hide()
    $('#accom_refer').hide()
    $('#accom_show').hide()
});


var count = 0


function rest_page() {
    $.ajax({
        type: "POST",
        url: "/api/rest",
        data: {count_give:count},
        success: function (response) {
            let rest = response['rest']
            for (let i = 0 ; i < rest.length ; i ++)
            {
                let title = rest[i]['title']
                let img = rest[i]['img']
                let sub_title = rest[i]['sub_title']
                let item_tags1 = rest[i]['item_tags1']
                let item_tags2 = rest[i]['item_tags2']
                let item_tags3 = rest[i]['item_tags3']
                let sub_item_tag = rest[i]['sub_item_tag']
                let sub_item_tag2 = rest[i]['sub_item_tag2']
                let sub_item_tag3 = rest[i]['sub_item_tag3']
                let sub_item_tag4 = rest[i]['sub_item_tag4']
                let sub_item_tag5 = rest[i]['sub_item_tag5']
                let like = rest[i]['like']

                if (sub_item_tag == null ){
                    sub_item_tag = '　'
                    sub_item_tag2 = '　'
                    sub_item_tag3 = '　'
                    sub_item_tag4 = '　'
                    sub_item_tag5 = '　'   
                } else if (sub_item_tag2 == null ){
                    sub_item_tag2 = ''
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag3 == null ){
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag4 == null ){
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                }
                else if (sub_item_tag5 == null ){
                    sub_item_tag5 = ''
                }
                if (like == 0) {
                    like = '　'
                }
                
                
                let temp_html = `
                <div class="card" id="card_${i}">
            <img class="card-img-top"
                 src="${img}"
                 alt="Card image cap">
            <p class="card-title">${title}</p>
            <p class="card-text">${sub_title}</p>
            <p class="card-text">${item_tags1} ${item_tags2} ${item_tags3}</p>
            <p class="card-text">${sub_item_tag} ${sub_item_tag2} ${sub_item_tag3} ${sub_item_tag4} ${sub_item_tag5}</p>
            <button class="card_like" onclick="rest_like('${title}')"> 좋아요 <br><span style="color:red;">${like} </span></br></button>
            <button class="card_accom" onclick="accom0_show('${title}')"> 동행 </button>
            <button class="card_review" onclick="review0_show('${title}')"> 리뷰 </button>
            
        `
                $('#colum_container').append(temp_html)
            }
        }
    })
    count += 8;
}

function rest_like(title){
    $.ajax({
        type: 'POST',
        url: '/api/rest_like',
        data: {title_give: title},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });

}

$(window).on("scroll", function() {
	var scrollHeight = $(document).height();
	var scrollPosition = $(window).height() + $(window).scrollTop();		

	$("#scrollHeight").text(scrollHeight);
	$("#scrollPosition").text(scrollPosition);
	$("#bottom").text(scrollHeight - scrollPosition);

	if (scrollPosition > scrollHeight -1) {			
		rest_page()
	}
});