const {State, City, Salon, Master} = require('../models/Relations');

const saveMasterAddress = async (req, res) => {
    const { name, address, zip_code, cityName, stateName, master_id } = req.body;

    try {
        let state = await State.findOne({ where: { name: stateName } });
        if (!state) {
            state = await State.create({ name: stateName });
        }

        let city = await City.findOne({ where: { name: cityName, state_id: state.state_id } });
        if (!city) {
            city = await City.create({ name: cityName, state_id: state.state_id });
        }

        const master = await Master.findByPk(master_id);

        const salon = await Salon.create({
            name: name,
            address: address,
            zip_code: zip_code,
            city_id: city.city_id
        });

        await master.addSalon(salon);
        res.status(200).json({ message: 'Address saved successfully', salon });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).json({ message: 'An error occurred while saving the address', error });
    }
};

module.exports = saveMasterAddress;