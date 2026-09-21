import express from "express";
import cors from "cors";
import banco from "./banco.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/trens", (req, res) => {
    const busca = req.query.busca;

    if (busca) {
        const trens = banco.prepare("SELECT * FROM trens WHERE prefixo LIKE ? OR modelo LIKE ? ORDER BY PREFIXO").all(`%${busca}%`, `%${busca}%`);

        return res.json(trens);
    }

    const trns = banco.prepare("SELECT * FROM trens ORDER BY prefixo").all();

    res.json(trens);
});

app.listen(3000, () => {
    console.log("Servidor rodando em htpp://localhost:3000");
});
