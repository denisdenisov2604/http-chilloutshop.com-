const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_51RAipzRojTmPd7C1jOvfnHHE8XDu4mudov6tvuuKYNXAGSIjoOvhQQGlnUiuMmK37rjI3Y9WFkP8Uw8D1vJWjM3B009glFbnD1");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/create-checkout-session", async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: "Заказ CHILLOUT" },
          unit_amount: amount
        },
        quantity: 1
      }],
      // Здесь указывай URL успеха и отмены платежа; для локальной разработки их можно задать так:
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cart.html"
    });
    // Мы можем вернуть URL (если сессия создана с параметром url) или id и перенаправить на страницу оплаты
    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Ошибка при создании сессии: ", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
