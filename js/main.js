// MT1.11 Compat
var $E = function(selector, filter){
	return ($(filter) || document).getElement(selector);
};

var $ES = function(selector, filter){
	return ($(filter) || document).getElements(selector);
};


jQuery( document ).ready(function( $ ) {

    var validatePhone = function(num) {
        num = num.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '');
        num = num.replace("+", "").replace(/\-/g, '');

        if (num.charAt(0) == "1")
            num = num.substr(1);

        if (num.length != 10)
            return false;

        return num;
    }

    $('#phoneForm').submit(function(e) {
        e.preventDefault();
        $('#call_button').click();
    });

    $('#call_button').click(function(e) {

        var phone = $('#phone').val();

        if (!validatePhone(phone))
            return alert('Please enter a valid US phone number!');

        var data = {
            campaignId: 'fcc-blanket', 
            userPhone: phone,
            zipcode: '95051'
        }

        $.ajax({
            url: 'https://call-congress.fightforthefuture.org/create',
            type: "get",
            dataType: "json",
            data: data,
            success: function(res) {
                console.log('Placed call-congress call: ', res);
            }
        });
        $('.overlay').css('display', 'table');
        setTimeout(function() {
            $('.overlay').addClass('visible');
            setTimeout(function() {
                $('.overlay .modal .inner').addClass('visible');
            }, 10);
        }, 100);
    });

    $('a.twitter').click(function(e) {

        e.preventDefault();

        var tw_text = encodeURIComponent(TWEET_TEXT);
        window.open('https://twitter.com/intent/tweet?hashtags=&related=fightfortheftr&text=' + tw_text);

    });

});