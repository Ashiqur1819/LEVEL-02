import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfileIntoDB(req.body);
    res.status(201).json({
      message: "Profile created successfully",
      profile: result.rows[0],
    });
console.log(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creating profile" });
    console.log(error);
  }
};

export const profileController = {
  createProfile,
};
