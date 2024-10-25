const {Portfolio} = require('../models/Relations');

const getPortfolioByMasterId = async (req, res) => {
    try {
        const portfolios = await Portfolio.findAll({ where: { master_id: req.params.master_id } });
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createPortfolio = async (req, res) => {
    try {
        const { master_id, headline, description } = req.body;
        const image_url = `/images/portfolios/${req.file.filename}`;

        const portfolio = await Portfolio.create({ master_id, headline, description, image_url });
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getPortfolioByMasterId,
    createPortfolio
}