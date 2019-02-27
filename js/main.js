console.log('JS Loaded');
var oAuthKey;
var title = [];
var hour = [];
var isFree = [];

$.ajax({
    url: 'js/config.json',
    dataType: 'json',
    type: 'GET',
    success: function (keys) {
        oAuthKey = keys[0].OAUTH;
        console.log("Auth key loaded...")
        // getData();
    },
    error: function (error) {
        console.log(error);
        console.log('Error...')
    }
})

function getData() {
    $.ajax({
        url: 'https://www.eventbriteapi.com/v3/events/search/?location.address=Christchurch&token=' + oAuthKey,
        dataType: 'json',
        type: "GET",
        success: function (dataFromJSON) {
            console.log("Data loaded...");
            console.log(dataFromJSON);

            for (var i = 0; i < dataFromJSON.events.length; i++) {
                console.log(dataFromJSON.events[i].name, dataFromJSON.events[i].start);

                title[i] = dataFromJSON.events[i].name.text;
                hour[i] = dataFromJSON.events[i].start.local;
                isFree[i] = dataFromJSON.events[i].is_free;

                    document.getElementById("info").innerHTML += title[i] + '&nbsp;' + hour[i] + '<br>';
            }
        },

        error: function (error) {
            console.log(error);
            console.log("Error...");
        }
    });
}

function getFreeData() {
    $.ajax({
        url: 'https://www.eventbriteapi.com/v3/events/search/?location.address=Christchurch&token=' + oAuthKey,
        dataType: 'json',
        type: "GET",
        success: function (dataFromJSON) {
            console.log("Data loaded...");
            console.log(dataFromJSON);

            for (var i = 0; i < dataFromJSON.events.length; i++) {
                console.log(dataFromJSON.events[i].name, dataFromJSON.events[i].start);

                title[i] = dataFromJSON.events[i].name.text;
                hour[i] = dataFromJSON.events[i].start.local;
                isFree[i] = dataFromJSON.events[i].is_free;

                if (isFree[i] == true) {

                    document.getElementById("info").innerHTML += title[i] + '&nbsp;' + hour[i] + '<br>';
                }
            }
        },

        error: function (error) {
            console.log(error);
            console.log("Error...");
        }
    });
}

document.getElementById('all').addEventListener('click', getData);
document.getElementById('free').addEventListener('click', getFreeData);

// function dispMoto() {

//    document.getElementById("info").innerHTML = data;
// }