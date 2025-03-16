import connectDB from "@/lib/mongo";
import User from "@/models/user";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {

            await connectDB();

            const { username } = req.query;
            const user = await User.findOne({ username: username });
            if (user) {
                return res.status(403).json({ error: "User already exists" });
            }

            const newUser = new User({ username: username });
            await newUser.save();




        
    
        res.status(200).json({

            username: newUser.username,
            id: newUser._id,
                
            });
        } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
    }