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
var b = getRandomArbitary(1, 6);
console.log(b);

var generateAdvertisment = function (i, title, type, features, photos, check){

  for (var j = 0; j < getRandomArbitary(1, 6); j++) {
    var feature = [];
    feature.push(features[j]);
  }
  console.log(feature);
  for (j = 0; j < getRandomArbitary(1, 3); j++) {
    var photo = [];
    photo.push(photos[j]);
  }
  console.log(photo);

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

var createPopUp = function (j, ads){
  var adAvatar = makeElement('img', 'popup__avatar');
  adAvatar.src = ads.avatar;
  adAvatar.alt = 'Аватар пользователя';
  adAvatar.width = 70;
  adAvatar.height = 70;
  var adClose = makeElement('button', 'popup__close', 'Закрыть');
  var adTitle = makeElement('h3', 'popup__title', ads.title);
  var adAdress = makeElement('p', 'popup__text popup__text--address', ads.adress);
  var adPrice = makeElement('p', 'popup__text popup__text--price', ads.price + '/ночь');

};

var createMapPin = function (k, ad) {
  var cardTemplate = document.querySelector('map__card');
  console.log(cardTemplate);
  var pinTemplate = cardTemplate.querySelector('.map__pin');
  console.log(pinTemplate);
  var pin = makeElement('button', 'map__pin');
  pin.style.left = '' + ad.location.x + 40 + 'px';
  pin.style.top = '' + ad.location.y - 20 + 'px';
  pin.src = ad.avatar;
  pin.alt = ad.title;
  pinTemplate.appendChild(pin);
  var pinImage = makeElement('img');
  pinImage.src = ad.avatar;
  pinImage.width = 40;
  pinImage.height = 40;
  pinImage.draggable = false;
  pinImage.alt = 'Метка объявления';
  pinTemplate.appendChild(pinImage);

};

for (i = 0; i < 8; i++) {
  createMapPin(i, advertisments);
}
