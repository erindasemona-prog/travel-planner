import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server funziona 🚀");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/trips", async (req, res) => {
  try {
    const trips = await prisma.trip.findMany();
    res.json(trips);
  } catch {
    res.status(500).json({ error: "Errore nel recupero dei viaggi" });
  }
});

app.post("/trips", async (req, res) => {
  try {
    const { title, location, date, notes } = req.body;

    if (!title || !location || !date) {
      res.status(400).json({ error: "title, location e date sono obbligatori" });
      return;
    }

    const newTrip = await prisma.trip.create({
      data: { title, location, date, notes },
    });

    res.status(201).json(newTrip);
  } catch {
    res.status(500).json({ error: "Errore nella creazione del viaggio" });
  }
});

app.delete("/trips/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ error: "ID non valido" });
      return;
    }

    await prisma.trip.delete({
      where: { id },
    });

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Errore nella cancellazione del viaggio" });
  }
});

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});

        