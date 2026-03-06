const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


// Criar pedido
router.post("/", async (req, res) => {
  try {

    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    if (!numeroPedido || !valorTotal || !dataCriacao) {
      return res.status(400).json({
        error: "Campos obrigatórios não informados"
      });
    }

    const mappedOrder = {
      orderId: numeroPedido.split("-")[0],
      value: valorTotal,
      creationDate: new Date(dataCriacao),
      items: items.map(item => ({
        productId: parseInt(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    };

    const order = new Order(mappedOrder);

    await order.save();

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Buscar pedido pelo ID
router.get("/:orderId", async (req, res) => {
  try {

    const order = await Order.findOne({
      orderId: req.params.orderId
    });

    if (!order) {
      return res.status(404).json({
        message: "Pedido não encontrado"
      });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Listar pedidos
router.get("/list", async (req, res) => {
  try {

    const orders = await Order.find();

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Atualizar pedido
router.put("/:orderId", async (req, res) => {
  try {

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      req.body,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Pedido não encontrado"
      });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Deletar pedido
router.delete("/:orderId", async (req, res) => {
  try {

    const result = await Order.deleteOne({
      orderId: req.params.orderId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Pedido não encontrado"
      });
    }

    res.status(200).json({
      message: "Pedido deletado com sucesso"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;