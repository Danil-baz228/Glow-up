const {Salon, City, State, Master} = require('../models/Relations');

const getAllSalons = async (req, res) => {
    try {
        const salons = await Salon.findAll();
        res.status(200).json(salons);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getSalonById = async (req, res) => {
    try {
        const salon = await Salon.findByPk(req.params.id);
        if (!salon) {
            res.status(404).json({message: 'Salon not found'});
        } else {
            res.status(200).json(salon);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createSalon = async (req, res) => {
    try {
        const salon = await Salon.create(req.body);
        res.status(201).json(salon);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateSalon = async (req, res) => {
    try {
        const salon = await Salon.findByPk(req.params.id);
        if (!salon) {
            res.status(404).json({message: 'Salon not found'});
        } else {
            const {name, address, zip_code, cityName, stateName} = req.body;
            const state = await State.findOne({where: {name: stateName}});
            const city = await City.findOne({where: {name: cityName, state_id: state.state_id}});
            await salon.update({name, address, zip_code, city_id: city.city_id});
            res.status(200).json(salon);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteSalon = async (req, res) => {
    try {
        const salon = await Salon.findByPk(req.params.id);
        if (!salon) {
            res.status(404).json({message: 'Salon not found'});
        } else {
            await salon.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getSalonByMasterId = async (req, res) => {
    try {
        const salons = await Salon.findAll({
            include: [{
                model: Master,
                where: { master_id: req.params.id },
                attributes: []
            }, {
                model: City,
                attributes: ['name'],
                include: {
                    model: State,
                    attributes: ['name']
                }
            }]
        });

        if (salons.length > 0) {
            res.status(200).json(salons[0]);
        } else {
            res.status(404).json({ message: 'No salons found for this master' });
        }
    } catch (error) {
        console.error('Error fetching salon:', error);
        res.status(500).json({ message: 'An error occurred while fetching the salon', error });
    }
}

module.exports = {
    getAllSalons,
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getSalonByMasterId
}