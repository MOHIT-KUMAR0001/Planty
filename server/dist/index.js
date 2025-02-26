"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_schema_1 = __importDefault(require("./user.schema"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./db"));
const user_login_schema_1 = require("./user.login.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, db_1.default)();
const products_schema_1 = require("./products.schema");
const admin_schema_1 = require("./admin.schema");
const admin_middleware_1 = require("./admin.middleware");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(__dirname, "../public/images");
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath, { recursive: true }); // Ensure the folder exists
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
app.post("/api/contact", (req, res) => {
    const data = req.body;
    if (!data) {
        res.status(400).json({ error: 'Data not provided' });
        return;
    }
    else {
        console.log(data);
        const newUser = new user_schema_1.default({
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
app.post("/api/signup", (req, res) => {
    const data = req.body;
    if (!data) {
        res.status(400).json({ error: 'Data not provided' });
        return;
    }
    else {
        console.log(data);
        const hash = bcrypt_1.default.hashSync(data.password, 10);
        const newUser = new user_login_schema_1.UserLogin({
            username: data.name,
            email: data.email,
            password: hash,
        });
        newUser.save().then(() => {
            const token = jsonwebtoken_1.default.sign({ username: data.name }, "secretKey", { expiresIn: "1h" });
            res.status(201).json({ message: 'User created successfully', token: token });
            return;
        }).catch((error) => {
            res.status(500).json({ error: 'Error creating user', details: error.message });
            return;
        });
    }
});
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            res.status(400).json({ error: "Data not provided" });
            return;
        }
        const user = yield user_login_schema_1.UserLogin.findOne({ email }).select("+password").exec();
        console.log(user);
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
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
app.get("/api/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_schema_1.Products.find();
    res.status(200).json(products);
}));
app.post("/api/register/admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { admin } = req.body;
    if (!admin) {
        res.status(400).json({ error: 'Admin data not provided' });
        return;
    }
    else {
        const hash = bcrypt_1.default.hashSync(admin.password, 10);
        const newAdmin = new admin_schema_1.AdminModel({
            username: admin.username,
            password: hash,
        });
        yield newAdmin.save();
        const adminToken = jsonwebtoken_1.default.sign({ username: newAdmin._id }, "secretKey");
        res.status(201).json({ message: 'Admin created successfully', adminToken: adminToken });
        return;
    }
}));
app.post("/api/login/admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: "Username and password are required" });
            return;
        }
        const admin = yield admin_schema_1.AdminModel.findOne({ username }).select("+password").exec();
        if (!admin) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, admin.password);
        if (!passwordMatch) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }
        const adminToken = jsonwebtoken_1.default.sign({ id: admin._id }, "secretKey", { expiresIn: "2h" });
        res.status(200).json({ message: "Login successful", adminToken });
    }
    catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.post("/api/admin/upload", admin_middleware_1.verifyAdminToken, upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, description, price } = req.body;
        if (!name || !description || !price || !req.file) {
            console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
            return res.status(400).json({ error: "All fields are required" });
        }
        const filename = req.file.filename;
        const product = new products_schema_1.Products({
            name,
            description,
            price,
            ImageUrl: `http://localhost:3000/images/${filename}`
        });
        yield product.save();
        res.status(201).json({ message: "Product uploaded successfully!" });
    }
    catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
