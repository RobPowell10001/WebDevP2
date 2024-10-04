require('dotenv').config();
const searchKey = process.env.SEARCH_KEY;
const searchEndpoint = process.env.SEARCH_END;
$(function () {
    $("#datepicker").datepicker();
});
function apiSearch() {
    
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: searchEndpoint + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': searchKey
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert('error');
        });
}
