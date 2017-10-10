<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Наш воздух</title>
    <script src="//api-maps.yandex.ru/2.1/?lang=ru_RU"></script>
    <script src="api.js"></script>

    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="topLayer">
        <div id="radioLayer">
            <div class="custom-radios">
                <div>
                    <input type="radio" id="color-1" name="stinkvalue" value="0" checked>
                    <label for="color-1">
                        <span>
                            <img src="check-icn.svg" alt="Checked Icon" width="60%" height="60%" vspace="10" />
                        </span>
                    </label>
                </div>
                <div>
                    <input type="radio" id="color-2" name="stinkvalue" value="1">
                    <label for="color-2">
                        <span>
                            <img src="check-icn.svg" alt="Checked Icon" width="60%" height="60%" vspace="10" />
                        </span>
                    </label>
                </div>
                <div>
                    <input type="radio" id="color-3" name="stinkvalue" value="2">
                    <label for="color-3">
                        <span>
                            <img src="check-icn.svg" alt="Checked Icon" width="60%" height="60%" vspace="10"  />
                        </span>
                    </label>
                </div>
                <div>
                    <input type="radio" id="color-4" name="stinkvalue" value="3">
                    <label for="color-4">
                        <span>
                            <img src="check-icn.svg" alt="Checked Icon" width="60%" height="60%" vspace="10" />
                        </span>
                    </label>
                </div>
            </div>
        </div>
      <!--   <div id="inputsLayer">
            <div id="time">
                Дата: <input type="date" id="dataInput" name="date">-<input type="date" id="dataInput2" name="date"> <br>
                Время:<input type="text" id="timeInput1" name="time1" size="4" > - <input type="text" id="timeInput2" name="time2" size="4"> <br>
                <input type="text" id="commentInput" name="comment" placeholder="Комментарий"> <br>
            </div>
        </div> -->
    </div>
    <div id="map"></div>
    <div id="footer">
        <div class="tabs">

            <input type="radio" id="tab1" name="tab-control" checked>
            <input type="radio" id="tab2" name="tab-control">
            <input type="radio" id="tab3" name="tab-control">
            <input type="radio" id="tab4" name="tab-control">
            <ul>
                <li title="Features"><label for="tab1" role="button"><svg viewBox="0 0 24 24"><path d="M14,2A8,8 0 0,0 6,10A8,8 0 0,0 14,18A8,8 0 0,0 22,10H20C20,13.32 17.32,16 14,16A6,6 0 0,1 8,10A6,6 0 0,1 14,4C14.43,4 14.86,4.05 15.27,4.14L16.88,2.54C15.96,2.18 15,2 14,2M20.59,3.58L14,10.17L11.62,7.79L10.21,9.21L14,13L22,5M4.93,5.82C3.08,7.34 2,9.61 2,12A8,8 0 0,0 10,20C10.64,20 11.27,19.92 11.88,19.77C10.12,19.38 8.5,18.5 7.17,17.29C5.22,16.25 4,14.21 4,12C4,11.7 4.03,11.41 4.07,11.11C4.03,10.74 4,10.37 4,10C4,8.56 4.32,7.13 4.93,5.82Z"/>
                    </svg><br><span>Установить</span></label></li>
                <li title="Delivery Contents"><label for="tab2" role="button"><svg viewBox="0 0 64 64"><path d="  M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
    s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
    c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
    s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg><br><span>Показать</span></label></li>
                <li title="Shipping"><label for="tab3" role="button"><svg viewBox="0 0 78 78">
                    <path d="M40,0C26.191,0,15,11.194,15,25c0,23.87,25,55,25,55s25-31.13,25-55C65,11.194,53.807,0,40,0z
             M40,38.8c-7.457,0-13.5-6.044-13.5-13.5S32.543,11.8,40,11.8c7.455,0,13.5,6.044,13.5,13.5S47.455,38.8,40,38.8z" />
                    </svg><br><span>Координаты</span></label></li>    <li title="Returns"><label for="tab4" role="button"><svg viewBox="0 0 24 24">
                    <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                    </svg><br><span>Выход</span></label></li>
            </ul>

            <div class="slider"><div class="indicator"></div></div>
            <div class="content">

                <section>
                     <form action="sendtodb.php" id="sendForm" class="formclass" method="post">
                        <div class="wrapper w1">
                            <div class="main">
                                <div id="dateinputId">
                                    <input type="text" id="dateInput1" name="date" class="mainInputs" size="6" disabled>-<input type="text" id="dateInput2" name="date" class="mainInputs" size="6" disabled>
                                </div>
                                <div id="timeinputId">
                                    <input type="text" id="timeInput1" name="time1" class="mainInputs" size="4" disabled>-<input type="text" id="timeInput2" name="time2" class="mainInputs" size="4" disabled>
                                </div>

                                    <input type="text" id="commentInput" name="comment" class="mainInputs" placeholder="Комментарий">
                            </div>
                            <aside class="aside aside-1">
                                <div id="sendButton">
                                    <button type="submit" id="setData" class="btn btn1" name="sendingAllData"> Установить </button><br>
                                </div>
                            </aside>
                            <aside class="aside aside-2">
                                   <div class="container">
                                      <div class="button-wrap">
                                        <input class="hidden radio-label" type="radio" name="accept-offers" id="period-button" />
                                        <label class="button-label" for="period-button">
                                          <h1>Период</h1>
                                        </label>
                                        <input class="hidden radio-label" type="radio" name="accept-offers" id="now-button" checked="checked"/>
                                        <label class="button-label" for="now-button">
                                          <h1>Сейчас</h1>
                                        </label>

                                      </div>
                                    </div>
                            </aside>
                        </div>
                    </form>
                </section>

                <section>
                    <div class="wrapper w2">
                     <form action="sendtodb.php" id="recieveForm" method="post">

                        <input type="text" id="showDate1" name="showDate1" placeholder="Дата от" size="6"> - <input type="text" id="showDate2" name="showDate2" placeholder="Дата до" size="6"> <br>
                        <input type="text" id="showTime1" name="showTime1" placeholder="Время от" size="4"> - <input type="text" id="showTime2" name="showTime2" placeholder="Время до" size="4"> <br>
                        <button type="submit" id="showDataPeriod" class="btn btn2" name="recieveData" onclick="showOnMapPeriod();"> Показать </button>
                    </form>

                </div>
                </section>
                 </form>
                <section>
                    <div class="wrapper w2">
                     <form action="sendtodb.php" id="setForm"  method="post">
                        <div id="coords">
                            <div id="coordsDiv">
                                <input type="text" name="coords" id="coordsLabel" size="40" readonly value="55.70 37.96"> <br>
                                <input type="text" name="address" id="addressLabel" size="40" readonly value=""> <br>
                            </div>
                            <div id="setAddressDiv">
                                <button type="submit" id="setAddress" class="btn btn3" name="sendingAddress" onclick="setAsDefault();"> Установить как домашний </button>
                            </div>
                        </div>
                    </form>

                </div>
                    </section>
                <section>

                        <a href="logout.php">Выйти</a>

                        </section>


            </div>
        </div>
    </div>

</body>
</html>
