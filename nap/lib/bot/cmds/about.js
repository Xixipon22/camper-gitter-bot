"use strict";

function clog(msg, obj) {
    Utils.clog("BotCommands>", msg, obj);
}

function tlog(msg, obj) {
    Utils.warn("BotCommands>", msg, obj);
}

var GBot = require("../../../lib/bot/GBot.js"),
    KBase = require("../../bot/KBase"),
    Utils = require("../../../lib/utils/Utils"),
    AppConfig = require("../../../config/AppConfig"),
    HttpWrap = require("../../../lib/utils/Utils");

// response:
// {
//     "about": {
//         "username": "berkeleytrue",
//         "bio": "Cyber Wizard @ http://r3dm.com, Camp Counselor @ freecodecamp.com",
//         "github": "http://github.com/BerkeleyTrue"
//     }
// }

var showInfo = function(blob) {
    clog("userInfo", blob);
};

var about = function(input, bot) {
    // var mentioned = InputWrap.mentioned(input);
    var mentions, uri, str, res, them, blob, name, endpoint;

    clog("input---------");
    console.log(JSON.stringify(input));

    mentions = input.message.model.mentions;
    them = mentions[0];
    if (!them) {
        return "you need to ask about @someone!";
    }
    clog('them', them);
    // name = "berkeleytrue";
    name = them.screenName.toLowerCase();
    uri = "http://beta.freecodecamp.com/api/users/about?username=" + name;
    clog("uri", uri);

    bot.say("getting info", input.message.room);

    endpoint = {
        host: 'beta.freecodecamp.com',
        port: 80, //443 if protocol = https
        path: '/api/users/about?username=' + name
    };

    HttpWrap.getApi(endpoint, showInfo);

    return "...";

    // return "about " + mentioned[0];

    // var timedout = false;

    // var request = httpSync.request({
    //     method: 'GET',
    //     headers: {},
    //     body: '',
    //     protocol: 'http',
    //     host: 'beta.freecodecamp.com',
    //     port: 80, //443 if protocol = https
    //     path: '/api/users/about?username=' + name
    // });

    //     // request.setTimeout(1000, function() {
    //     //     clog("Request Timedout!");
    //     //     timedout = true;
    //     // });
    //     // var response = request.end();
    //     // if (!timedout) {
    //     //     clog('response', response);
    //     //     console.log(response.body.toString());
    //     // }
    //     // // return `unknown user: ${name}`;

    //     // blob = JSON.parse(response.body.toString() );
    //     // clog("res", blob);

    //     str = `
    // ----

    // ![${them}](https://avatars2.githubusercontent.com/${them}?&s=128) |## [${name}](http://www.freecodecamp.com/${name})
    // ------------- | -------------
    // [github](${blob.about.github})  | bio: ${blob.about.bio}
    // ----
    //     `;

    //     return str;


};

module.exports = about;