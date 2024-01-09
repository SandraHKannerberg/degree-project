// TESTING STRIPE FROM FRONTEND

function Home() {
  async function handlePayment() {
    const response = await fetch(
      "http://localhost:3000/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      return;
    }

    const { url } = await response.json();
    window.location = url;
  }

  return (
    <div>
      <button onClick={handlePayment}>Test Checkout</button>
    </div>
  );
}

export default Home;
