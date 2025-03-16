import connectDB from "@/lib/mongo";
import User from "@/models/user";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "GET") {
        try {
            const { email } = req.query;
            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            if (user.highscore === "undefined") {
                user.highscore = 0;
                await user.save();
            }

        
            res.status(200).json({
                username: user.username,
                email: user.email,
                highscore: user.highscore,
            });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    } 
    
    else if (req.method === "POST") {
        try {
            console.log("bbbbbbbbbb")
            const { email, highscore } = req.body;
            console.log (req.body);

            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            
            if (typeof user.highscore === "undefined") {
                user.highscore = 0;
            }

            if (highscore > user.highscore) {
                const updatedUser = await User.findOneAndUpdate(
                    { email: email }, 
                    { highscore: highscore }, 
                    { new: true } 
                );

                return res.status(200).json({
                    username: updatedUser.username,
                    email: updatedUser.email,
                    highscore: updatedUser.highscore,
                });
            }

            
            return res.status(304).end();
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    } 
    
    else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
