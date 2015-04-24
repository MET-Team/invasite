angular.module('DeliveryCtrl', []).controller('DeliveryCtrl', function($scope, $filter){

  $('.delivery-navigation').waypoint('sticky');

  var itemsOffset = [];
  $(".delivery-item").each(function(){
    var offsetTop = $(this).offset().top;
    itemsOffset.push(offsetTop);
  });

  $(document).on('scroll', function(){
    var scrollTop = $('body').scrollTop();

    var winHeight = $(window).height();

    if(scrollTop <= itemsOffset[0]){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(0).addClass('active');
    }else if(scrollTop > itemsOffset[0] && scrollTop <= itemsOffset[1]){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(1).addClass('active');
    }else if(scrollTop > itemsOffset[1] && scrollTop <= itemsOffset[2]){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(2).addClass('active');
    }else if(scrollTop > itemsOffset[2] && scrollTop <= itemsOffset[3]){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(3).addClass('active');
    }

    if(scrollTop <= 400){
      $('.delivery-navigation li').removeClass('active');
      $('.delivery-navigation li').eq(0).addClass('active');
    }
  });

  $('.delivery-navigation li').click(function(){
    $('.delivery-navigation li').removeClass('active');
    $(this).addClass('active');

    var index = $(this).index();

    $("html, body").animate({scrollTop: $(".delivery-item").eq(index).offset().top - 120}, 400);

  });

  $scope.cityList = [
    {id: 1, value: 'Альметьевск'},
    {id: 2, value: 'Армавир'},
    {id: 3, value: 'Артем'},
    {id: 4, value: 'Архангельск'},
    {id: 5, value: 'Астрахань'},
    {id: 6, value: 'Балаково'},
    {id: 7, value: 'Барнаул'},
    {id: 8, value: 'Белгород'},
    {id: 9, value: 'Березники'},
    {id: 10, value: 'Бийск'},
    {id: 11, value: 'Благовещенск'},
    {id: 12, value: 'Борисоглебск'},
    {id: 13, value: 'Братск'},
    {id: 14, value: 'Брянск'},
    {id: 15, value: 'Буденновск'},
    {id: 16, value: 'Великий Новгород'},
    {id: 17, value: 'Владивосток'},
    {id: 18, value: 'Владимир'},
    {id: 19, value: 'Волгоград'},
    {id: 20, value: 'Волжский'},
    {id: 21, value: 'Вологда'},
    {id: 22, value: 'Воронеж'},
    {id: 23, value: 'Дзержинск'},
    {id: 24, value: 'Екатеринбург'},
    {id: 25, value: 'Зеленодольск'},
    {id: 26, value: 'Иваново'},
    {id: 27, value: 'Ижевск'},
    {id: 28, value: 'Иркутск'},
    {id: 29, value: 'Йошкар-Ола'},
    {id: 30, value: 'Казань'},
    {id: 31, value: 'Калининград'},
    {id: 32, value: 'Калуга'},
    {id: 33, value: 'Каменск-Уральский'},
    {id: 34, value: 'Кемерово'},
    {id: 35, value: 'Киров'},
    {id: 36, value: 'Кострома'},
    {id: 37, value: 'Краснодар'},
    {id: 38, value: 'Красноярск'},
    {id: 39, value: 'Кузнецк'},
    {id: 40, value: 'Курган'},
    {id: 41, value: 'Курск'},
    {id: 42, value: 'Липецк'},
    {id: 43, value: 'Магнитогорск'},
    {id: 44, value: 'Миасс'},
    {id: 45, value: 'Москва'},
    {id: 46, value: 'Мурманск'},
    {id: 47, value: 'Набережные Челны'},
    {id: 48, value: 'Нальчик'},
    {id: 49, value: 'Невинномысск'},
    {id: 50, value: 'Нефтекамск'},
    {id: 51, value: 'Нижневартовск'},
    {id: 52, value: 'Нижнекамск'},
    {id: 53, value: 'Нижний Новгород'},
    {id: 54, value: 'Нижний Тагил'},
    {id: 55, value: 'Новокузнецк'},
    {id: 56, value: 'Новороссийск'},
    {id: 57, value: 'Новосибирск'},
    {id: 58, value: 'Новочебоксарск'},
    {id: 59, value: 'Ноябрьск'},
    {id: 60, value: 'Омск'},
    {id: 61, value: 'Орел'},
    {id: 62, value: 'Оренбург'},
    {id: 63, value: 'Орск'},
    {id: 64, value: 'Пенза'},
    {id: 65, value: 'Пермь'},
    {id: 66, value: 'Петрозаводск'},
    {id: 67, value: 'Прокопьевск'},
    {id: 68, value: 'Псков'},
    {id: 69, value: 'Пятигорск'},
    {id: 70, value: 'Россошь'},
    {id: 71, value: 'Ростов-на-Дону'},
    {id: 72, value: 'Рыбинск'},
    {id: 73, value: 'Салават'},
    {id: 74, value: 'Самара'},
    {id: 75, value: 'Санкт-Петербург'},
    {id: 76, value: 'Саранск'},
    {id: 77, value: 'Саратов'},
    {id: 78, value: 'Северодвинск'},
    {id: 79, value: 'Смоленск'},
    {id: 80, value: 'Сочи'},
    {id: 81, value: 'Ставрополь'},
    {id: 82, value: 'Старый Оскол'},
    {id: 83, value: 'Стерлитамак'},
    {id: 84, value: 'Сургут'},
    {id: 85, value: 'Сызрань'},
    {id: 86, value: 'Сыктывкар'},
    {id: 87, value: 'Таганрог'},
    {id: 88, value: 'Тамбов'},
    {id: 89, value: 'Тверь'},
    {id: 90, value: 'Тольятти'},
    {id: 91, value: 'Томск'},
    {id: 92, value: 'Туапсе'},
    {id: 93, value: 'Тула'},
    {id: 94, value: 'Тюмень'},
    {id: 95, value: 'Улан-Удэ'},
    {id: 96, value: 'Ульяновск'},
    {id: 97, value: 'Уфа'},
    {id: 98, value: 'Хабаровск'},
    {id: 99, value: 'Чебоксары'},
    {id: 100, value: 'Челябинск'},
    {id: 101, value: 'Череповец'},
    {id: 102, value: 'Чита'},
    {id: 103, value: 'Шахты'},
    {id: 104, value: 'Энгельс'},
    {id: 105, value: 'Ярославль'}
  ];

  $scope.cityListResult = $scope.cityList;

  $scope.deliveryEnabled = false;
  $scope.deliveryCitySelected = false;

  $scope.SearchListIsOpen = false;
  $scope.toggleSearchList = function(){
    $scope.SearchListIsOpen = $scope.SearchListIsOpen ? false : true;
  };

  $scope.deliveryCity = '';

  $scope.selectDeliveryCity = function(item){
    $scope.deliveryCity = item.value;
    $scope.deliveryCitySelected = true;
    $scope.deliveryEnabled = true;

    $scope.toggleSearchList();
  };

  $scope.searchDeliveryCity = function(){
    if($scope.deliveryCity == ''){
      $scope.deliveryCitySelected = false;
      $scope.cityListResult = $scope.cityList;
    }else{

      $scope.cityListResult = $filter('filter')($scope.cityList, $scope.deliveryCity);

      if($scope.cityListResult.length == 0){
        $scope.deliveryCitySelected = true;
        $scope.deliveryEnabled = false;

        $scope.cityListResult = $scope.cityList;
      }else{
        $scope.SearchListIsOpen = true;
      }
    }
  };

});