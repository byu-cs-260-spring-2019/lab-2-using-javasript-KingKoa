

    document.getElementById("weatherSubmit").addEventListener("click", async function(event) {
        event.preventDefault();
        const value = document.getElementById("weatherInput").value;
        if (value === "")
        return;
        console.log(value);
        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=329a5a74260f16c52a0681b755c9b305";

        try {
            //tryin to do something that might fail
            
            const response = await fetch(url);
            console.log("response: ", response);
            const json = await response.json();
            console.log("json: ", json);
            let results = "";
            results += '<h2>Weather in ' + json.name + "</h2>";
            for (let i=0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>' + json.main.temp + " &deg;F</h2>"
            results += "<p>"
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description
            if (i !== json.weather.length - 1)
                results += ", "
            }

            results += "</p>";
            document.getElementById("weatherResults").innerHTML = results;

            const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=329a5a74260f16c52a0681b755c9b305";
            
            const weekly = await fetch(url2);
            console.log("response: ", weekly);
            const json2 = await weekly.json();
            console.log("json: ", json2);
            /*
            fetch(url2)
              .then(function(response) {
                return response.json();
              }).then(function(json) {
                console.log(json);
              });
            */
            let forecast = "";
            
            for (let i=0; i < json2.list.length; i++) {
                forecast += "<h2>" + moment(json2.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
                forecast += "<p>Temperature: " + json2.list[i].main.temp + "</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json2.list[i].weather[0].icon + '.png"/>'
            }
            
            document.getElementById("forecastResults").innerHTML = forecast;
            
            for (let i=0; i < json2.list.length; i++) {
                forecast += "<h2>" + moment(json2.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
                forecast += "<p>Temperature: " + json2.list[i].main.temp + "</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json2.list[i].weather[0].icon + '.png"/>'
            }
            
            document.getElementById("forecastResults").innerHTML = forecast;

        }
        
        catch(err) {
            console.log(err);
        }
    });

    

