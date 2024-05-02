import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user stauts to aaccept messages",
        },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("failde to update user status ");
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept message",
      },
      { status: 400 }
    );
  }
}

export async function GET(request:Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
try {
    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }
    const userId = user._id;
    const foundUser=await UserModel.findById(userId)
    if(!foundUser){
      return Response.json(
        {
          success:false,
          message:"User not found "
        },
        {status:401}
      )
    }
    return Response.json(
      {
        success:false,
        message:foundUser.isAcceptingMessage
      },
      {status:201}
    )
} catch (error) {
  console.log("failde to update user status ");
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept message",
      },
      { status: 400 }
    );
}

}