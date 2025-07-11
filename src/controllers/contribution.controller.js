const BrandProduct = require('../models/BrandProduct.js');
const Newİdea = require('../models/Newİdea.js');

const brandProduct = async (req, res) => {
    try {
        const { brandName , productName, productDescription } = req.body;

        if (!brandName && !productName) return res.status(400).json({ message: 'Brand name and product name are required' });

        // Create a new product object
        const brandProduct = await BrandProduct.create({
            userId: req.user._id,
            userInfo: {
                name: req.user.name,
                email: req.user.email
            },
            brandName: brandName.trim(),
            productName: productName.trim(),
            description: productDescription ? productDescription.trim() : ''
        });

        res.status(201).json({ message: 'Brand and product added successfully', brandProduct });
    } catch (error) {
        console.error('Error adding brand product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const newIdea = async (req, res) => {
    try {
        const { ideaTitle, ideaDetails } = req.body;

        if (!ideaTitle && !ideaDetails) return res.status(400).json({ message: 'Idea title and details are required' });

        const newIdea = await Newİdea.create({
            userId: req.user._id,
            userInfo: {
                name: req.user.name,
                email: req.user.email,
            },
            ideaTitle: ideaTitle,
            ideaDetails: ideaDetails
        })
        res.status(201).json({ message: 'New idea added successfully', newIdea });
    } catch (error) {
        console.error('Error adding new idea:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { brandProduct , newIdea };
