const { validateNumber, validateEmail } = require("../../utils/helpers.cjs");

const UserModel = require("../../models/Users.cjs");
function validateUserData(body) {
  if (body) {
    if (!(body?.email && validateEmail(body.email))) {
      return { message: "Email" };
    }
    if (!(body?.number && validateNumber(body.number))) {
      return { message: "Number" };
    }
    if (!body?.name) {
      return { message: "Name" };
    }
    if (
      !(
        body?.hobbies &&
        Array.isArray(body?.hobbies) &&
        body.hobbies.length > 0
      )
    ) {
      return { message: "Hobbies List" };
    }
  } else {
    return { message: "Body of Request" };
  }
  return true;
}
async function updateUser(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        meta: {
          message: "Invalid request",
        },
      });
    }
    let validationRes = validateUserData(req?.body);

    if (typeof validationRes === "object") {
      return res
        .status(400)
        .json({ meta: { message: `Invalid ${validationRes.message}` } });
    }
    await UserModel.findOneAndReplace(id, req.body);
    return res.status(200).json({ meta: { message: "User Updated" }, user });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
}
async function createUser(req, res) {
  try {
    let validationRes = validateUserData(req?.body, res);
    if (typeof validationRes === "object") {
      return res
        .status(400)
        .json({ meta: { message: `Invalid ${validationRes.message}` } });
    }
    const user = new UserModel(req.body);
    await user.save();
    return res.status(201).json({ meta: { message: "User Created" }, user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "error" });
  }
}
async function getAllUsers(req, res) {
  try {
    const usersData = await UserModel.find();
    return res.status(200).json({ meta: { message: "data found" }, usersData });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
}
async function deleteSingle(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        meta: {
          message: "Invalid request",
        },
      });
    }
    await UserModel.findByIdAndRemove(id);
    console.log(id);
    return res.status(200).json({ meta: { message: "user deleted" } });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
}
module.exports = { getAllUsers, deleteSingle, createUser, updateUser };