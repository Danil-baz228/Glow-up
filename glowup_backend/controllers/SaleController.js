const Sale = require('../models/Sale');

const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (!sale) {
            res.status(404).json({ message: 'Sale not found' });
        } else {
            res.status(200).json(sale);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createSale = async (req, res) => {
    try {
        const sale = await Sale.create(req.body);
        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSale = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (!sale) {
            res.status(404).json({ message: 'Sale not found' });
        } else {
            await sale.update(req.body);
            res.status(200).json(sale);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (!sale) {
            res.status(404).json({ message: 'Sale not found' });
        } else {
            await sale.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
}