/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.786e3ebc-5bd0-4f23-b0ff-38f9f6e8a08';

const handlers = {
    "LaunchRequest": function () {
        this.emit("SayHello");
    },
    "HelloWorldIntent": function () {
        this.emit("SayHello")
    },
    "SayHello": function () {
        this.response.speak("Hello World!");
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function () {
        const speechOutput = "This is the Hello World Sample Skill. ";
        const reprompt = "Say hello, to hear me speak.";

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function () {
        this.response.speak("Goodbye!");
        this.emit(":responseReady");
    },
    "AMAZON.StopIntent": function () {
        this.response.speak("See you later!");
        this.emit(":responseReady");
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
