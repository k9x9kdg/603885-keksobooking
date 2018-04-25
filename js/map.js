'use strict';


var adTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var adType = ['palace', 'flat', 'house', 'bungalo'];
var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var adCheck = ['12:00', '13:00', '14:00'];


var advertisments = [];

var getRandomArbitary = function (min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

var generateAdvertisment = function (i, title, type, features, photos, check){

  var feature = [];

  for (var j = 0; j < getRandomArbitary(1, 6); j++) {
    feature.push(features[j]);

  }

  var photo = [];
  for (j = 0; j < getRandomArbitary(1, 3); j++) {
    photo.push(photos[j]);
  }


  var advertisment = {
    avatar: 'img/avatars/user' + '0' + (i+1) + '.png',
    title: title[i],
    adress: '',
    price: getRandomArbitary(1000, 1000000),
    type: type[getRandomArbitary(0, 3)],
    rooms: getRandomArbitary(1, 5),
    guests: '',
    chekin: check[getRandomArbitary(0, 2)],
    checkout: '',
    features: feature,
    description: '',
    photos: photo,
    location: {
      x: getRandomArbitary(300, 900),
      y: getRandomArbitary(150, 500)
    },

  };
  advertisment.checkout = advertisment.chekin;
  advertisment.guests = 2 * advertisment.rooms;
  advertisment.adress = advertisment.location.x + ', ' + advertisment.location.y;
  return advertisment;
};




for (var i = 0; i < 8; i++) {
  advertisments.push(generateAdvertisment(i, adTitle, adType, adFeatures, adPhotos, adCheck));
}

console.log(advertisments);

var mapFaded = document.querySelector('.map--faded');
console.log(mapFaded);
mapFaded.classList.remove('map--faded');
console.log(mapFaded);

var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};


var createMapPin = function (ad) {
  var cardTemplate = document.querySelector('#templ');
  var pinTemplate = cardTemplate.content.querySelector('.map__pin');
  console.log(pinTemplate);
  pinTemplate = pinTemplate.cloneNode(true);
  console.log(pinTemplate);
  var pinImage = pinTemplate.querySelector('img');
  console.log(pinImage);
  pinTemplate.style.left = '' + ad.location.x - 40 / 2 + 'px';
  pinTemplate.style.top = '' + ad.location.y - 40 + 'px';
  pinImage.src = ad.avatar;
  pinImage.alt = ad.title;
  console.log(pinTemplate);
  return pinTemplate;
};

for (i = 0; i < 8; i++) {
  var element = createMapPin(advertisments[i]);
  var map = document.querySelector('.map__pins');
  map.appendChild(element);
}


/*
var elementCreate = function (node, elemTag, massive, kkkk) {
var element = offerTemplate.querySelector(elemTag);
element.textcontent = massive.kkkk;
return element;
};
*/

var createPopUp = function (ads){
  var cardTemplate = document.querySelector('#templ');
  var offerTemplate = cardTemplate.content.querySelector('.map__card');
  var block = document.querySelector('.map');
  offerTemplate = offerTemplate.cloneNode(true);
  var adTitle = offerTemplate.querySelector('.popup__title');
  adTitle.textContent = ads.title;
  var adAdress = offerTemplate.querySelector('.popup__text--address');
  adAdress.textContent = ads.adress;
  var adPrice = offerTemplate.querySelector('.popup__text--price');
  adPrice.textContent = ads.price + ' ₽/ночь';
  var adType = offerTemplate.querySelector('.popup__type');
  if (ads.type === 'flat'){
    adType.textContent = 'Квартира';
  } else if (ads.type === 'bungalo'){
    adType.textContent = 'Бунгало';
  } else if (ads.type === 'house'){
    adType.textContent = 'Дом';
  } else {
    adType.textContent =
      'Дворец';
  }

  var adRoomsGuests = offerTemplate.querySelector('.popup__text--capacity');
  adRoomsGuests.textContent = '' + ads.rooms + ' комнаты для ' + ads.guests + ' гостей';

  var adChecks = offerTemplate.querySelector('.popup__text--time');
  adChecks.textContent = 'Заезд после ' + ads.chekin + ', выезд до ' + ads.checkout + '';
  var FICHA = ads.features;
  var featuresStr = ads.features.join(featuresStr);
  var adFeatures = offerTemplate.querySelector('.popup__features');

  var adDescription = offerTemplate.querySelector('.popup__description');
  adDescription.textContent = ads.description;
  var adaPhoto = offerTemplate.querySelector('.popup__photos');
  var adPhoto = adaPhoto.querySelector('.popup__photo');
  var photo = ads.photos;
  adPhoto.src = photo;
  for (var j = 0; j < photo.length; j++) {
    var directPhoto = '' + photo[j] + '\t';
    directPhoto.toString();
    console.log(directPhoto);
    adPhoto.src = directPhoto + '  , ';
  }
  console.log(adPhoto.src);
  var adAvatar = offerTemplate.querySelector('img');
  adAvatar.src = ads.avatar;
  console.log(ads.avatar);



  console.log(offerTemplate);
  return offerTemplate;

};

for (i = 0; i < 8; i++) {
  var element = createPopUp(advertisments[i]);
  var map = document.querySelector('.map');
  map.appendChild(element);
}
