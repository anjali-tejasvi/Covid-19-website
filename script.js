$(document).ready(function(){

  $('#menu').click(function(){
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('load scroll',function(){

    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if($(window).scrollTop() > 0){
      $('header').addClass('sticky');
    }else{
      $('header').removeClass('sticky');
    }

    if($(window).scrollTop() > 0){
      $('.scroll-top').show();
    }else{
      $('.scroll-top').hide();
    }

    // scroll spy 

    $('section').each(function(){

      let top = $(window).scrollTop();
      let offset = $(this).offset().top - 200;
      let id = $(this).attr('id');
      let height = $(this).height();

      if(top > offset && top < offset + height){
        $('.navbar a').removeClass('active');
        $('.navbar').find(`[href="#${id}"]`).addClass('active');
      }

    });

  });

  // smooth scrolling 

  $('a[href*="#"]').on('click',function(e){

    $('html, body').animate({

      scrollTop : $($(this).attr('href')).offset().top,

    },
      500,
      'linear'
    );

  });

});


/*code to check India covid 19 status */
$(document).ready(function(){
  var url = "https://api.covid19india.org/data.json"


  $.getJSON(url,function(data){
    console.log(data)

    var total_active,total_recovered,total_deaths,total_confirmed

    var state = []
    var confirmed = []
    var recovered = []
    var deaths = []

    $.each(data.statewise,function(id,obj){
      state.push(obj.state)
      confirmed.push(obj.confirmed)
      recovered.push(obj.recovered)
      deaths.push(obj.deaths)
    })

   

    state.shift()
    confirmed.shift()
    recovered.shift()
    deaths.shift()

     console.log(state)

     total_active = data.statewise[0].active
     total_confirmed= data.statewise[0].confirmed
     total_recovered= data.statewise[0].recovered
     total_deaths=data.statewise[0].deaths 



     $('#active').append(total_active)
     $('#confirmed').append(total_confirmed)
     $('#recovered').append(total_recovered)
     $("#deaths").append(total_deaths)



     var myChart = document.getElementById("myChart").getContext('2d')

     var chart =  new Chart(myChart,{
      type:'line',
      data:{
        labels:state,
        datasets:[
          {
            label:"confirmed Cases",
            data: confirmed,
            backgroundColor: "#f1c40f",
            minBarLength: 100
          },
          {
            label:"Recovered Cases",
            data: recovered,
            backgroundColor: "green",
            minBarLength: 100
          },
          {
            label:"Deceased Cases",
            data: deaths,
            backgroundColor: "red",
            minBarLength: 100
          },
          

        ]
      },

      options:{}

     })

  })

})