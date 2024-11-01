const Service = require('../models/Service');

const searchServices = async (req, res) => {
    try {
        const { term, categories, minPrice, maxPrice } = req.query;

        // Построение условий поиска
        const whereClause = {};

        // Поиск по названию и описанию
        if (term) {
            whereClause[Op.or] = [
                { title: { [Op.iLike]: `%${term}%` } },
                { description: { [Op.iLike]: `%${term}%` } }
            ];
        }

        // Фильтр по категориям
        if (categories) {
            const categoryIds = categories.split(',').map(Number);
            whereClause.category_id = {
                [Op.in]: categoryIds
            };
        }

        // Фильтр по цене
        if (minPrice || maxPrice) {
            whereClause.price = {};
            if (minPrice) whereClause.price[Op.gte] = minPrice;
            if (maxPrice) whereClause.price[Op.lte] = maxPrice;
        }

        // Выполнение поиска
        const services = await Service.findAll({
            where: whereClause,
            include: [{
                model: Category,
                attributes: ['name']
            }],
            order: [['title', 'ASC']]
        });

        res.json(services);
    } catch (error) {
        console.error('Error searching services:', error);
        res.status(500).json({ 
            message: `An error occurred while searching for services: ${error.message}`
        });
    }
};

const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.update(req.body);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    searchServices
};