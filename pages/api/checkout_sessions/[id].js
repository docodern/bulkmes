import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const id = req.query.id;
  
  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.');
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id);
    const payment_intent = await stripe.paymentIntents.retrieve(checkout_session.payment_intent);

    const data = {
      status: checkout_session.payment_status,
      email: checkout_session.customer_details.email,
      payment: checkout_session.payment_intent,
      description: payment_intent.description
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}