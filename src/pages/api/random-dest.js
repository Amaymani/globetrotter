import data from '@/data/data.json';

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const count = data.length;
            const randomIndex = Math.floor(Math.random() * count);
            const correctDestination = data[randomIndex];
            

            if (!correctDestination) return res.status(404).json({ error: "No destinations found" });

            let incorrectOptions = data
                .filter((item) => item.city !== correctDestination.city) // Exclude correct answer
                .sort(() => Math.random() - 0.5) 
                .slice(0, 3); 

            let options = incorrectOptions.map((item) => item.city);
            options.push(correctDestination.city); // Add correct answer
            options = options.sort(() => Math.random() - 0.5); // Shuffle again

            res.status(200).json({
                  correctDestination: correctDestination,
                  options: options,
                });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}