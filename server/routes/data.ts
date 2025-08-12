import { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

// Pasta onde os dados serão salvos
const DATA_DIR = path.join(process.cwd(), "dados");
const DATA_FILE = path.join(DATA_DIR, "landing-page-data.json");
const COMPRESSION_SETTINGS_FILE = path.join(DATA_DIR, "compression-settings.json");

// Criar pasta de dados se não existir
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// GET /api/data - Carregar dados
router.get("/", (req: Request, res: Response) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      const jsonData = JSON.parse(data);
      console.log("📥 Dados carregados do arquivo:", DATA_FILE);
      res.json(jsonData);
    } else {
      console.log("📁 Arquivo de dados não existe, retornando dados vazios");
      res.json({});
    }
  } catch (error) {
    console.error("❌ Erro ao carregar dados:", error);
    res.status(500).json({ error: "Erro ao carregar dados" });
  }
});

// POST /api/data - Salvar dados
router.post("/", (req: Request, res: Response) => {
  try {
    const data = req.body;
    const jsonString = JSON.stringify(data, null, 2);
    
    fs.writeFileSync(DATA_FILE, jsonString, "utf8");
    console.log("📦 Dados salvos no arquivo:", DATA_FILE);
    console.log("📄 Tamanho do arquivo:", fs.statSync(DATA_FILE).size, "bytes");
    
    res.json({ success: true, message: "Dados salvos com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao salvar dados:", error);
    res.status(500).json({ error: "Erro ao salvar dados" });
  }
});

// GET /api/data/download - Download do arquivo JSON
router.get("/download", (req: Request, res: Response) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      res.download(DATA_FILE, "landing-page-data.json");
      console.log("📥 Arquivo baixado:", DATA_FILE);
    } else {
      res.status(404).json({ error: "Arquivo não encontrado" });
    }
  } catch (error) {
    console.error("❌ Erro no download:", error);
    res.status(500).json({ error: "Erro no download" });
  }
});

export default router;
