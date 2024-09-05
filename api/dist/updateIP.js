"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const MONGODB_API_KEY = "2590682f-b507-440d-a2c5-4d61e41b040c";
const MONGODB_GROUP_ID = "66cce99b451e7d71669aef54";
const MONGODB_CLUSTER_NAME = "Cluster0";
function updateIP() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the current public IP address
            const response = yield axios_1.default.get("https://api.ipify.org?format=json");
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
            const addIPResponse = yield axios_1.default.post(atlasUrl, whitelistEntry, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${MONGODB_API_KEY}`,
                },
            });
            console.log("IP address added to MongoDB Atlas whitelist:", addIPResponse.data);
        }
        catch (error) {
            console.error("Error updating IP address:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        }
    });
}
updateIP();
