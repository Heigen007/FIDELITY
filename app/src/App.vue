<template>
  <div class="home">
    <input type="text" class = "input" id = 'club' autocomplete="off" placeholder="Club:" value="ae3bb04c-ced3-11e9-80b9-00e081d7566e"><br> БЖТ = ae3bb04c-ced3-11e9-80b9-00e081d7566e<br>
    <input type="text" class = "input" id = 'appId' autocomplete="off" placeholder="appID:"><br>
    <input type="text" class = "input" id = 'clientID' autocomplete="off" placeholder="clientID:" value="fa3eabfb-6425-11ea-80bb-04d4c4d2b370"><br> Михаил = dd8a1acc-3da1-11ea-80bb-04d4c4d2b370<br>Альбина = fa3eabfb-6425-11ea-80bb-04d4c4d2b370<br>
    <input type="text" class = "input time" id = 'time' autocomplete="off" placeholder="Время:"><br>
    <div><button class = "but" @click="click">Создать запрос</button></div>
    <div><button class = "but" @click="click2">Загрузить расписание</button></div>
    <table class="table table-sm table-bordered"></table>
  </div>
</template>

<script>
import $ from "jquery";
import moment from "moment"
export default {
  name: 'Home',
  data: function () {
    return {
      root: 'http://localhost:3000/auc'
    }
  },
  methods: {
    click () {
    var time = document.getElementById('time').value
    console.log(typeof time)
    const club = document.getElementById('club')
    const appId = document.getElementById('appId')
    const clientId = document.getElementById('clientID')
    console.log(time);
    const NA = {
      club : club.value,
      appId: appId.value,
      clientId: clientId.value,
      time: time
    }
    fetch(`${this.root}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(NA)
      })
    },
    click2 () {
      $.ajax({
        url: 'https://corp.fidelity.kz/getShedule.php?club=BZ', 
        dataType: "jsonp",
        method: "POST", 
        success: function(data) { 
          $.each(data, function(key, val) {                                                                                                                                                                                                                                                                                                                                                                                
            $('.table').append(' <tr> <th scope="row">'+ val.title+'</th><td>' + `<button class = "but2" id = ${key}>Записаться</button>` + val.date +'</td><td>мест - <strong> '+val.slotsA + '<b> AppId </b>' + val.app + '</strong></td><td class="text-center resBtn"></td></tr>');
            var keyS = document.getElementById(key);
            keyS.onclick = function () {
              var appId = document.getElementById('appId');
              appId.value = val.app;
              var HM = moment(val.date).format("HH:mm")
              HM = HM.split(':')
              var YMD = moment(val.date).format("DD.MM.YYYY")
              YMD = YMD.split('.')
              var time = new Date(2020, YMD[1] - 1, YMD[0] - 1, HM[0], HM[1], 5, 0);
              var t = document.getElementById('time')
              t.value = time
            }
          })
        }
      })
    }
  }
}
</script>

<style>
body {
  background-color: #b9caff;
  color: #8d47ff;
}
.time{
  display:none;
}
b{
  color: white;
}
.home {
  text-align: center;
}
.input {
  width: 20vw;
  height: 3vh;
  font-size: 2vh;
  text-align: center;
  color: #9c0101;
  border: 2px solid #80770c;
  margin-top: 5px;
  border: none;
  border-radius: 10px;
  border: 2px solid #50b2da;
}
.but{
  height: 4vh;
  width: 20vw;
  background-color: skyblue;
  border: none;
  border-radius: 10px;
  margin-top: 5px;
}
.but:hover {
  background-color: #50b2da;
}
.but2{
  height: 4vh;
  width: 10vw;
  background-color: skyblue;
  border: none;
  border-radius: 10px;
  margin-right: 1vw;
}
.but2:hover {
  background-color: #50b2da;
}
</style>
