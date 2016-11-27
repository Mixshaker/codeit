"use strict";

// переменные из кода
var $total = $('#total-comp'),
    $listcomp = $('#list-comp ul'),
    $news = $('#carousel-news'),
    $newsimg = $('.news-img img'),
    $newstitle = $('.news-body h3 a'),
    $newstext = $('.news-body p'),
    $newsdate = $('.newsdate'),
    $newsauth = $('.newsauthor'),
    $indicators = $('.carousel-indicators');




// loaders
  var loader = '<div class="loader"></div>';
  $total.html(loader);
  $listcomp.html(loader);
  // $news.html(loader);




$(function() {
  // список компаний
  var requestComp = $.getJSON( "http://codeit.pro/frontTestTask/company/getList", function(data) {

    var items = [];
    $.each(data, function(key, val) {
      items.push( {key: val});
    });
    var compArr = items[0]['key'];

    var name = compArr.map(item => item.name);

    // общее кол-во компаний
     $total.text(name.length);

    // список компаний
    $.each(name, function(key,val){
        items.push( `<a href="${val}"><li>${val}</li></a>` );
      });

    $listcomp.html(items);



    // массив локаций
    var location = compArr.map(item => item.location);
    // console.log(location);

    // массив парнеров
    var partners = compArr.map(item => item.partners);
    // console.log(partners);

  });

  // requestComp.done(function( msg ) {
  //   $( "#log" ).html( msg );
  // });


  // список новостей
  $.getJSON("http://codeit.pro/frontTestTask/news/getList", function(data) {
    var items = [];
    $.each(data, function(key, val) {
      items.push( {key: val});
    });

    var newsArr = items[0]['key'];
    console.log(newsArr);

    // var news = newsArr.map(item => [item.author, item.date, item.description, item.img, item.link]);
    // console.log(news);

    $.each(newsArr, function(i) {
       $newsimg.attr('src', this.img);
       $newstitle.attr('href', `http://${this.link}`);
       $newstext.text(this.description);
       // $newsdate.attr(this.date);
       $newsdate.text(moment.unix(this.date).format("DD.MM.YYYY"));
       $newsauth.text(this.author);
       $indicators.append(`<li data-target="#carousel-news" data-slide-to="${i}"></li>`);
    });


      // $('#carousel-news').addClass('active');

      // обрезка текста новости
      var text = $('.news-body p').text();
      var sliced = text.slice(0,220);
      if (sliced.length < text.length) {
      sliced += '...';
      }
      $('.news-body p').text(sliced);


    // console.log(newsArr[0]['author']);
    // console.log(newsArr[3]['link']);

    // timestamp to date

    // var newsdate = moment.unix(1455091071).format("DD.MM.YYYY");
    // $('.newsdate').text(newsdate);



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