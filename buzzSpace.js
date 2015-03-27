/**
 * @author Godfrey Mathe, u13103394
 * @author Semaka Malapane, u13081129
 * @author Joseph Potgieter, u12003672
 * @author Tsepo Ntsaba, u10668544
 * @author Tebogo Seshibe, u13181442
 * @version 0.0.6
 */


var csds = require( "./csds")

/**
 *
 * @description BuzzSpace class containing the resuired functions in the main specifications
 */
var BuzzSpace =
{
    //authorization: require( "./Authorization"),
    moduleID: "",
    isOpen: false,
    academicYear: "",
    profiles: [],
    rootThread: null,

    /**
     *
     *  @description Simple login function
     *  @param username The user id
     *  @param password The password of the user
     */
    login: function( _username, _password )
    {
        try
        {
            var loginRequest = { user_id: _username, password: _password };
            var result = csds.login( loginRequest );
            console.log( "Result: " + result );
        }
        catch( e )
        {
            console.log( e );
        }
    },

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

        csds.createBuzzSpace( _moduleID );
        BuzzSpace.registerOnBuzzSpace(_userID, _moduleID);
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

    createBuzzSpaceRequest: function (_userID, _academicYear, _moduleID ) {
        var user = csds.getUserProfile(_userID);
        var userValid = user != null;

        if (userValid)
        {
            var userRoleValid = user.admin;
            var spaceExists = csds.getBuzzSpace(_moduleID) != null; //csds.spaceExists(_moduleID); //return true if space exists else null

            if (userRoleValid )
            {
                if( !spaceExists) {
                    BuzzSpace.createBuzzSpace(_moduleID, _academicYear, _userID);
                }
                else
                    console.log( "BuzzSpace \"" + _moduleID + "\" exists" );
            }

            else
                console.log( "User \"" + _userID + "\" is not authorized");
        }
        else
            console.log( "User \"" + _userID + "\" does not exist");
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


        db.users.save(CreateBuzzSpaceResult, function(err, saved) {
            if( err || !saved ) console.log("Space not saved");
            else console.log("Space saved");
        });

    },

    /**
     * Authorization module intercepts with this function to validate a user
     * @param _userID stores the user ID
     */

    // Remove this - validation will be done with an Authentication Intercept
    validateUser: function (_userID) {

        //Authorization module to be included to allow for this method

    },

    /**
     *Authorization module intercepts with this function to validate a users role
     * @param _userID stores the user ID
     */
    //Remove this - We can assume that by the time this function is called - the user is valid (due to intercepts)
    userRoleValid: function (_userID) {

        // get user roles from CSDS Adapter
        // Authorization module to be included to allow for this method

    },


    spaceExists: function (_moduleID) {
        // Missing implementation
        // get active spaces from MongoDB
        // Authorization doesn't have an bearing on if a space exits or not? If I am not mistaking
        // Authorization module to be included to allow for this method

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

    // Update DB
    registerOnSpace: function (userID,_moduleID) {

        users.add(userID,_moduleID);
    },

    /**
     * Threads module to be required for this method hat creates a root thread for the space
     */
    // Use a mock Thread Object
    // Please implement
    createRootThread: function () {

    },

    /**
     *
     *  @description Return a user object
     *  @param username The user id
     */
    getUserProfile: function( username )
    {
        //return csds.getUserProfile( username );
        var user = { user_id: "Tsepho", password: "1234" };
        return user;
    },

    /**
     *
     *  @description Function used to set a buzzspace inactive
     *  @param username The user id
     *  @module_id The id of the module being closed
     */
    closeBuzzSpace: function( user_id, module_id )
    {
        var user = csds.getUserProfile( user_id );
        if( user == null )
            console.log( "User \"" + user_id + "\" does not exist" );

        else if( user.admin )
        {
            var space = csds.getBuzzSpace( module_id );

            if( space == null )
                console.log( "Module \"" + module_id + "\" does not exist" );
            else
            {
                space.isOpen = false;
                console.log( "BuzzSpace \"" + module_id + "\" is now closed" );
            }
        }

        else
           console.log( "User \"" + user_id + "\" is not authorized in \"" + module_id + "\"");
    },

    /**
     *
     *  @description Function used to register a user to a buzzspace
     *  @param username The user id
     *  @module_id The id of the module the user is registering to
     *  @param module_id The password of the user
     */
    registerOnBuzzSpace: function( username, module_id )
    {
        var space = csds.getBuzzSpace( module_id );

        if( space == null )
            console.log( "Module " + module_id + " does not exist" );

        else if( space.isOpen )
        {
            var user = BuzzSpace.getUserProfile( username );

            if( user === null )
                console.log( "User ID \"" + username + "\" does not exist" );

            try
            {
                //space.registerOnBuzzSpace( username );
                console.log( "Registered " + username +" for " + module_id );
            }
            catch( e )
            {
                throw e;
            }
        }

        else
            console.log( "BuzzSpace \"" + module_id + "\" is closed" );
    }
};

module.exports.login = BuzzSpace.login;
module.exports.createBuzzSpace = BuzzSpace.createBuzzSpaceRequest;
module.exports.closeBuzzSpace = BuzzSpace.closeBuzzSpace;
module.exports.registerOnBuzzSpace = BuzzSpace.registerOnBuzzSpace;
module.exports.getUserProfile = BuzzSpace.getUserProfile;
