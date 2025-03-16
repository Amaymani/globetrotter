import connectDB from "@/lib/mongo";
import Destination from "@/models/destination";

export default async function handler(req, res) {
  await connectDB(); // Ensure DB connection

  if (req.method === "GET") {
    try {
      const data = await Destination.find();

      if (data.length === 0) {
        return res.status(404).json({ error: "No destinations found" });
      }

      const count = data.length;
      const randomIndex = Math.floor(Math.random() * count);
      const correctDestination = data[randomIndex];

      let incorrectOptions = data
        .filter((item) => item.city !== correctDestination.city) // Exclude correct answer
        .sort(() => Math.random() - 0.5) 
        .slice(0, 3); 

      let options = incorrectOptions.map((item) => item.city);
      options.push(correctDestination.city); // Add correct answer
      options = options.sort(() => Math.random() - 0.5); // Shuffle again

      res.status(200).json({
        correctDestination,
        options,
      });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
