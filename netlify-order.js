exports.handler = async function(event) {
  try {
    const data = JSON.parse(event.body);

    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2025-01-01",
        "x-client-id": process.env.CASHFREE_CLIENT_ID,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET
      },
      body: JSON.stringify({
        order_amount: data.amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "cust_" + Date.now(),
          customer_name: data.name,
          customer_phone: data.phone,
          customer_email: data.email || "customer@example.com"
        },
        order_meta: {
          return_url: "https://YOUR-SITE.netlify.app/thankyou.html"
        }
      })
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Order creation failed" })
    };
  }
};