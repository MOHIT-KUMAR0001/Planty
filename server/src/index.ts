import express, { Request, Response, Express } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import User from './user.schema';
const app: Express = express();
import connectDB from './db';
import { UserLogin } from './user.login.schema';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
connectDB();
import { Products } from './products.schema';
import { AdminModel } from './admin.schema';
import { verifyAdminToken } from './admin.middleware';
import multer from "multer";
import fs from "fs";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../public/images");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the folder exists
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.post("/api/contact", (req: Request, res: Response): void => {
    interface ContactData {
        name: string;
        email: string;
        phone: string;
        message: string;
    }
    const data: ContactData = req.body;
    if (!data) {
        res.status(400).json({ error: 'Data not provided' });
        return;
    } else {
        console.log(data);
        const newUser = new User({
            username: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
        });
        newUser.save().then(() => {
            res.status(201).json({ message: 'User created successfully' });
            return;
        }).catch((error) => {
            res.status(500).json({ error: 'Error creating user', details: error.message });
            return;
        });
    }
});

app.post("/api/signup", (req: Request, res: Response): void => {
    interface SignupData {
        name: string;
        email: string;
        password: string;
    }
    const data: SignupData = req.body;
    if (!data) {
        res.status(400).json({ error: 'Data not provided' });
        return;
    } else {
        console.log(data);
        const hash: string = bcrypt.hashSync(data.password, 10);
        const newUser = new UserLogin({
            username: data.name,
            email: data.email,
            password: hash,
        });
        newUser.save().then(() => {
            const token: string = jwt.sign({ username: data.name }, "secretKey", { expiresIn: "1h" });
            res.status(201).json({ message: 'User created successfully', token: token });
            return;
        }).catch((error) => {
            res.status(500).json({ error: 'Error creating user', details: error.message });
            return;
        });
    }
});

app.post("/api/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            res.status(400).json({ error: "Data not provided" });
            return;
        }

        const user = await UserLogin.findOne({ email }).select("+password").exec();
        console.log(user)
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// app.post("/api/products", async (req: Request, res: Response): Promise<void> => {

//     const { product } = req.body;
//     console.log(product)
//     if (!product) {
//         res.status(400).json({ error: 'Product data not provided' });
//         return;
//     } else {
//         const Url: string = `http://localhost:3000/images/${product.imageUrl}`;

//         const newProduct = new Products({
//             name: product.name,
//             description: product.description,
//             ImageUrl: Url,
//             price: product.price
//         });
//         await newProduct.save();
//         res.status(201).json({ message: 'Product created successfully', product: newProduct });
//         return;
//     }
// });

app.get("/api/products", async (req: Request, res: Response): Promise<void> => {
    const products = await Products.find();
    res.status(200).json(products);
});

app.post("/api/register/admin", async (req: Request, res: Response): Promise<void> => {
    const { admin } = req.body;
    if (!admin) {
        res.status(400).json({ error: 'Admin data not provided' });
        return;
    } else {
        const hash: string = bcrypt.hashSync(admin.password, 10);
        const newAdmin = new AdminModel({
            username: admin.username,
            password: hash,
        });
        await newAdmin.save();
        const adminToken = jwt.sign({ username: newAdmin._id }, "secretKey");
        res.status(201).json({ message: 'Admin created successfully', adminToken: adminToken });
        return;
    }
})

app.post("/api/login/admin", async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: "Username and password are required" });
            return;
        }

        const admin = await AdminModel.findOne({ username }).select("+password").exec();
        if (!admin) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }

        const adminToken = jwt.sign({ id: admin._id }, "secretKey", { expiresIn: "2h" });
        res.status(200).json({ message: "Login successful", adminToken });

    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/api/admin/upload", verifyAdminToken, upload.single("image"), async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, price } = req.body;
        if (!name || !description || !price || !req.file) {
            console.log(req.file?.filename)
            return res.status(400).json({ error: "All fields are required" });
        }
        const filename: string = req.file.filename;
        const product = new Products({
            name,
            description,
            price,
            ImageUrl: `http://localhost:3000/images/${filename}`
        });

        await product.save();
        res.status(201).json({ message: "Product uploaded successfully!" });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
