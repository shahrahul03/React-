const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

//

function isNew(createdAt) {
  const oneDay = 24 * 60 * 60 * 1000;
  return new Date() - new Date(createdAt) < oneDay;
}

exports.getAllContact = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, startDate, endDate } = req.query;
    const skip = (page - 1) * limit;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
      };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = {
        $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
      };
    }

    const contacts = await Contact.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const totalContacts = await Contact.countDocuments(query);
    const totalPages = Math.ceil(totalContacts / limit);

    contacts.forEach((contact) => {
      contact.isNew = isNew(contact.date);
    });

    res.json({ contacts, totalPages });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};
