// ==UserScript==
// @name         su amq
// @namespace    https://github.com/Aryssiel/amq-scripts
// @version      0.6.3
// @description  Button to create a lobby right away with preselected names and password..
// @author       ary ft. claudio
// @match        https://*.animemusicquiz.com/*
// @downloadURL  https://raw.githubusercontent.com/Aryssiel/amq-scripts/main/su-amq.user.js
// @updateURL    https://raw.githubusercontent.com/Aryssiel/amq-scripts/main/su-amq.user.js
// @grant        GM_addStyle
// ==/UserScript==
'use strict';
let names = ["borren chanting","radio","jafeto porfavor vuelve a casa","jaimeme","metak weko","su sala", "su amq", "el metak se quejo que sale siempre lo mismo", "metak weko reborn"]
]
let hostListner = null;
let communityMode = false;
let roomName = "test"
let password = "123";
this.hostListner;


function onViewChanged() {
    ViewChanger.prototype.changeView = (function() {
        let old = ViewChanger.prototype.changeView;
        return function() {
            old.apply(this, arguments);
            setTimeout(() => { onViewChanged(); }, 1);
        }
    })();
    function onViewChanged() {
        if(viewChanger.currentView === "lobby") {
            readyStart();
        }
    }
}
// Function to be executed when the button is clicked
let settings = {
    "roomName": roomName,
    "privateRoom": true,
    "password": password,
    "roomSize": 8,
    "numberOfSongs": 35,
    "teamSize": 8,
    "modifiers": {
        "skipGuessing": true,
        "skipReplay": true,
        "duplicates": true,
        "queueing": true,
        "lootDropping": true,
        "rebroadcastSongs": true,
        "dubSongs": false,
        "fullSongRange": true,
        "quizJoin": true
    },
    "songPool": 2,
    "songSelection": {
        "standardValue": 1,
        "advancedValue": {
            "watched": 0,
            "unwatched": 0,
            "random": 35
        }
    },
    "watchedDistribution": 1,
    "songType": {
        "standardValue": {
            "openings": true,
            "endings": true,
            "inserts": true
        },
        "advancedValue": {
            "openings": 0,
            "endings": 0,
            "inserts": 0,
            "random": 35
        }
    },
    "openingCategories": {
        "instrumental": true,
        "chanting": true,
        "character": true,
        "standard": true
    },
    "endingCategories": {
        "instrumental": true,
        "chanting": true,
        "character": true,
        "standard": true
    },
    "insertCategories": {
        "instrumental": true,
        "chanting": true,
        "character": true,
        "standard": true
    },
    "guessTime": {
        "randomOn": false,
        "standardValue": 20,
        "randomValue": [
            1,
            60
        ]
    },
    "extraGuessTime": {
        "randomOn": false,
        "standardValue": 0,
        "randomValue": [
            0,
            15
        ]
    },
    "scoreType": 1,
    "hintSetup": {
        "songPoints": 5,
        "nameCost": 4,
        "infoCost": 1,
        "multipleChoiceCost": 4,
        "audioCost": 3,
        "tinyVideoCost": 3,
        "blurVideoCost": 3
    },
    "answeringMode": 1,
    "guessMode": {
        "song": true,
        "tinyVideo": false,
        "blurVideo": false
    },
    "showSelection": 1,
    "inventorySize": {
        "randomOn": false,
        "standardValue": 20,
        "randomValue": [
            1,
            99
        ]
    },
    "lootingTime": {
        "randomOn": false,
        "standardValue": 90,
        "randomValue": [
            10,
            150
        ]
    },
    "lives": 5,
    "bossLives": 3,
    "bossPowerUps": 3,
    "bossMaxSongs": 10,
    "samplePoint": {
        "randomOn": true,
        "standardValue": 1,
        "randomValue": [
            0,
            100
        ]
    },
    "playbackSpeed": {
        "randomOn": false,
        "standardValue": 1,
        "randomValue": [
            true,
            true,
            true,
            true
        ]
    },
    "songDifficulity": {
        "advancedOn": true,
        "standardValue": {
            "beginner": true,
            "easy": true,
            "medium": true,
            "hard": true,
            "expert": true
        },
        "advancedValue": [
            0,
            50
        ]
    },
    "songPopularity": {
        "advancedOn": false,
        "standardValue": {
            "disliked": true,
            "mixed": true,
            "liked": true
        },
        "advancedValue": [
            0,
            100
        ]
    },
    "playerScore": {
        "advancedOn": false,
        "standardValue": [
            1,
            10
        ],
        "advancedValue": [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ]
    },
    "animeScore": {
        "advancedOn": false,
        "standardValue": [
            2,
            10
        ],
        "advancedValue": [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ]
    },
    "animePopularity": {
        "advancedOn": false,
        "standardValue": 5,
        "advancedValue": [
            1,
            9999
        ]
    },
    "vintage": {
        "standardValue": {
            "years": [
                1924,
                2026
            ],
            "seasons": [
                0,
                3
            ]
        },
        "advancedValueList": []
    },
    "type": {
        "tv": true,
        "movie": true,
        "ova": true,
        "ona": true,
        "special": true
    },
    "genre": [],
    "tags": [],
    "gameMode": "Multiplayer"
};
function handleClick() {
    if (this.hostListner) {
		this.hostListner.unbindListener();
	}
	this.hostListner = new Listener(
		"Host Game",
		function (response) {
			hostModal.hide();
			lobby.setupLobby(response, false);
			viewChanger.changeView("lobby");
			if (this.hostListner) {
				this.hostListner.unbindListener();
			}
		}.bind(this)
	);

	this.hostListner.bindListener();
    settings.roomName = names[Math.floor(Math.random() * names.length)];


    socket.sendCommand({
		type: "roombrowser",
		command: "host room",
		data: {settings, communityMode}
	});
}

// Create the button element
var button = document.createElement("div");
button.className = "button floatingContainer mainMenuButton";
button.id = "customButton";
button.innerHTML = "<h1>Su amq</h1>";

// Add a click event listener to the button
button.addEventListener("click", handleClick);

// Append the button to the main menu
var mainMenu = document.getElementById("mainMenu");
if (mainMenu) {
    mainMenu.insertBefore(button, mainMenu.firstChild);
}

// Add the button to the options container as well, if needed
var optionsContainer = document.getElementById("optionsContainer");
if (optionsContainer) {
    var optionsList = optionsContainer.querySelector("ul");
    if (optionsList) {
        var listItem = document.createElement("li");
        listItem.className = "clickAble";
        listItem.textContent = "Custom Button";
        listItem.addEventListener("click", handleClick);
        optionsList.insertBefore(listItem, optionsList.firstChild);
    }
}

// Extra code cuz egerod's suggestion box is too fucking small
GM_addStyle(`
    #lnSettingSongPoolListSuggestContainer {
        max-height: 450px !important;
        height: auto !important;
    }

    #lnSettingSongPoolListSuggestEntryContainer {
        max-height: 450px !important;
        height: auto !important;
    }

    #lnSettingSongPoolListSelectorEntryContainer {
        max-height: 450px !important;
        min-height: auto !important;
    }

    .lnSettingSongPoolListSelectorEntry {
        padding: 12px 15px !important;
        display: flex !important;
        align-items: center !important;
    }

    .lnSettingSongPoolListSelectorEntryListName div {
        font-size: 20px !important;
        font-weight: 500 !important;
    }

    .lnSettingSongPoolListDropdownContainer {
        display: flex !important;
        flex-direction: column !important;
    }
`);