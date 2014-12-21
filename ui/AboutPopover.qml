import QtQuick 2.0
import Ubuntu.Components 1.1
import Ubuntu.Components.ListItems 1.0 as ListItem
import Ubuntu.Components.Popups 1.0

Component {
    id: popoverComponent

    Popover {
        id: aboutPopover

        Column {
            id: aboutColumn

            anchors {
                left: parent.left
                right: parent.right
            }

            ListItem.Header {
                text: "uDART\tv" + version
            }

            ListItem.Standard {
                text: "Written by Aaron Hastings (thecosmicfrog)"

                onClicked: Qt.openUrlExternally("https://github.com/thecosmicfrog")
            }

            ListItem.Standard {
                text: "License: GNU GPLv3"
            }

            ListItem.Standard {
                text: "Source code, bugs and feature requests:<br>
                       <a href=\"https://github.com/thecosmicfrog/uDART\">github.com/thecosmicfrog/uDART</a>"

                onClicked: Qt.openUrlExternally("https://github.com/thecosmicfrog/uDART")
            }

            ListItem.SingleControl {
                highlightWhenPressed: false

                control: Button {
                    text: "Close"
                    onClicked: PopupUtils.close(aboutPopover)
                }
            }
        }
    }
}
