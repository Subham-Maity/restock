# Steps to integrate stripe in your app

- Prebuild Checkout Page: Easy to use and integrate but less control over UI
- We will use custom payment flow to have more control over UI and to have more flexibility

1. First Visit https://stripe.com/docs/payments/quickstart?lang=node
2. Now hit `npm install --save stripe` to install stripe
3. Now you have to create payment intent on the server side

> - payment intent is an object that represents your intent to charge a customer or to receive a payment

4. make a file name `stripe.ts` in the payment folder

> Note before this you need to add this

```ts
app.use(express.static("public"));
app.use(express.json());
```

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

- Some Useful Links
    - Testing Cards—https://stripe.com/docs/testing?testing-method=card-numbers#international-cards
    - Stripe documentation—https://stripe.com/docs
    - Setup for react-https://stripe.com/docs/payments/quickstart?client=react&lang=node
    - dashboard-https://dashboard.stripe.com/test/payments

### Actual Implementation

You can modify this according to your needs

- Payments/stripe.ts

```ts
import Stripe from "stripe";
import {stripe_api_key, stripe_api_version} from "./stripe-setting";

export const stripe = new Stripe(stripe_api_key as string, {
    apiVersion: stripe_api_version,
    appInfo: {
        name: "restock",
        url: "https://restock.app",
    },
});
```

- Payments/stripe-wh-setting.ts

```ts
export const stripe_api_key =
    process.env.STRIPE_API_KEY || "sk_test_51J3J3wSFS";
export const stripe_api_version = "2023-10-16";

export const appInfo = {
    name: "restock",
    url: "https://restock.app",
};
```

- Now you have to create a payment intent on the server side
- src/controller/payments/stripe.controller.ts

```ts
import {stripe} from "../../../payments/stripe/stripe";
import catchAsyncError from "../../../error/catchAsyncError";
import {NextFunction, Request, Response} from "express";

export const createPaymentIntent = catchAsyncError(
    async (req: Request, res: Response, _: NextFunction) => {
        const {totalAmount} = req.body;

        //Create a PaymentIntent with the order amount and currency to confirm the payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, //amount in cents
            currency: "inr", //currency code
            automatic_payment_methods: {
                enabled: true, //This is to enable automatic confirmation of the payment intent
            },
        });

        //This is the client secret that will be used in the frontend to confirm the payment intent
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    },
);
```

- Now define the route in the routes file
- src/routes/payments/stripe.routes.ts

```ts
import * as express from "express";
import {Router} from "express";
import {createPaymentIntent} from "../../controller/payments/stripe.controller";

const stripe: Router = express.Router();

stripe.post("/create-payment-intent", createPaymentIntent);

export default stripe;
```

- Go to frontend
- Make a api first to create payment intent
- /src/api/stripe/stripe-fetch.ts

```ts
import {BASE_URL} from "@/constant/constants";

export const createPaymentIntent = async (intentBody: any) => {
    const response = await fetch(
        `${BASE_URL}/payments/stripe/create-payment-intent`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(intentBody),
        },
    );

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.clientSecret;
};
```

- react query setup
- /src/lib/stripe/react-query-stripe.ts

```ts
import {useMutation, useQueryClient} from "react-query";
import {createPaymentIntent} from "@/api/stripe/stripe-fetch";

export const useCreatePaymentIntent = (intentBody: any) => {
    const queryClient = useQueryClient();

    return useMutation(() => createPaymentIntent(intentBody), {
        onSuccess: (clientSecret) => {
            queryClient.setQueryData("clientSecret", clientSecret);
        },
    });
};
```

- Now make a stripe form and another one for processing the form

- /src/components/payments/stripe/stripe-form-checkout.tsx

```tsx
import React, {useEffect, useState} from "react";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import {selectCurrentOrder} from "@/lib/features/order/order-slice";
import {useAppSelector} from "@/store/redux/useSelector";
import {baseurl_stripe_redirect} from "@/constant/constants";

export default function StripeCheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const currentOrder = useAppSelector(selectCurrentOrder);

    const [message, setMessage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret: any = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret",
        );

        if (!clientSecret) {
            return;
        }

        stripe
            .retrievePaymentIntent(clientSecret)
            .then(({paymentIntent}: any) => {
                switch (paymentIntent.status) {
                    case "succeeded":
                        setMessage("Payment succeeded!");
                        break;
                    case "processing":
                        setMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        setMessage("Your payment was not successful, please try again.");
                        break;
                    default:
                        setMessage("Something went wrong.");
                        break;
                }
            });
    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const {error}: any = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${baseurl_stripe_redirect}/order-success/${currentOrder.id}`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions: any = {
        layout: "tabs",
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions}/>
            <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
```

- /src/utils/stripe/get-stripejs.ts

```ts
export const stripePromise = loadStripe(
    "pk_test_51Oh....",
);
```

```tsx
"use client";

import React, {useEffect, useState} from "react";
import {Elements} from "@stripe/react-stripe-js";

import "./Stripe.css";

import StripeCheckoutForm from "@/components/payments/stripe/stripe-form-checkout";
import {selectCurrentOrder} from "@/lib/features/order/order-slice";
import {useAppSelector} from "@/store/redux/useSelector";
import {stripePromise} from "@/utils/stripe/get-stripejs";
import {useCreatePaymentIntent} from "@/lib/stripe/react-query-stripe";

export default function StripeCheckout() {
    const [clientSecret, setClientSecret] = useState("");
    const currentOrder = useAppSelector(selectCurrentOrder);
    const createPaymentIntent = useCreatePaymentIntent({
        totalAmount: currentOrder.totalAmount,
    });

    useEffect(() => {
        if (createPaymentIntent.isSuccess) {
            setClientSecret(createPaymentIntent.data);
        }
    }, [createPaymentIntent.isSuccess, createPaymentIntent.data]);

    useEffect(() => {
        createPaymentIntent.mutate();
    }, []);

    const appearance = {
        theme: "stripe",
    };
    const options: any = {
        clientSecret,
        appearance,
    };

    return (
        <div className="Stripe">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <StripeCheckoutForm/>
                </Elements>
            )}
        </div>
    );
}
```

```css

.Stripe form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
}

#payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
}

#payment-element {
    margin-bottom: 24px;
}

/* Buttons and links */
.Stripe button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
}

.Stripe button:hover {
    filter: contrast(115%);
}

.Stripe button:disabled {
    opacity: 0.5;
    cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
    border-radius: 50%;
}

.spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
}

.spinner:before,
.spinner:after {
    position: absolute;
    content: '';
}

.spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
}

.spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
}

@keyframes loading {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@media only screen and (max-width: 600px) {
    form {
        width: 80vw;
        min-width: initial;
    }
}
```

### Webhooks for stripe

- Now try to set up a webhook to listen to the events from stripe to our server and update the order status accordingly

- First go to https://dashboard.stripe.com/webhooks/create but it will not work because we are using localhost
- So go to https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local and create a new webhook
- First download the stripe cli from https://stripe.com/docs/stripe-cli
- Select your os for assume windows and follow the instructions I prefer to use docker you can use it too

Because you are just testing I prefer to use docker
like this
Source: https://stripe.com/docs/cli/docker

```bash
docker run --rm -it stripe/stripe-cli:latest listen --api-key sk_test_XXXXXX --forward-to localhost/stripe_hook
```

Example

```bash
stripe-cli:latest listen --api-key sk_test_51Ohoo --forward-to http://localhost:5050/api/v1/webhooks/stripe
```

Output

```bash
Your webhook signing secret is whsec_40bf3980e248a4b964b05bb483...
```

- Now if you want to Trigger events with the CLI
- You can trigger events with the CLI to test your webhook endpoint. For example, you can trigger a
  payment_intent.succeeded event with the following command:

```bash
docker run --rm -it stripe/stripe-cli:latest trigger payment_intent.succeeded --api-key sk_test_XXXXXX
``` 

Output

```bash
Setting up fixture for: payment_intent
Running fixture for: payment_intent
Trigger succeeded! Check dashboard for event details.
```

Another Better way if you are using windows
> Scoop is a command-line installer for Windows. It's like Homebrew, but for Windows. You can use it to install tools
> like Git, Node.js, and more.

> Before this you need to install scoop from https://scoop.sh/

```bash
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

Now install stripe-cli

```bash
brew install stripe/stripe-cli/stripe
```

```bash
stripe login
```

#### Now make a file `stripe-webhook.ts` in the `webhooks` folder

> In your app.ts file add this line

```ts
// Static files setup
app.use(express.static("public"));
// This will use it for webhooks
app.use((req, res, next) => {
    if (req.path === "/api/v1/webhooks/stripe") {
        // replace with your actual webhook endpoint
        express.raw({type: "application/json"})(req, res, next);
    } else {
        next();
    }
});

// Middleware for parsing JSON - This will parse incoming requests with JSON payloads
app.use(express.json());

```

```ts


import {Request, Response} from "express";
import {stripe} from "../payments/stripe/stripe";

const endpointSecret =
    "whsec_40bf3980....";

export const handleStripeWebhook = async (req: Request, res: Response) => {
    const sig: any = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${(err as Error).message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntentSucceeded = event.data.object;

            console.log("PaymentIntent was successful!" + paymentIntentSucceeded);
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.send();
};
```

Make a route for this in the `routes` folder

```ts
import * as express from "express";
import {Router} from "express";
import {handleStripeWebhook} from "../../webhooks/stripe-webhook";

const webhooks: Router = express.Router();

webhooks.post("/stripe", handleStripeWebhook);

export default webhooks;
```

Now use it in the `app.ts` file

```ts

//Stripe setup for payments

configureStripe(app);

//Webhooks for stripe

app.use("/api/v1/webhooks", webhooks);
```

Now int the terminal Forward events to your webhook endpoint

```bash
stripe listen --forward-to http://localhost:5050/api/v1/webhooks/stripe
```

- Go to https://dashboard.stripe.com/test/webhooks you will see the webhook you created status will be Listening for
  events

- Open another terminal and trigger events with the CLI to test your webhook endpoint. For example, you can trigger a
  payment_intent.succeeded event with the following command:

```bash
stripe trigger payment_intent.succeeded 
```

- Now you can see the logs in the terminal where you are running the stripe listen command
