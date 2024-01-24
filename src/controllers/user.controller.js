import { ApiErrors } from '../utils/ApiErrors.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const  registerUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "Chai aur code"
  })
  //get user details from frontend
  //validation - not empty
  //check if user alreday exist
  //check for images, check for avatar
  //upload them to cloudinary
  //create user object - create entyr in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  // const { fullName, email, username, password } = req.body;
  // if (
  //   [fullName, email, username, password].some((field) => field?.trim === '')
  // ) {
  //    throw new ApiErrors(400, "All fields are required.")
  // }
});

export { registerUser };
