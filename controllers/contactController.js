const Contact = require('../models/contactModel');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const FRESHSALES_API_KEY = process.env.FRESHSALES_API_KEY;
const FRESHSALES_DOMAIN = process.env.FRESHSALES_DOMAIN;

// Create Contact
exports.createContact = async (req, res) => {
    // Request: POST /createContact
    // Parameters: first_name, last_name, email, mobile_number, data_store (either 'CRM' or 'DATABASE')

    const { first_name, last_name, email, mobile_number, data_store } = req.body;

    if (!['CRM', 'DATABASE'].includes(data_store)) {
        return res.status(400).json({ error: 'Invalid data_store value' });
    }

    if (data_store === 'DATABASE') {
        try {
            // Saving contact to MongoDB
            const contact = await Contact.create({ first_name, last_name, email, mobile_number });
            return res.status(201).json({ message: 'Contact created in Database', contact });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to create contact in Database', details: err.message });
        }
    } else {
        try {
            // Requesting FreshSales API to create contact
            const response = await axios.post(`https://none-779235531083991903.freshsales.io/api/contacts
`, {
                first_name,
                last_name,
                email,
                mobile_number,
            }, {
                headers: { Authorization: `Token token=${FRESHSALES_API_KEY}` },
            });
            return res.status(201).json({ message: 'Contact created in CRM', data: response.data });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to create contact in CRM', details: err.message });
        }
    }
};

// Get Contact
exports.getContact = async (req, res) => {
    // Request: POST /getContact
    // Parameters: contact_id, data_store (either 'CRM' or 'DATABASE')

    const { contact_id, data_store } = req.body;

    if (!['CRM', 'DATABASE'].includes(data_store)) {
        return res.status(400).json({ error: 'Invalid data_store value' });
    }

    if (data_store === 'DATABASE') {
        try {
            // Fetching contact from MongoDB
            const contact = await Contact.findById(contact_id);
            if (!contact) return res.status(404).json({ error: 'Contact not found' });
            return res.status(200).json(contact);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to retrieve contact from Database', details: err.message });
        }
    } else {
        try {
            // Requesting FreshSales API to fetch contact by ID
            const response = await axios.get(`https://${FRESHSALES_DOMAIN}/api/contacts/${contact_id}`, {
                headers: { Authorization: `Token token=${FRESHSALES_API_KEY}` },
            });
            return res.status(200).json(response.data);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to retrieve contact from CRM', details: err.message });
        }
    }
};

// Update Contact
exports.updateContact = async (req, res) => {
    // Request: POST /updateContact
    // Parameters: contact_id, new_email, new_mobile_number, data_store (either 'CRM' or 'DATABASE')

    const { contact_id, new_email, new_mobile_number, data_store } = req.body;

    if (!['CRM', 'DATABASE'].includes(data_store)) {
        return res.status(400).json({ error: 'Invalid data_store value' });
    }

    if (data_store === 'DATABASE') {
        try {
            // Updating contact in MongoDB
            const updatedContact = await Contact.findByIdAndUpdate(
                contact_id,
                { email: new_email, mobile_number: new_mobile_number },
                { new: true }
            );
            if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });
            return res.status(200).json({ message: 'Contact updated in Database', updatedContact });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to update contact in Database', details: err.message });
        }
    } else {
        try {
            // Requesting FreshSales API to update contact
            const response = await axios.put(`https://${FRESHSALES_DOMAIN}/api/contacts/${contact_id}`, {
                email: new_email,
                mobile_number: new_mobile_number,
            }, {
                headers: { Authorization: `Token token=${FRESHSALES_API_KEY}` },
            });
            return res.status(200).json({ message: 'Contact updated in CRM', data: response.data });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to update contact in CRM', details: err.message });
        }
    }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
    // Request: POST /deleteContact
    // Parameters: contact_id, data_store (either 'CRM' or 'DATABASE')

    const { contact_id, data_store } = req.body;

    if (!['CRM', 'DATABASE'].includes(data_store)) {
        return res.status(400).json({ error: 'Invalid data_store value' });
    }

    if (data_store === 'DATABASE') {
        try {
            // Deleting contact from MongoDB
            const deletedContact = await Contact.findByIdAndDelete(contact_id);
            if (!deletedContact) return res.status(404).json({ error: 'Contact not found' });
            return res.status(200).json({ message: 'Contact deleted from Database' });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to delete contact from Database', details: err.message });
        }
    } else {
        try {
            // Requesting FreshSales API to delete contact
            const response = await axios.delete(`https://${FRESHSALES_DOMAIN}/api/contacts/${contact_id}`, {
                headers: { Authorization: `Token token=${FRESHSALES_API_KEY}` },
            });
            return res.status(200).json({ message: 'Contact deleted from CRM', data: response.data });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to delete contact from CRM', details: err.message });
        }
    }
};
