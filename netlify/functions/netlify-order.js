exports.handler = async (event) => {
  try {
    const { amount, name, phone } = JSON.parse(event.body);

    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01"
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: phone,
          customer_name: name,
          customer_phone: phone
        }
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        payment_session_id: data.payment_session_id
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
