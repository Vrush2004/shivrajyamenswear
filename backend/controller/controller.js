const ProductSchema = require('../model/Product');
const CategorySchema = require('../model/Category');
const OrderSchema = require('../model/Order');
const LabelSchema = require('../model/Label');
const AuthSchema = require('../model/Auth');

// create a new product -- admin
exports.createProduct = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(500).send("Please provide the product data");
        }

        const product = new ProductSchema(req.body);

        const doc = await product.save();

        res.status(201).json(doc);

    } catch (error) {
        res.status(400).json(error);
    }
}

// update existing product -- admin
exports.updateProduct = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(500).send("Please provide the product data");
        }
        const { id } = req.query;

        const product = await ProductSchema.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send(product)

    } catch (error) {
        res.status(400).json(error);
    }
}

// fetch all products -- for both User & Admin panel
exports.fetchAllProducts = async (req, res) => {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    // TODO : we have to try with multiple category and brands after change in front-end
    let query = ProductSchema.find({});

    if (req.query.category) {
        query = query.find({ category: req.query.category });
    }
    if (req.query.label) {
        query = query.find({ label: req.query.label });
    }
    //TODO : How to get sort on discounted Price not on Actual price
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    try {
        const docs = await query.exec();
        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
};

// fetch particular product
exports.fetchProductById = async (req, res) => {
    try {
        let { id } = req.query;
        const product = await ProductSchema.findOne({ _id: id });
        res.status(201).send(product);

    } catch (error) {
        res.status(500).send(error);
    }
}

// delete particular product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const { id } = req.query;

        // Check if the provided ID is valid
        if (!id) {
            return res.status(400).json({ error: 'Product ID is missing.' });
        }

        const deletedProduct = await ProductSchema.findByIdAndDelete({_id:id});

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error while deleting product:', error);
        res.status(500).json({ error: 'An error occurred while deleting the product.' });
    }
};

// create a new category -- no one can use
exports.createCategory = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(500).send("Please fill the form");
        }
        const cat = new CategorySchema(req.body);
        const category = await cat.save();

        return res.status(201).send(category);

    } catch (error) {
        res.status(500).send(error)
    }
}

// get all the categories for UI
exports.fetchAllCategories = async (req, res) => {
    try {
        const categories = await CategorySchema.find({});
        res.status(201).send(categories)
    } catch (error) {
        res.status(500).send(error)
    }
}

// create a new label -- no one can use
exports.createLabel = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(500).send("Please fill the form");
        }
        const lb = new LabelSchema(req.body);
        const label = await lb.save();

        return res.status(201).send(label);

    } catch (error) {
        res.status(500).send(error)
    }
}

// get all the labels for UI
exports.fetchAllLabels = async (req, res) => {
    try {
        const labels = await LabelSchema.find({});
        res.status(201).send(labels)
    } catch (error) {
        res.status(500).send(error)
    }
}

// create new order (place order) - User
exports.createOrder = async (req, res) => {
    const order = new OrderSchema(req.body);
    try {
        const doc = await order.save();
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }

};

// delete order - admin
exports.deleteOrder = async (req, res) => {
    const { id } = req.query;
    try {
        const order = await OrderSchema.findByIdAndDelete(id);
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

// update order (change the status of the package) - admin
exports.updateOrder = async (req, res) => {
    const { id } = req.query;
    try {
        const order = await OrderSchema.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

// get All orders
exports.fetchAllOrders = async (req, res) => {
    const { search, fromDate, toDate } = req.query;
    let query = {};

    if (fromDate || toDate) {
        const start = new Date(fromDate);
        console.log(start);
        const end = new Date(toDate);
        end.setDate(end.getDate() + 1); // Adding 1 day to include orders on the 'toDate'
        query.createdAt = { $gte: start, $lt: end };
    }

    if (search) {
        query.$or = [
            { "currentBuyNowProduct.title": { $regex: new RegExp(search, "i") } },
            { "currentBuyNowProduct.category": { $regex: new RegExp(search, "i") } },
            { "address.address": { $regex: new RegExp(search, "i") } },
            { "address.fullName": { $regex: new RegExp(search, "i") } },
            { "address.city": { $regex: new RegExp(search, "i") } },
            { "address.phone": { $regex: new RegExp(search, "i") } }
        ];
    }

    try {
        const orders = await OrderSchema.find(query);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
};

// verify admin -- for Admin Panel
exports.verifyAdmin = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send("Please provide the crendtials");
        }
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send("All fields required");
        }
        const admin = await AuthSchema.findOne({ email });
        if (!admin) {
            return res.status(400).json("Invalid credentials! ");
        }
        if (admin.password != password) {
            return res.status(400).json("Invalid credentials! ");
        }
        res.status(200).send(admin);
    } catch (error) {
        res.status(500).json(error);
    }
}