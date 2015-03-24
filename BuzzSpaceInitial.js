/**
 * Created by Rhetoricalquiz on 3/21/2015.
 */


//Class that repsresents a space

var BuzzSpace;
BuzzSpace = {
    moduleID: "",
    isOpen: "",
    academicYear: "",
    activeSpaces:"",


    /**
     *
     * @constructor
     * This is the Constructor for the space class
     */

    BuzzSpace: function(){
        this.moduleID = "";
        this.isOpen = "";
        this.academicYear = "";
    },


    /**
     *
     * @param _moduleID
     * represents the module code
     * @param _academicYear
     * represents the academic year for which the space is to be created
     * @param _userID
     * the identification of the user who spawns the request
     *
     * Function simply creates a new space if the user was authorised
     */

    createBuzzSpace: function (_moduleID ,_academicYear,_userID ) {

        /**
         * Register the user first  onto the space created
         */
            registerUser(_userID);
        /**
         * Make the user an admin for the space created
         */
            createAdministrator(_userID);

        /**
         * Store space to persistance
         */
            storeSpace();
    },


    BuzzSpaceExistsException: function () {

        print("Buzz Space Already Exists");
    },


    registerOnSpace: function () {

    },


    createRootThread: function () {

    },

    createBuzzSpaceRequest: function () {

        userRole = getUsersRolesForModule(_userId);
        try {
                if(userRole != "Lecturer")
                    throw "You are not authorized to create a BuzzSpace";

        }
        catch(err)
        {
            print(err.message);
        }

        storeBuzzSpace(_moduleID, _isOpen ,_academicYear);


    },


    storeBuzzSpace: function (_moduleID, _isOpen ,_academicYear) {

        var databaseUrl = "db";
        var collections = ["BuzzSpaces"];
        var db = require("mongojs").connect(databaseUrl, collections);


        db.users.save({CreateBuzzSpaceResult()}, function(err, saved) {
            if( err || !saved ) console.log("Space not saved");
            else console.log("Space saved");
        });

    },

    getActiveModules: function () {

        // get modules from CSDS ADApter

        activeModule = getActiveModule();

        try {
            while (activeModules.hasNext()) {
                if (activeModules.moduleID == moduleID) {
                    if(activeModules.isActive() == false)
                        throw "The module you are trying to access is not active.";
                }
            }
        }
        catch(err)
        {
            print(err.message);
        }

        return true;

    },

    getUsersRolesForModule: function () {

        // get user roles from CSDS Adapter

    },

    assignAdministrator: function () {



    },

    getBuzzSpace: function (_moduleID) {

        activeSpaces = getActiveSpaces();
        try {
            while (activeSpaces.hasNext()) {
                if (activeSpaces.moduleID == moduleID) {
                    throw "Buzz Space Already Exists";
                }
            }
        }
        catch(err)
        {
            print(err.message);
        }

        return false;
    },




    getModuleId: function(){
        return this.moduleID;
    } ,

    getAcademicYear: function(){
        return this.academicYear;
    } ,

    isActive: function(){

        return this.isOpen;

    },

    deleteBuzzSpace: function () {

        deleteMongoPersistence();


    }


};
