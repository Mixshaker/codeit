"use strict";

// variable from html
var $total = $('#total-comp'),
    $listcomp = $('#list-comp ul'),
    $news = $('.carousel-inner'),
    $indicators = $('.carousel-indicators'),
    loader = '<div class="loader"></div>';

// loaders
$total.html(loader);
$listcomp.html(loader);
$news.html(loader);


function compareNumeric(a, b) {
    if (a.value > b.value) return 1;
    if (a.value < b.value) return -1;
}

function compareName(a, b) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
}

$(function() {
    // companies
    var requestComp = $.getJSON("http://codeit.pro/frontTestTask/company/getList", function(data) {

        var items = [];
        $.each(data, function(key, val) {
            items.push({
                key: val
            });
        });
        var compArr = items[0]['key'];

        var name = compArr.map(item => item.name);

        // total companies
        var total = name.length;
        $total.text(total);

        // companies list
        $.each(name, function(key, val) {
            items.push(`<a href="#" data-id="${key}"><li>${val}</li></a>`);
        });

        $listcomp.html(items);

        // location array
        var location = compArr.map(item => item.location);
        console.log(location);


        // partners array
        var partners = compArr.map(item => item.partners);


        var comp_id, //id of company
            part_arr, //array of parners
            location_arr; //array oа companies location



        // Location chart
        var chart_loc = AmCharts.makeChart("charlocation", {
            "type": "pie",
            "titleField": "Location",
            "valueField": "",
            "balloon": {
                "fixedPosition": true
            }
        });

        // location array for chart
        location_arr = location.reduce((counts, country) => {
            counts[country.code] = (counts[country.code] || 0) + 1;
            return counts;
        }, []);
        console.log(location_arr);
        chart_loc.dataProvider = location_arr;
        chart_loc.validateData();







        $('#list-comp a').on("click", function() {
            $('#partners').slideDown('600');
            $('#list-comp a li').removeClass('active');
            $(this).find('li').addClass('active');

            comp_id = $(this).data('id');
            part_arr = partners[comp_id];

            part_arr.sort(compareNumeric).reverse();
            chart.dataProvider = part_arr;
            chart.validateData();
        });

        $('#percent-up').on("click", function() {
            part_arr.sort(compareNumeric);
            chart.dataProvider = part_arr;
            chart.validateData();
        });

        $('#percent-down').on("click", function() {
            part_arr.sort(compareNumeric).reverse();
            chart.dataProvider = part_arr;
            chart.validateData();
        });

        $('#name-up').on("click", function() {
            part_arr.sort(compareName);
            chart.dataProvider = part_arr;
            chart.validateData();
        });

        $('#name-down').on("click", function() {
            part_arr.sort(compareName).reverse();
            chart.dataProvider = part_arr;
            chart.validateData();
        });

        // Company partners charts
        var chart = AmCharts.makeChart("chartpartners", {
            "type": "serial",
            "valueAxes": [{
                "gridColor": "#FFFFFF",
                "gridAlpha": 0.2,
                "dashLength": 0,
                "title": "Percents, %"
            }],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "value"
            }],
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "name",
            "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 20
            }
        });
    });

    // news list
    $.getJSON("http://codeit.pro/frontTestTask/news/getList", function(data) {
        var items = [];
        $.each(data, function(key, val) {
            items.push({
                key: val
            });
        });

        var newsArr = items[0]['key'];
        $news.empty();

        // news block
        $.each(newsArr, function(i, val) {

            // cut news text
            var sliced = val.description.slice(0, 220);
            sliced = (sliced.length < val.description.length) ? sliced += '...' : sliced;

            $news.append(`
              <div class="row item">
                <div class="news-img col-xs-12 col-md-6 col-lg-5">
                  <img src="${val.img}" alt="">
                </div>
                <div class="news-body col-xs-12 col-md-6 col-lg-7">
                  <h3><a href="${val.link}" target="_blank">Title</a></h3>
                   <p>${sliced}</p>
                </div>
                <div class="news-footer col-xs-12 bg-info">
                  <div class="col-xs-6 text-left">
                    <b>Author:</b> <span class="newsauthor">${val.author}</span>
                  </div>
                  <div class="col-xs-6 text-right">
                    <b>Date:</b> <span class="newsdate">${moment.unix(val.date).format("DD.MM.YYYY")}</span>
                  </div>
                </div>
              </div>
            `);

            $indicators.append(`<li data-target="#carousel-news" data-slide-to="${i}"></li>`);
        });

        // active class for first slide
        $($indicators).find("li").eq(0).addClass('active');
        $('.carousel-inner .item').eq(0).addClass('active');

    });


    // custom scroll
    $('#list-comp').slimscroll({
        height: '121px',
        color: '#333',
        size: '11px',
        alwaysVisible: true,
        railVisible: true,
        railColor: '#ccc',
        railOpacity: .8,
        wheelStep: 10
    });

});