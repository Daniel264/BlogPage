import axios from "axios";
import { MongoClient } from "mongodb";

const MONGODB_API_KEY = "2590682f-b507-440d-a2c5-4d61e41b040c";
const MONGODB_GROUP_ID = "66cce99b451e7d71669aef54";
const MONGODB_CLUSTER_NAME = "Cluster0";

interface IpifyResponse {
  ip: string;
}

interface WhitelistEntry {
  ipAddress: string;
  comment: string;
}

async function updateIP(): Promise<void> {
  try {
    // Get the current public IP address
    const response = await axios.get<IpifyResponse>(
      "https://api.ipify.org?format=json"
    );
    const currentIP = response.data.ip;

    console.log(`Current IP Address: ${currentIP}`);

    // MongoDB Atlas API URL for adding IP addresses to the whitelist
    const atlasUrl = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${MONGODB_GROUP_ID}/accessList`;

    const whitelistEntry: WhitelistEntry[] = [
      {
        ipAddress: `${currentIP}/32`,
        comment: "Automatically updated by script",
      },
    ];

    // Add the current IP to the whitelist
    const addIPResponse = await axios.post(atlasUrl, whitelistEntry, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MONGODB_API_KEY}`,
      },
    });

    console.log(
      "IP address added to MongoDB Atlas whitelist:",
      addIPResponse.data
    );
  } catch (error: any) {
    console.error(
      "Error updating IP address:",
      error.response?.data || error.message
    );
  }
}

updateIP();
