import type { Request, Response } from "express";
import { userService } from "./user.service";

// Create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);
    res
      .status(201)
      .json({ message: "User created successfully", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();
    res.status(200).json({ users: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get a single user by ID
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.getSingleUserFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update a user by ID
const getUpdateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getUpdateUserFromDB(
      req.body,
      id as string,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
    console.log(error);
  }
};

// Delete a user by ID
const deleteUserByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUserFromDB(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUpdateUser,
  deleteUserByID,
};
