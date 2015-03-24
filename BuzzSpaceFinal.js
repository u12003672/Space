/**
 * Created by Godfrey Mathe on 3/21/2015.
 */


//Class that represents a space

var BuzzSpace;
BuzzSpace = {
    moduleID: "",
    isOpen: "",
    academicYear: "",
    activeSpaces:"",
    _userValid:"",
    _userRoleValid:"",
    _spaceExists:"",
    admin:"",
    users:"",


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
            assignAdministrator(_userID);

        /**
         * Store space to persistance
         */
            storeBuzzSpace();
    },


    /**
     *
     * @BuzzSpaceExistsException
     *
     * Throw this exception when a buzz space already exists with same module id
     */
    BuzzSpaceExistsException: function () {

        print("Buzz Space Already Exists");
    },


    /**
     * Function that creates a request
     * and checks if the user is authorised to create a space and wether a space for the moduleID does not exist yet
     * @param _userID stores the ID of the user
     * @param _moduleID represents the module code
     */

    createBuzzSpaceRequest: function (_userID,_moduleID) {

        this.userValid = validateUser(_userID); //return true if the user is recognised , Done by authorization through inteceptors
        this.userRoleValid = userRoleValid(_userID); // check to return true see if the user is a lecturer else return null
        this.spaceExists = spaceExists(_moduleID); //return true if space exists else null

        if(userValid)
        {
            if(userRoleValid){
                if(!spaceExists)
                {
                    createBuzzSpace(_moduleID ,_academicYear,_userID );
                }
            }

        }

    },


    /**
     * This function simply stores the created space to the database
     * @param _moduleID represents the module code
     * @param _isOpen boolean to check if space is Active
     * @param _academicYear the year for which the space is to be created
     */
    storeBuzzSpace: function (_moduleID, _isOpen ,_academicYear) {

        var databaseUrl = "db";
        var collections = ["BuzzSpaces"];
        var db = require("mongojs").connect(databaseUrl, collections);


        db.users.save({CreateBuzzSpaceResult()}, function(err, saved) {
            if( err || !saved ) console.log("Space not saved");
            else console.log("Space saved");
        });

    },

    /**
     * Authorization module intercepts with this function to validate a user
     * @param _userID stores the user ID
     */
    validateUser: function (_userID) {

    //Authorization module to be included to allow for this method

    },

    /**
     *Authorization module intercepts with this function to validate a users role
     * @param _userID stores the user ID
     */

    userRoleValid: function (_userID) {

        // get user roles from CSDS Adapter
        // Authorization module to be included to allow for this method

    },


    spaceExists: function (_moduleID) {

        // get active spaces from MongoDB
        // Authorization module to be included to allow for this method

    },

    assignAdministrator: function (_userID) {

        this.admin = _userID;

    },


    /**
     * getter function for moduleID
     * @returns {string} returns the module ID
     */
    getModuleId: function(){
        return this.moduleID;
    } ,


    /**
     * getter function for the academic year
     * @returns {string} returns the module ID
     */
    getAcademicYear: function(){
        return this.academicYear;
    } ,

    /**
     * function returns true if space is active
     * @returns {boolean} returns true or false
     */
    isActive: function(){

        return this.isOpen;

    },

    /**
     * This function deletes the space from MongoDb
     * @param _moduleID represents the module code
     */

    deleteBuzzSpace: function (_moduleID) {

        deleteFromDb(_moduleID);

    },


    /**
     *Function simply adds the new user to a list of registered users
     * @param userID represents the user ID
     * @param _moduleID represents the module code
     */
    registerOnSpace: function (userID,_moduleID) {

            users.add(userID,_moduleID);
    },

    /**
     * Threads module to be required for this method hat creates a root thread for the space
     */
    createRootThread: function () {

    },


};
