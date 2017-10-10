var crosshairCoords = [];
var address = "";
var act = 0;
var x = 0;
var y = 0;
var canEdit=false;
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function openRegisterMenu(){
        signupForm.style.display="block";
        loginForm.style.display="none";
        document.getElementById("openRegisterMenuButton").style.display="none";
    }

function isValidDate(dateString) {
    var parts = dateString.split('.');
  if (parts.length != 3) return false;
  try {
    var tmpDate = new Date(parts[2], parts[1], parts[0], 12);
    //return (dateString == tmpDate.getDate() + '.' + tmpDate.getMonth + '.' + tmpDate.getFullYear());
    return true;
  } catch (ex) {
  alert('Введите дату в формате ДД.ММ.ГГГГ');
  return false; }
}
function isValidDatePeriod(date1,date2)
{
    var parts1 = date1.split('.');
    var parts2 = date2.split('.');
    var tmpDate1 = new Date(parts1[2], parts1[1], parts1[0], 12);
    var tmpDate2 = new Date(parts2[2], parts2[1], parts2[0], 12);
    if (tmpDate1.getTime()<=tmpDate2.getTime())
    {
        return true;
    }
    else
    {
        alert("Вторая дата должна быть больше или равна первой");
        return false
    }
};

function isValidTime(input) {
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(input);

    if (!isValid) {
        alert("Введите время в формате ЧЧ:ММ");
    }

    return isValid;
}
function getCurrentDate()
{
    var now = new Date();
    var currentTzOffset = now.getTimezoneOffset();
    var deltaTzOffset = currentTzOffset;
    var nowTimestamp = now.getTime();
    var deltaTzOffsetMilli = deltaTzOffset * 1000;
    var dateCorrect = new Date(nowTimestamp - deltaTzOffsetMilli);
   // var hours = dateCorrect.getHours();
   // var mins = dateCorrect.getMinutes();
    //var seconds = dateCorrect.getSeconds();
    var dateString =((dateCorrect.getDate()<10) ? "0"+dateCorrect.getDate():dateCorrect.getDate())  + "." + ((dateCorrect.getMonth()+1<10) ? "0"+dateCorrect.getMonth()+1:dateCorrect.getMonth()+1) + "." + dateCorrect.getFullYear();
    
 
    return dateString;
}
function getCurrentTime()
{
    var now = new Date();
    var currentTzOffset = now.getTimezoneOffset();
    var deltaTzOffset = currentTzOffset;
    var nowTimestamp = now.getTime();
    var deltaTzOffsetMilli = deltaTzOffset * 1000;
    var dateCorrect = new Date(nowTimestamp - deltaTzOffsetMilli);
    var hours = dateCorrect.getHours();
    var mins = dateCorrect.getMinutes();
    var seconds = dateCorrect.getSeconds();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ":" + mins;
    return time;
}
function setDateTime(withDate) {
    var now = new Date();
    var currentTzOffset = now.getTimezoneOffset();
    var deltaTzOffset = currentTzOffset;
    var nowTimestamp = now.getTime();
    var deltaTzOffsetMilli = deltaTzOffset * 1000;
    var dateCorrect = new Date(nowTimestamp - deltaTzOffsetMilli);
    var hours = dateCorrect.getHours();
    var mins = dateCorrect.getMinutes();
    var seconds = dateCorrect.getSeconds();
    var dateString =((dateCorrect.getDate()<10) ? "0"+dateCorrect.getDate():dateCorrect.getDate())  + "." + ((dateCorrect.getMonth()+1<10) ? "0"+dateCorrect.getMonth()+1:dateCorrect.getMonth()+1) + "." + dateCorrect.getFullYear();
    
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    var time = hours + ":" + mins;
    document.getElementById('timeInput1').value = time;
    if (!canEdit) 
        {
            document.getElementById('timeInput2').value = time;
        }
    if (withDate) {
        document.getElementById('dateInput1').value = dateString;
        document.getElementById('dateInput2').value = dateString;
        document.getElementById('showDate1').value = dateString;
        document.getElementById('showDate2').value = dateString;
    }
}

function showOnMapPeriod() {
    act = 2;
}

function setAsDefault() {
    act = 3;

}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}
ymaps.ready(init);

function init() {
    var homecoords = [];
    if (getCookie("latitude") != undefined) {
        homecoords[0] = getCookie("latitude");
        homecoords[1] = getCookie("longitude");
    } else {
        homecoords[0] = 55.735862;
        homecoords[1] = 37.945982;
    }
    crosshairCoords = homecoords;

    var myMap = new ymaps.Map('map', {

        center: homecoords,
        zoom: 12,

    });


    function editLock()
    {
        if (!canEdit)
        {
            document.getElementById('dateInput1').disabled=true;
            document.getElementById('dateInput2').disabled=true;
            document.getElementById('timeInput1').disabled=true;
            document.getElementById('timeInput2').disabled=true;
            document.getElementById('dateInput1').value=getCurrentDate();
            document.getElementById('dateInput2').value=getCurrentDate();
            document.getElementById('timeInput1').value=getCurrentTime();
            document.getElementById('timeInput2').value=getCurrentTime();
        }
        else
        {
            document.getElementById('dateInput1').disabled=false;
            document.getElementById('dateInput2').disabled=false;
            document.getElementById('timeInput1').disabled=false;
            document.getElementById('timeInput2').disabled=false;
        }
    }
    document.getElementById('now-button').onclick=function()
    {
        canEdit=false;
        editLock();
    }
    document.getElementById('period-button').onclick=function()
    {
         canEdit=true;
         editLock();
    }
    document.getElementById('dateInput1').onchange = function() {
        if (isValidDate(document.getElementById('dateInput1').value)!=false) {
            if(isValidDatePeriod(document.getElementById('dateInput1').value,document.getElementById('dateInput2').value)==false)
            {
                document.getElementById('dateInput1').value="";
            }
           
            
        } else {
            document.getElementById('dateInput1').value = "";
        }
    };
    document.getElementById('dateInput2').onchange = function() {
        if (!isValidDate(document.getElementById('dateInput2').value)) {
            document.getElementById('dateInput1').value = "";
        }
        else
        {
            if(isValidDatePeriod(document.getElementById('dateInput1').value,document.getElementById('dateInput2').value)==false)
            {
                document.getElementById('dateInput2').value="";
            }
        }
    };

    document.getElementById('showDate1').onchange = function() {
        if (!isValidDate(document.getElementById('showDate1').value)) {
            document.getElementById('dateInput1').value = "";
        }
        else
        {
            if(isValidDatePeriod(document.getElementById('showDate1').value,document.getElementById('showDate2').value)==false)
            {
                document.getElementById('showDate1').value="";
            }
           
        }
    };
    document.getElementById('showDate2').onchange = function() {
        if (!isValidDate(document.getElementById('showDate2').value)) {
            document.getElementById('dateInput2').value = "";
        }
        else
        {
            if(isValidDatePeriod(document.getElementById('showDate1').value,document.getElementById('showDate2').value)==false)
            {
                document.getElementById('showDate2').value="";
            }
        }
    };
    document.getElementById('timeInput1').onchange = function() {
        if (isValidTime(document.getElementById('timeInput1').value)) {
            if (!canEdit) document.getElementById('timeInput2').value = document.getElementById('timeInput1').value;
        } else {
            document.getElementById('timeInput1').value = "";
        }

    };
    document.getElementById('timeInput2').onchange = function() {
        if (!isValidTime(document.getElementById('timeInput2').value)) {
            document.getElementById('timeInput2').value = "";
        }

    };
    document.getElementById('showTime1').onchange = function() {
        if (!isValidTime(document.getElementById('showTime1').value)) {
            document.getElementById('showTime1').value = "";
        }
    };
    document.getElementById('showTime2').onchange = function() {
        if (!isValidTime(document.getElementById('showTime2').value)) {
            document.getElementById('showTime2').value = "";
        }
    };
    var greenColletion = new ymaps.GeoObjectCollection(null, { preset: 'islands#greenCircleDotIcon' });
    var orangeColletion = new ymaps.GeoObjectCollection(null, { preset: 'islands#orangeCircleDotIcon' });
    var redColletion = new ymaps.GeoObjectCollection(null, { preset: 'islands#redCircleDotIcon' });
    var brownColletion = new ymaps.GeoObjectCollection(null, { preset: 'islands#brownCircleDotIcon' });
    var myPlacemark = new ymaps.Placemark(homecoords, {}, {
        iconLayout: 'default#image',
        iconImageHref: '799076_aim_512x512.png',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -20]
    });

    function setmarker(latitude, longitude, addrstring, t1, t2, dt1, dt2, val, comment) {
        var coords = [];
        coords[0] = latitude;
        coords[1] = longitude;
        var dateString = (dt1 == dt2) ? dt1 : (dt1 + " - " + dt2);
        var timeString = ""; //(t1 == t2) ? t1 : (t1 + " - " + t2);
        if (val == 0) {
            greenColletion.add(new ymaps.Placemark((coords), {
                hintContent: dateString + " " + timeString,
                balloonContentHeader: dateString + " " + timeString,
                balloonContentBody: timeString + "<br>" + addrstring + "<br>" + comment
            }));
            myMap.geoObjects.add(greenColletion);
        }
        if (val == 1) {
            orangeColletion.add(new ymaps.Placemark((coords), {
                hintContent: dateString + " " + timeString,
                balloonContentHeader: dateString + " " + timeString,
                balloonContentBody: timeString + "<br>" + addrstring + "<br>" + comment
            }));
            myMap.geoObjects.add(orangeColletion);
        }
        if (val == 2) {
            redColletion.add(new ymaps.Placemark((coords), {
                hintContent: dateString + " " + timeString,
                balloonContentHeader: dateString + " " + timeString,
                balloonContentBody: timeString + "<br>" + addrstring + "<br>" + comment
            }));
            myMap.geoObjects.add(redColletion);
        }
        if (val == 3) {
            brownColletion.add(new ymaps.Placemark((coords), {
                hintContent: dateString + " " + timeString,
                balloonContentHeader: dateString + " " + timeString,
                balloonContentBody: timeString + "<br>" + addrstring + "<br>" + comment
            }));
            myMap.geoObjects.add(brownColletion);
        }
    }
    document.getElementById('setData').onclick =
        function showOnMap() {
            act = 1;
            var data = new Object();
            data.address=document.getElementById("addressLabel").value;
            
            data.timeInput1=document.getElementById('timeInput1').value;
            data.timeInput2=document.getElementById('timeInput2').value;
            data.dateInput1=document.getElementById('dateInput1').value;
            data.dateInput2=document.getElementById('dateInput2').value;
            data.commentInput=document.getElementById('commentInput').value;
            
            
            if (document.getElementById("color-1").checked) {
                setmarker(crosshairCoords[0], crosshairCoords[1], data['address'], data['timeInput1'], data['timeInput2'], data['dateInput1'], data['dateInput2'], 0, data['commentInput']);
            }
            if (document.getElementById("color-2").checked) {
                setmarker(crosshairCoords[0], crosshairCoords[1], data['address'], data['timeInput1'], data['timeInput2'], data['dateInput1'], data['dateInput2'], 1, data['commentInput']);
            }
            if (document.getElementById("color-3").checked) {
                setmarker(crosshairCoords[0], crosshairCoords[1], data['address'], data['timeInput1'], data['timeInput2'], data['dateInput1'], data['dateInput2'], 2, data['commentInput']);
            }
            if (document.getElementById("color-4").checked) {
                setmarker(crosshairCoords[0], crosshairCoords[1], data['address'], data['timeInput1'], data['timeInput2'], data['dateInput1'], data['dateInput2'], 3, data['commentInput']);
            }

        };

    myMap.geoObjects.add(myPlacemark);
    var string;
    if (getCookie('address') == undefined) {
        alert('Не забудьте установить ваш домашний адрес в разделе "Координаты"');
        string = "";
    } else {
        string = getCookie('address');
    }

    string = string.replace(/\+/g, " ");
    document.getElementById("addressLabel").value = string;
    document.getElementById("coordsLabel").value = homecoords;
    setDateTime(true);
    document.getElementById('showTime1').value = document.getElementById('timeInput1').value;
    document.getElementById('showTime2').value = document.getElementById('timeInput2').value;

    //клик
    myMap.events.add('click', function(e) {
        if (!canEdit) setDateTime(true);
        crosshairCoords = e.get('coords');
        var myGeocode = ymaps.geocode(crosshairCoords).then(
            function(res) {
                var nearest = res.geoObjects.get(0);
                address = nearest.properties.get('metaDataProperty.GeocoderMetaData').Address.formatted;
                document.getElementById("coordsLabel").value = crosshairCoords.join(", ");
                document.getElementById("addressLabel").value = address;
            });

        myPlacemark.geometry.setCoordinates(crosshairCoords);

        myMap.geoObjects.add(myPlacemark);

    });


    var mySearchResults = new ymaps.GeoObjectCollection(null, {
        hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.address]')
    });
    myMap.geoObjects.add(mySearchResults);

    //адрес из поиска
    var mySearchControl = myMap.controls.get('searchControl');
    mySearchControl.options.set('noPlacemark', true);
    mySearchControl.events.add('resultselect', function(e) {
        var index = e.get('index');
        mySearchControl.getResult(index).then(function(res) {
            mySearchResults.add(res);
            address = res.properties.get('metaDataProperty.GeocoderMetaData').Address.formatted;
            crosshairCoords = res.geometry.getCoordinates();
            document.getElementById("coordsLabel").value = crosshairCoords.join(", ");
            document.getElementById("addressLabel").value = address;

            if (!canEdit) setDateTime(true);
            myPlacemark.geometry.setCoordinates(crosshairCoords);
            myMap.geoObjects.add(myPlacemark);
        });
    }).add('submit', function() {
        mySearchResults.removeAll();
    });

    //геолокация
    var myGeolocationControl = myMap.controls.get('geolocationControl');
    myGeolocationControl.events.add('locationchange', function(event) {
        crosshairCoords = event.get('position');
        document.getElementById("coordsLabel").value = crosshairCoords.join(", ");
        var myGeocode = ymaps.geocode(crosshairCoords).then(
            function(res) {
                var nearest = res.geoObjects.get(0);
                address = nearest.properties.get('metaDataProperty.GeocoderMetaData').Address.formatted;
                
                document.getElementById("addressLabel").value = address;
            });
        myPlacemark.geometry.setCoordinates(crosshairCoords);
        myMap.geoObjects.add(myPlacemark);
    });
    var setForm = document.getElementById("setForm");
    setForm.onsubmit = function(e) {
    
        e.preventDefault();
        act=3;
        var adr = document.getElementById("addressLabel").value;
        var id = getCookie("userid");
        var fulldata = {
            userid: id,
            coords: crosshairCoords,
            addr: adr,
            cmd: act
        }
        var fulldataJSON = JSON.stringify((fulldata));
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'sendtodb.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(fulldataJSON);
    }
    var recieveForm = document.getElementById("recieveForm");
    recieveForm.onsubmit = function(e) {
        e.preventDefault();
        act=2;
        var sd1 = document.getElementById('showDate1').value;
        var sd2 = document.getElementById('showDate2').value;
        var st1=document.getElementById('showTime1').value;
        var st2=document.getElementById('showTime2').value;
        var id = getCookie("userid");
        var adr = document.getElementById("addressLabel").value;
        var s = document.getElementsByName("stinkvalue");
        var partssd1=sd1.split(".");
        var partssd2=sd2.split(".");
        sd1=partssd1[2]+"-"+partssd1[1]+"-"+partssd1[0];
        sd2=partssd2[2]+"-"+partssd2[1]+"-"+partssd2[0];
        for (var i = 0, l = s.length; i < l; i++) {
            if (s[i].checked) {
                svalue = s[i].value;
            }
        }
        var xhr = new XMLHttpRequest();
        if (sd1!="" || sd2!="")
        {
            var fulldata = {
                userid: id,
                showdate1: sd1 + " " + st1,
                showdate2: sd2 + " " + st2,
                stinkvalue: svalue,
                coords: crosshairCoords,
                addr: adr,
                cmd: act
            };
        }
        else
        {
            alert("Ни одно поле с датой не должно быть пустым");
            return;
        }
        var fulldataJSON = JSON.stringify((fulldata));
        xhr.open("POST", 'sendtodb.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(fulldataJSON);

        xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 && act == 2) {
            var sjos = xhr.responseText
            var respstr = JSON.stringify(sjos);
            var resp = JSON.parse(sjos);
            var k1 = resp[0];
            greenColletion.removeAll();
            orangeColletion.removeAll();
            redColletion.removeAll();
            brownColletion.removeAll();
            myMap.geoObjects.removeAll();
            for (var i = 0; i < resp.length; i++) {
                // function setmarker(latitude,longitude,addrstring,t1,t2,dt,val,comment)
                setmarker(resp[i]['latitude'], resp[i]['longitude'], resp[i]['addr'], resp[i]['time1'], resp[i]['time2'], resp[i]['date1'],resp[i]['date2'], resp[i]['stinkvalue'], resp[i]['comment']);
            }

        }
    }
    }   
    
    var sendForm = document.getElementById("sendForm");
    sendForm.onsubmit = function(e) {
        e.preventDefault();
        var svalue;
        var dt1 = document.getElementById('dateInput1').value;
        var dt2 = document.getElementById('dateInput2').value;
       
        var t1 = document.getElementById('timeInput1').value;
        var t2 = document.getElementById('timeInput2').value;
        
        var cmnt = document.getElementById('commentInput').value;
        var s = document.getElementsByName("stinkvalue");
        var xhr = new XMLHttpRequest();
        var id = getCookie("userid");
        var adr = document.getElementById("addressLabel").value;
        var curd = getCurrentDate();
        var curt = getCurrentTime();
        for (var i = 0, l = s.length; i < l; i++) {
            if (s[i].checked) {
                svalue = s[i].value;
            }
        }
        if (act==1)
        {
            if (dt1!="" || dt2!="")
            {
                var partsdt1=dt1.split(".");
                var partsdt2=dt2.split(".");
                dt1=partsdt1[2]+"-"+partsdt1[1]+"-"+partsdt1[0];
                dt2=partsdt2[2]+"-"+partsdt2[1]+"-"+partsdt2[0];
                var fulldata = {
                userid: id,
                date1: dt1 + " " +t1,
                date2: dt2 + " " +t2,
                comment: cmnt,
                stinkvalue: svalue,
                coords: crosshairCoords,
                addr: adr,
                cmd: act,
                setupdate: curd,
                setuptime: curt 
                }; 
            }
            else
            {
                alert("Ни одно поле с датой не должно быть пустым");
                return;
            } 
            
        }
       
        
        if (act==3)
        {
            document.cookie="address="+adr;
            document.cookie="latitude="+crosshairCoords[0];
            document.cookie="longitude="+crosshairCoords[1];
            var fulldata = {
                userid: id,
                coords: crosshairCoords,
                addr: adr,
                cmd: act
            }
        }
        // var fulldata = {
        //     userid: id,
        //     time1: t1,
        //     time2: t2,
        //     showtime1:st1,
        //     showtime2:st2,
        //     date1: dt1,
        //     date2: dt2,
        //     showdate1: sd1,
        //     showdate2: sd2,
        //     comment: cmnt,
        //     stinkvalue: svalue,
        //     coords: crosshairCoords,
        //     addr: adr,
        //     cmd: act
        // };

        var fulldataJSON = JSON.stringify((fulldata));
        xhr.open("POST", 'sendtodb.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(fulldataJSON);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200 && act == 2) {
                var sjos = xhr.responseText
                var respstr = JSON.stringify(sjos);
                var resp = JSON.parse(sjos);
                var k1 = resp[0];
                greenColletion.removeAll();
                orangeColletion.removeAll();
                redColletion.removeAll();
                brownColletion.removeAll();
                myMap.geoObjects.removeAll();
                for (var i = 0; i < resp.length; i++) {
                    // function setmarker(latitude,longitude,addrstring,t1,t2,dt,val,comment)
                    setmarker(resp[i]['latitude'], resp[i]['longitude'], resp[i]['addr'], resp[i]['time1'], resp[i]['time2'], resp[i]['date1'],resp[i]['date2'], resp[i]['stinkvalue'], resp[i]['comment']);
                }

            }
        }


    }
    var loginForm = document.getElementById("loginForm"); 
    var signupForm = document.getElementById("signupForm");

    var response = getCookie("userid");
    if (response!=undefined)
    {
        loginForm.style.display="none";
        signupForm.style.display="none";
    }   
}


