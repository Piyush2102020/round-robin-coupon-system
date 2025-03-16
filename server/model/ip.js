const mongoose = require('mongoose');

const ipSchema = new mongoose.Schema({
    ip: { type: String, required: true}, 
    lastClaimedAt: { type: Date, default: null } 
});

const IpCooldown = mongoose.model('IpCooldown', ipSchema);
module.exports = IpCooldown;
