stateCodeToName = {
    "an": "Andaman and Nicobar Islands",
    "ap": "Andhra Pradesh",
    "ar": "Arunachal Pradesh",
    "as": "Assam",
    "br": "Bihar",
    "ch": "Chandigarh",
    "ct": "Chhattisgarh",
    "dd": "Daman & Diu",
    "dl": "Delhi",
    "dn": "Dadra & Nagar Haveli",
    "ga": "Goa",
    "gj": "Gujarat",
    "hp": "Himachal Pradesh",
    "hr": "Haryana",
    "jh": "Jharkhand",
    "jk": "Jammu And Kashmir",
    "ka": "Karnataka",
    "kl": "Kerala",
    "la": "Ladakh",
    "ld": "Lakshadweep",
    "mh": "Maharashtra",
    "ml": "Meghalaya",
    "mn": "Manipur",
    "mp": "Madhya Pradesh",
    "mz": "Mizoram",
    "nl": "Nagaland",
    "or": "Odisha",
    "pb": "Punjab",
    "py": "Puducherry",
    "rj": "Rajasthan",
    "sk": "Sikkim",
    "tg": "Telangana",
    "tn": "Tamil Nadu",
    "tr": "Tripura",
    "tt": "Total",
    "un": "Unknown",
    "up": "Uttar Pradesh",
    "ut": "Uttarakhand",
    "wb": "West Bengal"
};
helpLineNumbers = {
    "an": "03192-232102",
    "ap": "0866-2410978",
    "ar": "9436055743",
    "as": "6913347770",
    "br": "104",
    "ch": "9779558282",
    "ct": "104",
    "dd": "104",
    "dl": "011-22307145",
    "dn": "104",
    "ga": "104",
    "gj": "104",
    "hp": "104",
    "hr": "8558893911",
    "jh": "104",
    "jk": "01912520982, 0194-2440283",
    "ka": "104",
    "kl": "0471-2552056",
    "la": "01982256462",
    "ld": "104",
    "mh": "020-26127394",
    "ml": "108",
    "mn": "3852411668",
    "mp": "104",
    "mz": "102",
    "nl": "7005539653",
    "or": "9439994859",
    "pb": "104",
    "py": "104",
    "rj": "0141-2225624",
    "sk": "104",
    "tg": "104",
    "tn": "044-29510500",
    "tr": "0381-2315879",
    "un": "104",
    "up": "18001805145",
    "ut": "104",
    "wb": "1800313444222, 03323412600"
};
resources=[
    {
        "name":"covid.army",
        "description":"Custom search for recent tweets regarding remdesivir favipiravir oxygen ventilator plasma tocilizumab icu beds food, with some popular city locations",
        "link":"http://covid.army"
    },
    {
        "name":"covid19-twitter.in",
        "description":"Custom search for recent tweets regarding remdesivir favipiravir oxygen ventilator plasma tocilizumab icu beds food, with some popular city locations",
        "link":"http://covid19-twitter.in"
    },
    {
        "name":"covidresource.glideapp.io",
        "description":"Nation-wide crowdsourced info about Covid Resources. You can register here if you are providing any services & also look for services provided by other people. Keeps records of all the basic covid needs.",
        "link":"http://covidresource.glideapp.io"
    },
    {
        "name":"friends2support.org",
        "description":"You can search for covid19 plasma donor here.",
        "link":"http://friends2support.org/"
    }
];
displayId = "covid-stats";

$(function () {
    $.showTodayTable();
    $('#show-today').click(function(){
        $.showTodayTable();
    });
    $('#show-total').click(function(){
        $.showTotalTable();
    });
    $('#show-resources').click(function(){
        $.showResources();
    });
});

$.showTodayTable = () => {
    /*fills the today's details in the table */
    $('#' + displayId).addClass('hidden'); // hide currently display division
    if ($('#covid-stats').hasClass('hidden'))
        $('#covid-stats').removeClass('hidden');
    displayId="covid-stats"; 
    //ajax request 
    $.ajax({
        type: "get",
        url: "https://api.covid19india.org/states_daily.json",
        data: "",
        dataType: "json",
        success: function (response) {
            dataToday = response["states_daily"].slice(-3);
            $('#table-body').html("");
            i = 0;
            $.each(stateCodeToName, function (indexInArray, valueOfElement) {
                if (indexInArray == "tt")
                    return;
                i++;
                appendText = '<tr><td class="text-dark">' + i + '</td><td class="text-dark text-wrap">' + valueOfElement + '</td><td class="text-danger text-center">' + dataToday[0][indexInArray] + '</td><td class="text-dark text-center">' + dataToday[2][indexInArray] + '</td><td class="text-success text-center">' + dataToday[1][indexInArray] + '</td><td><button class="btn btn-warning" data-id=' + indexInArray + ' onclick="showStateData(this)">Details</button></td></tr>';
                $('#table-body').append(appendText);
            });
            i++;
            appendText = '<tr><td class="text-dark">' + i + '</td><td class="text-dark text-wrap">' + "Total" + '</td><td class="text-danger text-center">' + dataToday[0]["tt"] + '</td><td class="text-dark text-center">' + dataToday[2]["tt"] + '</td><td class="text-success text-center">' + dataToday[1]["tt"] + '</td><td><button class="btn btn-warning" data-id="tt" onclick="showStateData(this)" >Details</button></td></tr>';
            $('#table-body').append(appendText);
        }
    });
}
$.showTotalTable=()=>{
    /*fills the today's details in the table */
    $('#' + displayId).addClass('hidden'); // hide currently display division
    if ($('#covid-stats-total').hasClass('hidden'))
        $('#covid-stats-total').removeClass('hidden');
    displayId="covid-stats-total";
    
    $.ajax({
        type: "get",
        url: "https://api.covid19india.org/data.json",
        data: "",
        dataType: "json",
        success: function (response) {
            console.log(response);
            stateData=response.statewise;
            console.log(stateData);
            $('#table-body-total').html("");
            i = 0;
            $.each(stateData, function (indexInArray, valueOfElement) { 
                i++;
                appendText = '<tr><td class="text-dark">' + i + '</td><td class="text-dark text-wrap">' + stateCodeToName[valueOfElement['statecode'].toLowerCase()] + '</td><td class="text-danger text-center">' + valueOfElement.active + '</td><td class="text-danger text-center">' +valueOfElement.confirmed + '</td><td class="text-dark text-center">' + valueOfElement.deaths + '</td></td><td class="text-success text-center">' + valueOfElement.recovered + '</td></td><td class="text-dark text-center">' + valueOfElement.lastupdatedtime + '</td></tr>';
                $('#table-body-total').append(appendText);
            });
        }
    });
}


$.showStateDetails = (stateCode) => {
    $('#' + displayId).addClass('hidden');
    if ($('#state-details').hasClass('hidden'))
        $('#state-details').removeClass('hidden');
    displayId = "state-details";
    console.log(stateCode);
    $.ajax({
        type: "get",
        url: "https://api.covid19india.org/state_district_wise.json",
        data: "",
        dataType: "json",
        success: function (response) {
            districts="";
            $('#table-body-district').html("");
            $.each(response, function (indexInArray, valueOfElement) { 
                if(valueOfElement.statecode==stateCode.toUpperCase()){
                console.log(valueOfElement.districtData);   
                districts=valueOfElement.districtData}
            });
            if(districts==null || districts == undefined)
            return;
            else{
            console.log(districts);
            i=0;
             $.each(districts, function (indexInArray, valueOfElement) { 
                  console.log(indexInArray);
                  i++;
                  appendText = '<tr><td class="text-dark">' + i + '</td><td class="text-dark text-wrap">' + indexInArray + '</td><td class="text-danger text-center">' + valueOfElement.active + '</td><td class="text-danger text-center">' +valueOfElement.confirmed+'</td><td class="text-dark text-center">' +valueOfElement.deceased+ '</td><td class="text-success text-center">' + valueOfElement.recovered + '</td></tr>';
                  $('#table-body-district').append(appendText);
             });   
            }
        }
    });
}
$.showResources=()=>{
    $('#' + displayId).addClass('hidden');
    if ($('#covid-resources').hasClass('hidden'))
        $('#covid-resources').removeClass('hidden');
    displayId = "covid-resources";
    i=0;
    $('#table-body-helpline').html("");
    $.each(helpLineNumbers, function (indexInArray, valueOfElement) { 
        i++; 
        appendText='<tr><td class="text-dark">'+i+'</td><td class="text-dark">'+stateCodeToName[indexInArray]+'</td><td class="text-dark">'+valueOfElement+'</td></tr>';
        $('#table-body-helpline').append(appendText);
    });
    i=0;
    $('#table-body-unofficial').html("");
    $.each(resources, function (indexInArray, valueOfElement) { 
        i++; 
        appendText='<tr><td class="text-dark">'+i+'</td><td class="text-dark">'+valueOfElement.name+'</td><td class="text-dark">'+valueOfElement.description+'</td><td><a href="'+valueOfElement.link+'" class="text-primary" target="_blank">Click here</a><td></tr>';
        $('#table-body-unofficial').append(appendText);
    });
}
function showStateData(button) {
    $.showStateDetails(button.dataset.id);

}
