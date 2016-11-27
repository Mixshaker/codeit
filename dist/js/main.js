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
        $total.text(name.length);

        // companies list
        $.each(name, function(key, val) {
            items.push(`<a href="#" id="${val}"><li>${val}</li></a>`);
        });

        $listcomp.html(items);



        // массив локаций
        var location = compArr.map(item => item.location);
        console.log(location);

        // массив парнеров
        var partners = compArr.map(item => item.partners);
        console.log(partners);

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

        console.log(newsArr);
// <p>${val.description}</p>


        // news block
        $.each(newsArr, function(i, val) {
            // cut news text
              var sliced = val.description.slice(0, 200);
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

