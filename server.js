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
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Заказ CHILLOUT",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: "https://chillout-shop.netlify.app/success.html",
      cancel_url: "https://chillout-shop.netlify.app/cancel.html",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Ошибка Stripe:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
