import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let teaId = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: teaId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea Not Found");
  }
  res.status(200).send(tea);
});

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea Not Found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

app.delete("/teas/:id", (req, res) => {
  const idx = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (idx === -1) {
    return res.status(404).send("Tea Not Found");
  }
  teaData.splice(idx, 1);
  res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
