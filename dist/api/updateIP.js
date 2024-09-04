import axios from "axios";
const MONGODB_API_KEY = "2590682f-b507-440d-a2c5-4d61e41b040c";
const MONGODB_GROUP_ID = "66cce99b451e7d71669aef54";
const MONGODB_CLUSTER_NAME = "Cluster0";
async function updateIP() {
    try {
        // Get the current public IP address
        const response = await axios.get("https://api.ipify.org?format=json");
        const currentIP = response.data.ip;
        console.log(`Current IP Address: ${currentIP}`);
        // MongoDB Atlas API URL for adding IP addresses to the whitelist
        const atlasUrl = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${MONGODB_GROUP_ID}/accessList`;
        const whitelistEntry = [
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
        console.log("IP address added to MongoDB Atlas whitelist:", addIPResponse.data);
    }
    catch (error) {
        console.error("Error updating IP address:", error.response?.data || error.message);
    }
}
updateIP();
