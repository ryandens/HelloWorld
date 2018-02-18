const expect = require("chai").expect;
const VirtualAlexa = require("virtual-alexa").VirtualAlexa;

describe("Test the hello world skill", function() {
    let alexa;
    beforeEach(function () {
        alexa = VirtualAlexa.Builder()
            .handler("lambda/custom/index.handler") // Lambda function file and name
            .interactionModelFile("./models/en-US.json")
            .create();
    });

    it("Should agree that true is true", function() {
        expect(true).to.be.true;
    });

    it("Should agree that true is true asynchronously", function(done) {
        setTimeout(() => {
            expect(true).to.be.true;
            done();
        }, 500);
    });

    it("Should launch the skill and get a response", function(done) {
        alexa.filter(function(request) {
            request.context.System.device.supportedInterfaces.Display = {};
            request.context.System.device.supportedInterfaces.VideoApp = {};
            return request;
        }).launch().then((result) => {
            expect(result.response.outputSpeech.ssml).to.exist;
            expect(result.response.outputSpeech.ssml).to.include("Hello World");
            done();
        });
    });

    it("Should utter hello and get a response", function(done) {
        alexa.utter("hello").then((result) => {
            expect(result.response.outputSpeech.ssml).to.exist;
            expect(result.response.outputSpeech.ssml).to.include("Hello World");
            done();
        });
    });
    
    // it("Should utter help and get a response", function(done) {
    //     alexa.utter("help").then((result) => {
    //         expect(result.response.outputSpeech.ssml).to.exist;
    //         expect(result.response.outputSpeech.ssml).to.include("This is the Hello World Sample Skill");
    //         done();
    //     });
    // });
    //
    // it("Should utter cancel and get a response", function(done) {
    //     alexa.utter("cancel").then((result) => {
    //         expect(result.response.outputSpeech.ssml).to.exist;
    //         expect(result.response.outputSpeech.ssml).to.include("Goodbye!");
    //         done();
    //     });
    // });
    //
    // it("Should utter stop and get a response", function(done) {
    //     alexa.utter("stop").then((result) => {
    //         expect(result.response.outputSpeech.ssml).to.exist;
    //         expect(result.response.outputSpeech.ssml).to.include("See you later!");
    //         done();
    //     });
    // });
});
