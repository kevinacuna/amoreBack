/**
 * MatchmakingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    matchMaking: async (req, res) =>{
        let userTaste = await Taste.findOne({email: req.body.email});
        let everyoneTaste = await Taste.find({gender: userTaste.lookingForGender, email: {"!=": req.body.email}});
        let percentageOfPreferences = 40/(userTaste.preferences.deportes.length + userTaste.preferences.musica.length + userTaste.preferences.ocio.length);
        let percentageOfPersonality = 60/userTaste.lookingFor.length;
        let matchesValues = [];
        everyoneTaste.forEach(singleTaste => {
            let totalUserPoints = 0;
            totalUserPoints += userTaste.lookingFor.filter(value => -1 !== singleTaste.personality.indexOf(value)).length * percentageOfPersonality;
            totalUserPoints += userTaste.preferences.deportes.filter(value => -1 !== singleTaste.preferences.deportes.indexOf(value)).length * percentageOfPreferences;
            totalUserPoints += userTaste.preferences.musica.filter(value => -1 !== singleTaste.preferences.musica.indexOf(value)).length * percentageOfPreferences;
            totalUserPoints += userTaste.preferences.ocio.filter(value => -1 !== singleTaste.preferences.ocio.indexOf(value)).length * percentageOfPreferences;
            singleTaste.percentage = totalUserPoints;
            matchesValues.push(singleTaste);
        });
        let orderedMatches = matchesValues.sort(function(a, b) {
            return  b.percentage < a.percentage;
        });
        if(everyoneTaste.length>20){
            const bestMatches = orderedMatches.slice(Math.max(orderedMatches.length - 20, 1))
            return res.send(bestMatches);
        }
        else{
            const bestMatches = orderedMatches;
            return res.send(bestMatches);
        }
    }
};

