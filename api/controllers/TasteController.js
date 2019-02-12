/**
 * TasteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addPreferences: async (req, res) => {
        let taste = {
            preferences: req.body.preferences,
            email: req.body.email
        };
        let newPreference = await Taste.findOrCreate({email: taste.email}, taste);
        return res.send(newPreference);
    },
    addLookinFor: async (req, res) => {
        let taste = {
            lookingFor: req.body.lookingFor,
            email: req.body.email
        };
        let newPreference = await Taste.findOrCreate({email: taste.email}, taste);
        return res.send(newPreference);
    },
    updatePreferences: async (req, res) => {
        let taste = {
            preferences: req.body.preferences,
            email: req.body.email
        };
        let updatedPreferences = await Taste.update({email: taste.email}).set({preferences: taste.preferences}).fetch();
        return res.send(updatedPreferences);
    },
    updateLookingFor: async (req, res) => {
        let taste = {
            lookingFor: req.body.lookingFor,
            email: req.body.email
        };
        let newLookingFor = await Taste.update({email: taste.email}).set({lookingFor: taste.lookingFor}).fetch();
        return res.send(newLookingFor);
    },
    addUserTastes: async (req, res) =>{
        const { email } = req.body;
        let user = await User.find({ email }).limit(1);
        let userPreference = JSON.parse(req.body.preferences);
        if(userPreference.musica == undefined)
            userPreference.musica = [];
        if(userPreference.deportes == undefined)
            userPreference.deportes = [];
        if(userPreference.ocio == undefined)
            userPreference.ocio = [];

        if(!user)
            return res.send({error: "error"});
        else{
            const taste = {
                email: user[0].email,
                lookingForGender: user[0].lookingForGender,
                name: user[0].name,
                major: user[0].major,
                gender: user[0].gender,
                relationshipStatus: user.relationshipStatus,
                preferences: userPreference,
                personality: JSON.parse(req.body.personality),
                lookingFor: JSON.parse(req.body.lookingFor),
            };
            const newTastes = await Taste.create(taste).fetch();
            return res.send(newTastes);
        }
    },
    getUserTastes: async (req, res) =>{
        let tastes = await Taste.find({email: req.body.email});
        return res.send(tastes);
    }
};