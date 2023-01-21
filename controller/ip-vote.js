const bcrypt = require("bcrypt");

const hasIpVoted = async (ipAddress, listOfIps) => {
    const ips = Array.isArray(listOfIps) ? listOfIps : [];
    for (const ip of ips) {
      if(await bcrypt.compare(ipAddress, ip)) {
        return true;
      }
    }
    return false;
}

module.exports = hasIpVoted;
