import servicesModel from '../models/services.model.js';

export const getAllServices = async (req, res) => {
    try {
        const services = await servicesModel.find();
        res.status(200).json(services);
    } catch (error) {        
        res.status(500).json({ message: 'Error fetching services', error });
    }  
};

export const createService = async (req, res) => {
    try {
        const { serviceName } = req.body;
        const newService = new servicesModel({ serviceName });
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
}; 

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { serviceName } = req.body;
        const updatedService = await servicesModel.findByIdAndUpdate(id, { serviceName }, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service', error });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await servicesModel.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error });
    }
};