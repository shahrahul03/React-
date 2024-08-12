const Address = require("../models/Address");

// Create a new address
exports.createAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all addresses for a user
exports.getAddressesByUserId = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.params.userId });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an address
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!address) return res.status(404).json({ error: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) return res.status(404).json({ error: "Address not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
