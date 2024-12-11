const mongoose = require('mongoose');

// Define the audit log schema
const auditLogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model
        required: true
    },
    event_type: {
        type: String,
        required: true, // Event type like login, app selection, tab handling
    },
    event_description: {
        type: String, // Description of the event
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now, // Default to current timestamp
    }
})

// Create and export the model
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
