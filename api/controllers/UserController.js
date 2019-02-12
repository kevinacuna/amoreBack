/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

  loginTestDB: async (req, res) => {
    let newUser = {
      name: req.body.name,
      lastname: 'guapis',
      email: 'prueba@correo.com',
      password: '12345dfg'
    };
    let name = await User.create(newUser).fetch();
    return res.send(name);
  },

  signup: async (req, res) => {
    let replacedAge = req.body.age.replace("-", "/");
    let today = new Date();
    let birthDate = new Date(replacedAge);
    let ageCAL = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageCAL--;
    }
    const {
      name, email, password, gender, lookingForGender, major, relationshipStatus, instagram
    } = req.body;

    const newUserInfo = {
      name, gender, lookingForGender, major,
      relationshipStatus, email, password, instagram,
      profilePhoto: 'default.png',
      username: req.body.email.split("@")[0],
      age: ageCAL
    };
    const findUser = await User.findOne({email});

    if(!findUser){
      req.file('profilePhoto').upload({
        dirname: require('path').resolve(sails.config.appPath, '/profile_pics')
      }, async function (err, uploadedFiles) {
        let newUser;
        if (!err && uploadedFiles[0] !== undefined && uploadedFiles[0] !== null) {
          newUserInfo.profilePhoto =  uploadedFiles[0].fd.split("\\")[2];
          newUser = await User.create(newUserInfo).fetch();
          return res.send(newUser);
        } else {
          newUser = await User.create(newUserInfo).fetch();
          return res.send(newUser);
        }
      });
    }
    else{
      return res.send({error: "error"});
    }
      
  },

  loginGoogle: async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({email});
    let resJSON = {};
    if(!findUser){
      resJSON = {
        user: 'No user found',
        type: 'new'
      };
    }
    else{
      resJSON = {
        user: findUser,
        type: 'old'
      };
      
    }
    return res.send(resJSON);
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    let loggedUser = await User.findOne({ username, password });
    let loggedUserTaste = await Taste.findOne(loggedUser.email);
    if(!loggedUserTaste){
      loggedUser.taste = "no taste";
    }
    else{
      loggedUser.taste = loggedUserTaste;
    }
    return res.send(loggedUser);
  },
  getUser: async (req, res) => {
    const { email } = req.body;
    let loggedUser = await User.findOne({ email });
    let loggedUserTaste = await Taste.findOne({ email });
    if(!loggedUserTaste){
      loggedUser.taste = "no taste";
    }
    else{
      loggedUser.taste = loggedUserTaste;
    }
    return res.send(loggedUser);
  },
  addInfoToUser: async (req, res) => {
    const { age, gender, major, relationshipStatus, profilePhoto } = req.body;
    let newInfoToAdd = {
      age, gender, major, relationshipStatus, profilePhoto
    };
    const updatedUser = await User.updateOne({ email }).set(newInfoToAdd).fetch();
    return res.send(updatedUser);
  },

  updateProfilePhoto: async (req, res) => {
    const { email } = req.body;
    req.file('profilePhoto').upload({
      dirname: require('path').resolve(sails.config.appPath, '/profile_pics')
    }, async function (err, uploadedFiles) {
      if (err) return res.serverError(err);

      console.log(uploadedFiles);
      const newName =  uploadedFiles[0].fd.split("\\")[2];
      const newPhoto = await User.update({ email }).set({profilePhoto: newName}).fetch();
      return res.send(newPhoto);
    });
  },

};
