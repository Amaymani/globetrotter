import { v4 as uuidv4 } from "uuid";

let invites = {};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, score } = req.body;
    
    if (!username || score === undefined) {
      return res.status(400).json({ error: "Missing username or score" });
    }

    const inviteId = uuidv4();
    const inviteLink = `${process.env.NEXT_PUBLIC_SITE_URL}/invite/${inviteId}`;

    invites[inviteId] = { username, score };

    res.status(200).json({ inviteLink });
  } else if (req.method === "GET") {
    const { inviteId } = req.query;

    if (!inviteId || !invites[inviteId]) {
      return res.status(404).json({ error: "Invite not found" });
    }

    res.status(200).json(invites[inviteId]);
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
