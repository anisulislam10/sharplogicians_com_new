import express from 'express'

import upload from '../Middleware/multer.middleware.js';
import { addTeam, deleteTeam, getTeam, getTeamById, updateTeam } from '../Controllers/teams.controller.js';

const router=express.Router();


//add about us pagge
router.route("/post").post(
    upload.single("image"),
    addTeam
);
router.route("/get").get(getTeam);
router.route("/:id").get(getTeamById);
router.route("/update/:id").put(
    upload.single("image"),
    updateTeam
    
);

router.route("/delete/:id").delete(deleteTeam)

export default router