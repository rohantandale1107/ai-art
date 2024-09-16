const express= require("express");
const{
    registerController,
    loginController,
    logoutController,
    refetchUserController
}=require("../controllers/authController")
const router= express.Router();

//register
router.post("/register",registerController)

//login
router.post("/login",loginController)

//logout
router.post("/logout",logoutController)

//fetch current user
router.post("/refetch",refetchUserController)

module.exports = router;
