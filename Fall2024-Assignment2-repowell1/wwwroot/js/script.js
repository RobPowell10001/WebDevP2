
$(function () {
    $("#datepicker").datepicker();
});
$(function () {
    $(".widget input[type=submit], .widget a, .widget button").button();
    $("button, input, a").on("click", function (event) {
        event.preventDefault();
    });
});
window.onload = function () {
    searchClicked();
    timeClicked();
};

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
                console.log(`<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`);
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert('error');
        });
}

/*Write a function that calls the apiSearch function on a click of your search button
Write a function that changes the background image of your site on a click of your search engine name
Write a function that gets the current time (formatted HH:MM), 
loads the result into your time div, and displays the div as a jQueryUI dialog window on a click of your time button*/

function searchClicked() {
    console.log("started Listening!");
    // Retrieve the input field
    document.getElementById('searchButton').addEventListener('click', function () {
        console.log("Click detected!");
        // Do the query, it knows where to get the value
        apiSearch();
        document.getElementById('searchResults').style.visibility = 'visible';
    });
    

}

function timeClicked() {
    console.log("started listening too!");
    // Retrieve the input field
    document.getElementById('timeButton').addEventListener('click', function () {
        console.log("Click detected!");
        // find the Date
        var currentTime = new Date();
        // Get the current time in local time or whatevber
        var formattedTime = currentTime.toLocaleTimeString();
        formattedTime = formattedTime.substring(0, formattedTime.length - 6) + " " + formattedTime.substring(formattedTime.length - 3, formattedTime.length);
        results = `<p>${formattedTime}</p>`
        document.getElementById('time').style.visibility = 'visible';
        $('#time').html(results);
        $('#time').dialog();
    });


}