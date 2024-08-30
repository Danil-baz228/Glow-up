const Sale = require('../models/Sale');

const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSales
}