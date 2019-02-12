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
        let taste = {
            lookingFor: JSON.parse(req.body.lookingFor),
            preferences: JSON.parse(req.body.preferences),
            personality: JSON.parse(req.body.personality),
            email: req.body.email
        };
        let newTastes = await Taste.create(taste);
        return res.send(newTastes);
    },
    getUserTastes: async (req, res) =>{
        let tastes = await Taste.find({email: req.body.email});
        return res.send(tastes);
    }
};