import { Request, Response } from "express";
import User from "../db/models/user";
import { encryptPassword } from "../utils/password";

export const getUserById = async(req: Request, res: Response): Promise<any> => {
    const id = req.params.id
    const user = await User.query().findById(id)
    console.log(user)
    console.log(!user?.is_deleted)
    
    if(!user || user.is_deleted) {
        return res.status(404).json({ message: "user not found"})
    }
  res.json({ message: "success", data: user });
};

export const getAllUsers = async(req: Request, res: Response): Promise<any> => {
    throw new Error("Not implemented")
    const users = await User.query().where('is_deleted', false)
  return res.status(200).json({ message: "get all users", data: users})
};

export const createUser = async(req: Request, res: Response): Promise<any> => {
    const signupReq = req.body
   const exists = await User.query().findOne("email", signupReq.email)

   if(exists) {
     return res.status(409).json({ message: "Email already exists" });  
   }

   const hashedPassword = await encryptPassword(signupReq.password)

   const user = await User.query().insertAndFetch({
     email: signupReq.email,
     password: hashedPassword,
     role: signupReq.role,
     full_name: signupReq.full_name,
   })
  return res.status(200).json({ message: "sucess", data: user });
};

export const updateUser = async(req: Request, res: Response): Promise<any> => {
    const updateUserReq = req.body
    const id = req.params.id

    const user =  await User.query().patchAndFetchById(id, updateUserReq)
  res.status(200).json({ message: "success", data: user });
};

export const deleteUser = async(req: Request, res: Response): Promise<any> => {
    const id = req.params.id

    await User.query().patchAndFetchById(id, {
        is_deleted: true
    })
  res.status(200).json({ message: "success" });
};

