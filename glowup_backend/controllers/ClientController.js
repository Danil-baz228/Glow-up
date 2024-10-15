const {Appointment, Client, Master, Service, City, Category, Occupation, Review, Salon} = require('../models/Relations');

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getClientById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({message: 'Client not found'});
        } else {
            res.status(200).json(client);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        return client;
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({message: 'Client not found'});
        } else {
            await client.update(req.body);
            res.status(200).json(client);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({message: 'Client not found'});
        } else {
            await client.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addFavoriteMaster = async (req, res) => {
    try {
        const {clientId} = req.params;
        const {master_id} = req.body;
        const client = await Client.findByPk(clientId);
        const master = await Master.findByPk(master_id);
        console.log(clientId, master_id);
        if (!client || !master) {
            return res.status(404).json({message: 'Client or Master not found'});
        }
        await client.addMaster(master);
        res.status(200).json({message: 'Master added to favorites'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const removeFavoriteMaster = async (req, res) => {
    try {
        const {clientId} = req.params;
        const {master_id} = req.body;
        const client = await Client.findByPk(clientId);
        const master = await Master.findByPk(master_id);
        await client.removeMaster(master);
        res.status(200).json({message: 'Master removed from favorites'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getFavoriteMasters = async (req, res) => {
    try {
        // Fetch the client by their ID, including the associated Masters and their details
        const client = await Client.findByPk(req.params.clientId, {
            include: {
                model: Master,
                include: [
                    {
                        model: Occupation, // Include Occupation details
                        attributes: ['name'],
                    },
                    {
                        model: Service, // Include related services to get categories and appointments
                        include: [
                            {
                                model: Category,
                                attributes: ['name'],
                            },
                            {
                                model: Appointment, // Include appointments to get reviews
                                include: {
                                    model: Review,
                                    attributes: ['rating'],
                                },
                            },
                        ],
                    },
                    {
                        model: Salon, // Include salon details
                        include: {
                            model: City, // Include city details
                            attributes: ['name'],
                        },
                        attributes: ['address'],
                    },
                ],
            },
        });

        // If no client is found, return a 404 error
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Map the client's favorite masters to return relevant data
        const favoriteMasters = client.Masters.map(master => {
            // Calculate average rating and review count
            const reviews = master.Services.reduce((allReviews, service) => {
                return [...allReviews, ...service.Appointments.map(appointment => appointment.Review)];
            }, []).filter(review => review); // Only consider non-null reviews

            const reviewsCount = reviews.length;
            const avgRating = reviewsCount
                ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount).toFixed(1)
                : 0;

            // Get unique categories from services
            const categories = Array.from(new Set(master.Services.map(service => service.Category)))
                .filter(category => category); // Ensure only valid categories

            return {
                id: master.id,
                first_name: master.first_name,
                last_name: master.last_name,
                gender: master.gender,
                Occupation: master.Occupation ? { id: master.Occupation.id, name: master.Occupation.name } : null,
                categories: categories.map(category => ({ id: category.id, name: category.name })),
                avgRating: parseFloat(avgRating),
                reviewsCount,
                Salon: master.Salons.length > 0 ? {
                    City: { name: master.Salons[0].City.name },
                    address: master.Salons[0].address,
                } : null,
            };
        });

        // Send the formatted response
        res.status(200).json(favoriteMasters);
    } catch (error) {
        // Return a 500 error if something goes wrong
        res.status(500).json({ message: error.message });
    }
};



//getClientByUserId

const getClientByUserId = async (req, res) => {
    try {
        const client = await Client.findOne({
            where: {
                user_id: req.params.userId
            }
        });
        if (!client) {
            res.status(404).json({message: 'Client not found'});
        } else {
            res.status(200).json(client);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    addFavoriteMaster,
    removeFavoriteMaster,
    getFavoriteMasters,
    getClientByUserId
}