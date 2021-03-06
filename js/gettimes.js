WorkerScript.onMessage = function(sentMessage) {
    var station = sentMessage.station;
    var xmlHttp = new XMLHttpRequest();
    var msg;
    var parsedMsg;
    var northboundTrains = [];
    var southboundTrains = [];
    var stationInfo = [];
    var trains = [];

    /*
     * Randomly choose an API endpoint to query. This provides load balancing and redundancy
     * in case of server failures.
     * All API endpoints are of the form: "apiN.thecosmicfrog.org", where N is determined by
     * the formula below.
     * The constant NUM_API_ENDPOINTS governs how many endpoints there currently are.
     */
    var API_URL_PREFIX = "https://api";
    var API_URL_POSTFIX = ".thecosmicfrog.org/cgi-bin/irish-rail-api.php?station=";
    var NUM_API_ENDPOINTS = 2;
    var apiEndpointToQuery = Math.floor((Math.random() * NUM_API_ENDPOINTS + 1)).toString();
    var apiUrl = API_URL_PREFIX + apiEndpointToQuery + API_URL_POSTFIX;

    xmlHttp.open("GET", apiUrl + station, true);
    xmlHttp.send(null);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            msg = xmlHttp.responseText;

            // Parse response text to usable object.
            parsedMsg = JSON.parse(msg);

            if (typeof parsedMsg != "undefined") {
                // Ensure that train times are available.
                if (parsedMsg.hasOwnProperty("trains")) {
                    for (var i = 0; i < parsedMsg.trains.length; i++) {
                        if (parsedMsg.trains[i].Direction === "Northbound")
                            northboundTrains.push(parsedMsg.trains[i]);

                        if (parsedMsg.trains[i].Direction === "Southbound")
                            southboundTrains.push(parsedMsg.trains[i]);
                    }

                    // Ensure that both northbound and southbound arrays are of length 4.
                    while (northboundTrains.length < 4) {
                        northboundTrains.push("");
                    }

                    while (southboundTrains.length < 4) {
                        southboundTrains.push("");
                    }

                    // Append "min" or "mins" to time.
                    for (var i = 0; i < northboundTrains.length; i++) {
                        if (northboundTrains[i].Duein === "0")
                            northboundTrains[i].Duein = "DUE";
                        else {
                            if (parseInt(northboundTrains[i].Duein) < 10)
                                northboundTrains[i].Duein = "  ".concat(northboundTrains[i].Duein).concat('m');
                            else if (parseInt(northboundTrains[i].Duein) > 1)
                                northboundTrains[i].Duein += 'm'
                        }
                    }

                    for (var i = 0; i < southboundTrains.length; i++) {
                        if (southboundTrains[i].Duein === "0")
                            southboundTrains[i].Duein = "DUE";
                        else {
                            if (parseInt(southboundTrains[i].Duein) < 10)
                                southboundTrains[i].Duein = "  ".concat(southboundTrains[i].Duein).concat('m');
                            else if (parseInt(southboundTrains[i].Duein) > 1)
                                southboundTrains[i].Duein += 'm'
                        }
                    }

                    // Compile all stop times and add to stop info array, replacing undefined times with empty strings.
                    // Note: As there will always be 8 stop times, southbound times are offset by 4.
                    for (var i = 0; i < 4; i++) {
                        stationInfo[i] = [northboundTrains[i].Destination, northboundTrains[i].Exparrival,
                                          northboundTrains[i].Duein, northboundTrains[i].Traintype];

                        if (typeof stationInfo[i][0] == "undefined")
                            stationInfo[i][0] = "";
                        if (typeof stationInfo[i][1] == "undefined")
                            stationInfo[i][1] = "";
                        if (typeof stationInfo[i][2] == "undefined")
                            stationInfo[i][2] = "";
                        if (typeof stationInfo[i][3] == "undefined")
                            stationInfo[i][3] = "";

                        stationInfo[i+4] = [southboundTrains[i].Destination, southboundTrains[i].Exparrival,
                                            southboundTrains[i].Duein, southboundTrains[i].Traintype];

                        if (typeof stationInfo[i+4][0] == "undefined")
                            stationInfo[i+4][0] = "";
                        if (typeof stationInfo[i+4][1] == "undefined")
                            stationInfo[i+4][1] = "";
                        if (typeof stationInfo[i+4][2] == "undefined")
                            stationInfo[i+4][2] = "";
                        if (typeof stationInfo[i+4][3] == "undefined")
                            stationInfo[i+4][3] = "";
                    }
                }
                // If train times are not present in returned API message, service has probably stopped running for the day.
                else {
                    stationInfo[0] = ["<b>No trains forecast</b>", "", "", ""];

                    // Populate array with empty strings.
                    for (var i = 1; i < 8; i++) {
                        stationInfo[i] = ["", "", "", ""];
                    }
                }
            }

            WorkerScript.sendMessage({'reply': stationInfo});
        }
    }
}
