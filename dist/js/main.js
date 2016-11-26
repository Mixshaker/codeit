"use strict";

$(function() {
  // список компаний
var getlist = $.getJSON( "http://codeit.pro/frontTestTask/company/getList", function(data) {

    var items = [];
    $.each( data, function(key, val) {
      items.push( {key: val});
    });
    var compArr = items[0]['key'];

    // общее кол-во компаний
    var name = compArr.map(item => item.name);
    $('#total-comp').text(name.length);

    // массив имен
    var name = compArr.map(item => item.name);
    $.each(name, function(key,val){
        // items.push( "<li id='" + key + "'>" + val + "</li>" );
        items.push( `<a href="${val}"><li>${val}</li></a>` );
      });
    $('#list-comp ul').html(items);
    console.log(items);






    // массив локаций
    var location = compArr.map(item => item.location);
    console.log(location);

    // массив парнеров
    var partners = compArr.map(item => item.partners);
    console.log(partners);

  });



// обрезка текста новости
var text = $('.news-body p').text();
var sliced = text.slice(0,250);
if (sliced.length < text.length) {
sliced += '...';
}
$('.news-body p').text(sliced);


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



// список новостей
// $.getJSON( "http://codeit.pro/frontTestTask/news/getList", function(data) {
//   var items = [];
//   $.each( data, function(key, val) {
//     items.push( {key: val});
//   });

//   var newsArr = items[0]['key'];
//   console.log(newsArr);


//   // let [author, date, description, img, link] = newsArr;

//  console.log(newsArr[3]['link']);
// });



});