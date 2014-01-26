import QtQuick 2.0
import Ubuntu.Components 0.1

Page {
    title: i18n.tr("uDART")

    // Always begin by loading the selected stop.
    Component.onCompleted: {
        activityIndicator.running = true
        stationSelector.selectedIndex = getLastStationIndex(lastStation.contents.stationName, stationsModel)
        queryStationTimesWorker.sendMessage({'station': stationsModel.get(stationSelector.selectedIndex).name})
    }

    WorkerScript {
        id: queryStationTimesWorker
        source: "../js/gettimes.js"

        onMessage: {
            northboundStop1Name.text = String(getArray(messageObject.reply)[0][0])
            northboundStop1Time.text = String(getArray(messageObject.reply)[0][1])
            northboundStop2Name.text = String(getArray(messageObject.reply)[1][0])
            northboundStop2Time.text = String(getArray(messageObject.reply)[1][1])
            northboundStop3Name.text = String(getArray(messageObject.reply)[2][0])
            northboundStop3Time.text = String(getArray(messageObject.reply)[2][1])
            northboundStop4Name.text = String(getArray(messageObject.reply)[3][0])
            northboundStop4Time.text = String(getArray(messageObject.reply)[3][1])

            southboundStop1Name.text = String(getArray(messageObject.reply)[4][0])
            southboundStop1Time.text = String(getArray(messageObject.reply)[4][1])
            southboundStop2Name.text = String(getArray(messageObject.reply)[5][0])
            southboundStop2Time.text = String(getArray(messageObject.reply)[5][1])
            southboundStop3Name.text = String(getArray(messageObject.reply)[6][0])
            southboundStop3Time.text = String(getArray(messageObject.reply)[6][1])
            southboundStop4Name.text = String(getArray(messageObject.reply)[7][0])
            southboundStop4Time.text = String(getArray(messageObject.reply)[7][1])

            activityIndicator.running = false
        }
    }

    Item {
        anchors {
            margins: units.gu(2)
            fill: parent
        }

        ActivityIndicator {
            id: activityIndicator

            // Align activity indicator to the right.
            anchors.left: parent.left
            LayoutMirroring.enabled: true
        }

        OptionSelector {
            id: stationSelector
            text: "<h2>Select Stop:</h2>"
            containerHeight: units.gu(21.5)
            expanded: false
            model: stationsModel

            delegate: OptionSelectorDelegate {
                text: name
                subText: description
                icon: image
            }

            onSelectedIndexChanged: {
                activityIndicator.running = true
                queryStationTimesWorker.sendMessage({'station': stationsModel.get(stationSelector.selectedIndex).name})

                // Save station to U1DB backend for faster access on next app start.
                lastStation.contents = {stationName: stationsModel.get(stationSelector.selectedIndex).name}
            }
        }

        ListModel {
            id: stationsModel
            ListElement { name: "Malahide"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Portmarnock"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Clongriffin"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Howth"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Sutton"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Bayside"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Howth Junction"; description: ""; image: "../img/bicycle.png" }
            ListElement { name: "Kilbarrack"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Raheny"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Harmonstown"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Killester"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Clontarf Road"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Dublin Connolly"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Tara Street"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Dublin Pearse"; description: ""; image: "../img/bicycle.png" }
            ListElement { name: "Grand Canal Dock"; description: ""; image: "../img/bicycle.png" }
            ListElement { name: "Lansdowne Road"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Sandymount"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Sydney Parade"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Booterstown"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Blackrock"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Seapoint"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Salthill"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Dun Laoghaire"; description: ""; image: "../img/bicycle.png" }
            ListElement { name: "Sandycove"; description: ""; image: "../img/blank.png" }
            ListElement { name: "Glenageary"; description: ""; image: "../img/bicycle.png" }
            ListElement { name: "Dalkey"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Killiney"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Shankill"; description: ""; image: "../img/parking.png" }
            ListElement { name: "Bray"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Greystones"; description: ""; image: "../img/parking_and_bicycle.png" }
            ListElement { name: "Kilcoole"; description: ""; image: "../img/parking_and_bicycle.png" }
        }

        UbuntuShape {
            id: northbound
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "#7dc242"

            anchors {
                top: stationSelector.bottom
                topMargin: units.gu(2)
            }

            Label {
                text: "<b>Northbound</b>"
                color: "white"

                anchors.centerIn: parent
            }
        }

        UbuntuShape {
            id: northboundStop1
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "white"

            anchors {
                top: northbound.bottom
                topMargin: units.gu(0)
            }

            Label {
                id: northboundStop1Name
                width: parent.width / 2

                anchors.leftMargin: 6
                x: parent.x + 6
                y: parent.x + 5
            }

            Label {
                id: northboundStop1Time

                anchors.left: northboundStop1Name.right
                y: parent.x + 5
            }
        }

        UbuntuShape {
            id: northboundStop2
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "white"

            anchors {
                top: northboundStop1.bottom
                topMargin: units.gu(0)
            }

            Label {
                id: northboundStop2Name
                width: parent.width / 2

                anchors.leftMargin: 6
                x: parent.x + 6
                y: parent.x + 5
            }

            Label {
                id: northboundStop2Time

                anchors.left: northboundStop2Name.right
                y: parent.x + 5
            }
        }

        UbuntuShape {
            id: northboundStop3
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "white"

            anchors {
                top: northboundStop2.bottom
                topMargin: units.gu(0)
            }

            Label {
                id: northboundStop3Name
                width: parent.width / 2

                anchors.leftMargin: 6
                x: parent.x + 6
                y: parent.x + 5
            }

            Label {
                id: northboundStop3Time

                anchors.left: northboundStop3Name.right
                y: parent.x + 5
            }
        }

        UbuntuShape {
            id: northboundStop4
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "white"

            anchors {
                top: northboundStop3.bottom
                topMargin: units.gu(0)
            }

            Label {
                id: northboundStop4Name
                width: parent.width / 2

                anchors.leftMargin: 6
                x: parent.x + 6
                y: parent.x + 5
            }

            Label {
                id: northboundStop4Time

                anchors.left: northboundStop4Name.right
                y: parent.x + 5
            }
        }

        UbuntuShape {
            id: southbound
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "#7dc242"

            anchors {
                top: northboundStop4.bottom
                topMargin: units.gu(0)
            }

            Label {
                text: "<b>Southbound</b>"
                color: "white"

                anchors.centerIn: parent
            }
        }

        UbuntuShape {
            id: southboundStop1
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "white"

            anchors {
                top: southbound.bottom
                topMargin: units.gu(0)
            }

            Label {
                id: southboundStop1Name
                width: parent.width / 2

                anchors.leftMargin: 6
                x: parent.x + 6
                y: parent.x + 5
            }

            Label {
                id: southboundStop1Time

                anchors.left: southboundStop1Name.right
                y: parent.x + 5
            }
        }

        UbuntuShape {
            id: southboundStop2
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "white"

            anchors {
                top: southboundStop1.bottom
                topMargin: units.gu(0)
            }

            Label {
                id: southboundStop2Name
                width: parent.width / 2

                anchors.leftMargin: 6
                x: parent.x + 6
                y: parent.x + 5
            }

            Label {
                id: southboundStop2Time

                anchors.left: southboundStop2Name.right
                y: parent.x + 5
            }
        }

        UbuntuShape {
            id: southboundStop3
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "white"

            anchors {
                top: southboundStop2.bottom
                topMargin: units.gu(0)
            }

            Label {
                id: southboundStop3Name
                width: parent.width / 2

                anchors.leftMargin: 6
                x: parent.x + 6
                y: parent.x + 5
            }

            Label {
                id: southboundStop3Time

                anchors.left: southboundStop3Name.right
                y: parent.x + 5
            }
        }

        UbuntuShape {
            id: southboundStop4
            width: parent.width
            height: units.gu(3)
            radius: "medium"
            color: "white"

            anchors {
                top: southboundStop3.bottom
                topMargin: units.gu(0)
            }

            Label {
                id: southboundStop4Name
                width: parent.width / 2

                anchors.leftMargin: 6
                x: parent.x + 6
                y: parent.x + 5
            }

            Label {
                id: southboundStop4Time

                anchors.left: southboundStop4Name.right
                y: parent.x + 5
            }
        }
    }

    tools: Toolbar {
        ToolbarButton {
            id: reloadButton

            text: "Reload"
            iconSource: "../img/reload.png"
            onTriggered: {
                activityIndicator.running = true
                queryStationTimesWorker.sendMessage({'station': stationsModel.get(stationSelector.selectedIndex).name})
            }
        }
    }
}
