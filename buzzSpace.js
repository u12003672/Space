/**
 *University of Pretoria
 *COS 301 Engineering: BuzzSpace Module
 *
 *BuzzSpaces is the core module, which is responsible for managing the buzz spaces
 *for the different modules
 */

require("login.js");
require("buzzDataSources.js");
require("buzzThreads.js");

var BuzzSpace;

BuzzSpace = {

    spaceID:"",
    moduleID: "",
    userID: "",
    isOpen: "",
    year_group: "",
    isActive: "",
	
    /*create buzz sapce request which takes in the users login details and moduleID and creates a login request to recieve a userID*/			
    createBuzzSpaceRequest: function(_username, _password, _moduleID)
    {
        this.userID = loginRequest(_username, _password);
        this.moduleID = _moduleID;
	var today = new Date();    
        this.year_group = today.getFullYear();

    },


    /*Critical main function that checks for all the preconditions for the BuzzSpace to be created.
    *It then returns a service by creating a BuzzSpace and that a root thread has been created for BuzzSpace*/
    createBuzzSpace: function (createBuzzSpaceRequest) {


        try {
            if (this.getBuzzSpace(_moduleID) == false) {

                if(this.getActiveModulesForYear(_year_group) == true)
                {
                    if(this.getUserRoleForModule(_userID) == true)
                    {
                        this.storeBuzzSpace();
                        this.registerOnSpace(_userID);
                        this.assignAdministrator(_userID);
                        this.submitPost();
                    }
                    else{
                        throw "The user is not authorised to create a BuzzSpace";
                    }
                }
                else{
                    throw "The Module is not active for this year";
                }
            }
            else{
                throw "Buzz Space Already Exists";
            }
        }
        catch(err){
            print(err.message);
        }
    },


    /*closes a buzz space and renders it inactive*/
    closeBuzzSpace: function()
    {
            this.isOpen = false;
    },

    getBuzzSpaceRequest: function(_moduleID)
    {
        var databaseUrl = "db";
        var collections = ["BuzzSpaces"];
        var db = require("mongojs").connect(databaseUrl, collections);


        this.spaceID = db.users.get()//need to query mongoDB for the buzzSpace of a certain module

        return _spaceID;
    },

    /*Provides a persistent services provided by a JPA-compliant entitymManager to select the BuzzSpace*/
    getBuzzSpace: function (_moduleID) {

        if(getBuzzSpaceRequest(_moduleID) != null)
        {
            return true;//If it exists return true
        }
        else
        {
            return false;//else if it doesn't exist therefore the spaceID is null return false
        }

    },

    

    //Gets all the active modules from CSDS Adapter for that specific year and semester
    getActiveModulesForYear: function (_year_group) {

        if(getActiveModulesForYearRequest(_year_group) == "Lecture")
            return false; //If the Module is not active for that particular year and semester return false
        else
            return true;//else-if the Module is active for that year return true


    },

    /*Connects with the CSDataSources adapter to get the user roles for the module, this function is implemented by the buzzDataSource team e*/
    getUsersRolesForModule: function (_userId) {

        /*if(_userId == "Lecturer")
            return false; //check to see if the passed user Id is a lecturer, if it is not return false
        else
            return true;//if the passed user is a lecture return true*/

    },

    /*Provides a persistent services provided by a JPA-compliant entitymManager to store the BuzzSpace*/
    storeBuzzSpace: function () {

        var databaseUrl = "db";
        var collections = ["BuzzSpaces"];
        var db = require("mongojs").connect(databaseUrl, collections);


        db.users.save({CreateBuzzSpaceResult()}, function(err, saved) {
            if( err || !saved ) console.log("Space not saved");
            else console.log("Space saved");
        });

    },

    /*Creates a profile on buzz space for that user*/
    registerOnSpace: function (_userId) {
        /*register lecturer on BuzzSpace*/
    },

    /*The lecurer is assigned to the administrator of the space can later assign other administrators*/
    assignAdministrator: function (_userId) {

    },

    /*Create the root thread for BuzzSpace*/
    submitPost: function (_moduleID) {

    },

    registerOnBuzzSpaceRequest: function()
    {
        var userID = require('login');
        return userID;
    },

    registerOnBuzzSpace: function(registerOnBuzzSpaceRequest)
    {
        if(!this.isOpen)
            return new Error("Buzz space not active");
        else if(registerOnBuzzSpaceRequest)
            return new Error("User not authorized to use this buzz space");
        else if(this.isOpen && getProfileForUser(registerOnBuzzSpaceRequest)!= "No such user")
            return getProfileForUser(registerOnBuzzSpaceRequest);
        else
            return new ProfileData();
    },

    //ProfileData constructor
    ProfileData: function()
    {
        var userNameForBuzzSpace;
        var photo;
        var signature;
    },

    //gets the user profile
    getProfileForUser: function(user)
    {
        if(user)
            return user.ProfileData();
        else
            return new Error("No such user");
    }


};
