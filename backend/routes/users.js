const express = require("express");
const { checkIfUsernameExists, postUser, getUserPublicInformation, getUserRoles, updateUser, checkIfAnonUsernameExists, getProfessionals } = require("../db/authControllers");
const bcrypt = require("bcrypt");
const router = express.Router();
const { authenticateToken } = require("../utilities/authorization");
const chat = require("../utilities/chat");
const { faker } = require("@faker-js/faker");

//Register endpoint
router.post("/", async (req, res) => {
  var { username, password, email, full_name, branch, current_status, age_group, gender, education_level, phone_number, about_you, personal_goals, is_professional, is_anonymous, roles } = req.body;

  if (roles === undefined) roles = [6];

  if (username === undefined || password === undefined)
    res.send(400).json("Bad request");

  const userExists = await checkIfUsernameExists(username);
  // const generateAnonUser = async () => {
    
  //   const exists = true;
  //   while(exists){
  //     let anonUser = `anon${faker.random.numeric(8)}`;
  //     const exists = await checkIfAnonUsernameExists(anonUser);
  //     console.log(anonUser);
  //   }
  //   return anonUser;

  // }

  if (!userExists) {
    return bcrypt.hash(password, 12, (err, hash) => {
      const user = {
        username: username,
        password: hash,
        full_name: full_name,
        email: email ? email : "",
        branch: branch,
        current_status: current_status ? current_status : "",
        age_group: age_group ? age_group : "",
        gender: gender,
        education_level: education_level ? education_level : "",
        phone_number: phone_number ? phone_number : "",
        about_you: about_you ? about_you : "",
        personal_goals: personal_goals ? personal_goals : { personal_goals: [] },
        is_anonymous: is_anonymous ? is_anonymous : false,
        is_professional: is_professional ? is_professional : false,
        is_verified: false,
        anon_username: `anon${faker.random.numeric(8)}`
      };

      postUser(user, roles)
        .then((data) => {
          chat.createChatUser(user);
          return res.status(201).send(data);
        })
        .catch((err) => {
          console.error(err);
          return res.send(err);
        });
    });
  } else {
    res.status(400).send('Username taken!')
  }

  return res.status(500).send("something went wrong.");
});
router.get('/professionals', authenticateToken, async (req, res) => {
  const data = await getProfessionals();
  const promises = await data.map(user => getUserRoles(user.id).then(roles => ({publicData: user, roles})));
  const users = await Promise.all(promises);
  return res.json(users);
})

router.get('/:username', authenticateToken, async (req, res) => {
  const data = await getUserPublicInformation(req.params.username);
  const roles = await getUserRoles(data[0].id);
  return res.send({ publicData: data[0], roles });
})

router.patch('/:username/anonymous', authenticateToken, async (req, res) => {
  const data = await updateUser(req.params.username, req.body);
  console.log(data);
  return res.json(data);
})



module.exports = router;
