import { ApiErrors } from '../utils/ApiErrors.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user alreday exist
  //check for images, check for avatar
  //upload them to cloudinary
  //create user object - create entyr in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullName, email, username, password } = req.body;
  console.log("Req.body", req.body)
  console.log('email', email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === '')
  ) {
    throw new ApiErrors(400, 'All fields are required');
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiErrors(409, 'User with email or username already exists');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;
  console.log("req.files", req.files)

  let coverImagelocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
     coverImagelocalPath = req.files?.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiErrors(400, 'Avatar file is required');
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagelocalPath);

  if (!avatar) {
    throw new ApiErrors(400, 'Avatar file is required');
  }

  const user = await User.create({fullName, avatar: avatar.url, coverImage: coverImage?.url || "", email, password, username: username?.toLowerCase()});
  
  const createUser = await User.findById(user._id).select("-password -refreshToken");

  if(!createUser){
    throw new ApiErrors(500, "Something went wrong");
  }

  return res.status(201).json(
    new ApiResponse(200, createUser, "User registered successfully")
  )

});

export { registerUser };
