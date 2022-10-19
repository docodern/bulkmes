import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const id = req.query.id;
  console.log("ID FROM UPDATE ID: " + id)

  try {
    if (!id.startsWith('pi_')) {
      throw Error('Incorrect CheckoutSession ID.');
    }
    
    const payment_intent = await stripe.paymentIntents.retrieve(id);

    res.status(200).json(payment_intent);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}