- Prebuild Checkout Page: Easy to use and integrate but less control over UI
- We will use custom payment flow to have more control over UI and to have more flexibility

1. First Visit https://stripe.com/docs/payments/quickstart?lang=node
2. Now hit `npm install --save stripe` to install stripe
3. Now you have to create payment intent on the server side

> - payment intent is an object that represents your intent to charge a customer or to receive a payment

4. make a file name `stripe.ts` in the payment folder

```ts
import {Application} from "express";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_tR3PYbcVNZZ796tH88S4VQ2u", {
    apiVersion: "2023-10-16",
});
const calculateOrderAmount = (items: any[]): number => {
    return 1400;
};

export const configureStripe = (app: Application) => {
    app.post("/create-payment-intent", async (req, res) => {
        const {items} = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        //This is the client secret that will be used in the frontend to confirm the payment intent
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    });
};

```

use it in the app.ts file

```ts
//Stripe setup for payments
configureStripe(app);
```

5. Replace the `sk_test_tR3PYbcVNZZ796tH88S4VQ2u` with your stripe secret key

> - create an account on stripe
> - close the setup wizard
> - go to the developer section
> - click on the api keys
> - copy the secret key(reveal it first)
> - paste it in the stripe.ts file