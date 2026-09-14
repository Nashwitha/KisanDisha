
import './style.css'


const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <nav class="navbar">
    <div class="logo">🌾 KisanDisha</div>

    <div class="nav-links">
      <a href="#home">Home</a>
      <a href="#features">Features</a>
      <a href="#about">About</a>
    </div>
  

  <section class="hero" id="home">
    <div class="hero-content">
      <div class="hero-text">
        <p class="tagline">Smart Decisions for Better Selling</p>

        <h1>
          Sell Smarter.<br />
          <span>Earn Better.</span>
        </h1>

        <p class="hero-description">
          KisanDisha helps farmers find better markets, understand prices,
          and make smarter selling decisions.
        </p>

        <button id="start-btn" class="primary-btn">
          Find Best Market →
        </button>
      </div>

      <div class="hero-visual">
        <div class="farmer-card">
          <div class="farmer-icon">🌾</div>
          <h3>Smart Market Decisions</h3>
          <p>Compare prices and discover better selling opportunities.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="features" id="features">
    <div class="section-heading">
      <p class="tagline">What KisanDisha Offers</p>
      <h2>Everything You Need to Sell Better</h2>
    </div>

    <div class="feature-grid">
      <div class="feature-card" id="market-intelligence-card">
        <div class="feature-icon">📊</div>
        <h3>Market Intelligence</h3>
        <p>
          Compare market prices and understand where your crop can get
          better value.
        </p>
      </div>

      <div class="feature-card" id="smart-recommendations-card">
        <div class="feature-icon">🤖</div>
        <h3>Smart Recommendations</h3>
        <p>
          Get recommendations based on crop information and available
          market data.
        </p>
      </div>

      <div class="feature-card" id="buyer-matching-card">
        <div class="feature-icon">🤝</div>
        <h3>Buyer Matching</h3>
        <p>
          Find suitable buyers interested in your crop and quantity.
        </p>
      </div>

    <div class="feature-card" id="transport-storage-card">
        <div class="feature-icon">🚚</div>
        <h3>Transport & Storage</h3>
        <p>
          Discover useful transport and storage information for your sale.
        </p>
      </div>
    </div>
  </section>

  <section class="about" id="about">
    <div class="section-heading">
      <p class="tagline">About KisanDisha</p>
      <h2>Helping Farmers Make Better Selling Decisions</h2>
    </div>

    <p>
  KisanDisha brings together market prices, price trends, buyer
  opportunities, quality information and basic transport and storage
  details. It helps farmers make better selling decisions by answering
  three important questions: <strong>Where should I sell?</strong>
  <strong>When should I sell?</strong> and
  <strong>To whom should I sell?</strong>
</p>
  </section>
<section class="decision-points">
  <div class="decision-card">
    <h3>📍 WHERE?</h3>
    <p>Compare available markets and identify where your crop can get better value.</p>
  </div>

  <div class="decision-card">
    <h3>📈 WHEN?</h3>
    <p>Use price trends and market information to make a better selling decision.</p>
  </div>

  <div class="decision-card">
    <h3>🤝 TO WHOM?</h3>
    <p>Find suitable buyers based on your crop and available opportunities.</p>
  </div>
</section>
  <footer>
    <p>🌾 KisanDisha — Sell Smarter. Earn Better.</p>
  </footer>
`

const startButton =
  document.querySelector<HTMLButtonElement>('#start-btn')

startButton?.addEventListener('click', () => {

  app.innerHTML = `
    <nav class="navbar">
      <div class="logo">🌾 KisanDisha</div>
    </nav>

    <section class="entry-section">
      <div class="entry-container">

        <p class="tagline">Farmer Details</p>

        <h1>Tell Us About Your Produce</h1>

        <p class="entry-description">
          Enter your crop, quantity and location to find available markets.
        </p>

        <form id="farmer-form" class="farmer-form">

          <label for="crop">Crop</label>
          <input
            id="crop"
            type="text"
            placeholder="Example: Rice"
            required
          />

          <label for="quantity">Quantity (kg)</label>
          <input
            id="quantity"
            type="number"
            placeholder="Example: 1000"
            min="1"
            required
          />

          <label for="location">Location / District</label>
          <input
            id="location"
            type="text"
            placeholder="Example: Khammam"
            required
          />

          <button type="submit" class="primary-btn">
            Find Markets →
          </button>

        </form>

      </div>
    </section>
  `

  const farmerForm =
    document.querySelector<HTMLFormElement>('#farmer-form')

  farmerForm?.addEventListener('submit', async (event) => {

    event.preventDefault()

    const cropInput =
      document.querySelector<HTMLInputElement>('#crop')

    const quantityInput =
      document.querySelector<HTMLInputElement>('#quantity')

    const locationInput =
      document.querySelector<HTMLInputElement>('#location')

    const crop =
      cropInput?.value.trim() || ''

    const quantity =
      quantityInput?.value.trim() || ''

    const farmerLocation =
      locationInput?.value.trim() || ''

    localStorage.setItem('kisandishaCrop', crop)
    const historyResponse = await fetch(
  `https://kisandisha.onrender.com/api/markets/history?commodity=${encodeURIComponent(crop)}&district=${encodeURIComponent(farmerLocation)}`
)

const historyData = await historyResponse.json()

console.log("Price History:", historyData)

    app.innerHTML = `
      <nav class="navbar">
        <div class="logo">🌾 KisanDisha</div>
      </nav>

      <section class="markets-section">
        <div class="markets-container">

          <p class="tagline">Market Intelligence</p>

          <h1>Finding the Best Markets...</h1>

          <p>
            Checking available market data for
            <strong>${crop}</strong>
            in and around
            <strong>${farmerLocation}</strong>.
          </p>

        </div>
      </section>
    `

    try {

      const response =
        await fetch('https://kisandisha.onrender.com/api/markets')

      if (!response.ok) {
        throw new Error('Failed to fetch market data')
      }

      const markets =
        await response.json()

      const searchCrop =
        crop.toLowerCase().trim()

      const searchLocation =
        farmerLocation.toLowerCase().trim()

      /*
       * Find the farmer's state from the actual dataset.
       *
       * Example:
       * Khammam → Telangana
       * Guntur → Andhra Pradesh
       * Nashik → Maharashtra
       *
       * No hard-coded state list is used here.
       */
      const farmerDistrictRecord =
        markets.find(
          (market: any) =>
            String(market.district || '')
              .toLowerCase()
              .trim() === searchLocation
        )

      const farmerState =
        farmerDistrictRecord
          ? String(farmerDistrictRecord.state || '')
              .toLowerCase()
              .trim()
          : ''

      /*
       * First find all markets where the crop is available.
       */
      const cropMarkets =
        markets.filter(
          (market: any) => {

            const commodity =
              String(market.commodity || '')
                .toLowerCase()

            const variety =
              String(market.variety || '')
                .toLowerCase()

            return (
              commodity.includes(searchCrop) ||
              variety.includes(searchCrop) ||
              (
                searchCrop === 'rice' &&
                (
                  commodity.includes('paddy') ||
                  variety.includes('paddy')
                )
              )
            )
          }
        )

      /*
       * Same district markets
       */
      const sameDistrictMarkets =
        cropMarkets.filter(
          (market: any) =>
            String(market.district || '')
              .toLowerCase()
              .trim() === searchLocation
        )

      /*
       * Same state markets
       */
      const sameStateMarkets =
        cropMarkets.filter(
          (market: any) =>
            farmerState !== '' &&
            String(market.state || '')
              .toLowerCase()
              .trim() === farmerState
        )

      /*
       * Give priority:
       *
       * 0 = Same district
       * 1 = Same state
       * 2 = Other states
       *
       * We will improve the neighbouring-state logic later.
       */
      let matchingMarkets: any[] = []

      if (sameDistrictMarkets.length > 0) {

        matchingMarkets = sameDistrictMarkets

      } else if (sameStateMarkets.length > 0) {

        matchingMarkets = sameStateMarkets

      } else {

        matchingMarkets = cropMarkets

      }

      /*
       * Within the selected location level,
       * show the highest modal price first.
       */
      matchingMarkets.sort(
        (a: any, b: any) =>
          Number(b.modalPrice || 0) -
          Number(a.modalPrice || 0)
      )

      /*
       * Show only the first 20 markets.
       */
      matchingMarkets =
        matchingMarkets.slice(0, 20)
        

      if (matchingMarkets.length === 0) {

        app.innerHTML = `
          <nav class="navbar">
            <div class="logo">🌾 KisanDisha</div>
          </nav>

          <section class="markets-section">
            <div class="markets-container">

              <p class="tagline">Market Intelligence</p>

              <h1>No Matching Markets Found</h1>

              <p>
                We could not find market data for
                <strong>${crop}</strong>.
              </p>

              <button
                class="primary-btn"
                onclick="location.reload()"
              >
                Try Again
              </button>

            </div>
          </section>
        `

        return
      }

      app.innerHTML = `
        <nav class="navbar">
          <div class="logo">🌾 KisanDisha</div>
        </nav>

        <section class="markets-section">

          <div class="markets-container">

            <p class="tagline">Market Intelligence</p>

            <h1>Available Markets</h1>

            <p class="market-summary">
              Markets available for
              <strong>${crop}</strong>
            </p>

            <p class="market-summary">
              Quantity:
              <strong>${quantity} kg</strong>
            </p>

            <p class="market-summary">
              Location:
              <strong>${farmerLocation}</strong>
            </p>

            ${
              farmerState
                ? `
                  <p class="market-summary">
                    Detected State:
                    <strong>
                      ${farmerState}
                    </strong>
                  </p>
                `
                : ''
            }

            <div class="market-list">

              ${matchingMarkets.map(
                (market: any) => {

                  const isBest =
                    matchingMarkets.indexOf(market) === 0

                  return `
                    <div
                      class="market-card ${
                        isBest
                          ? 'recommended-market'
                          : ''
                      }"
                    >

                      <h3>
                        ${market.market}

                        ${
                          isBest
                            ? `
                              <span class="best-badge">
                                ⭐ Best Market
                              </span>
                            `
                            : ''
                        }
                      </h3>

                      <p>
                        ${market.district},
                        ${market.state}
                      </p>

                      <p>
                        <strong>Commodity:</strong>
                        ${market.commodity}
                      </p>

                      <p>
                        <strong>Grade:</strong>
                        ${market.grade}
                      </p>

                      <p>
                        <strong>Modal Price:</strong>
                        ₹${market.modalPrice}
                      </p>

                      <p>
                        <strong>Min:</strong>
                        ₹${market.minPrice}
                        &nbsp; | &nbsp;
                        <strong>Max:</strong>
                        ₹${market.maxPrice}
                      </p>

                    </div>
                  `
                }
              ).join('')}

            </div>

          </div>

        </section>
      `

    } catch (error) {

      console.error(error)

      app.innerHTML = `
        <nav class="navbar">
          <div class="logo">🌾 KisanDisha</div>
        </nav>

        <section class="markets-section">

          <div class="markets-container">

            <p class="tagline">Market Intelligence</p>

            <h1>Unable to Load Markets</h1>

            <p>
              The frontend could not connect to the KisanDisha
              backend.
            </p>

            <p>
              Please make sure the Spring Boot backend is running
              on port 8080.
            </p>

            <button
              class="primary-btn"
              onclick="location.reload()"
            >
              Try Again
            </button>

          </div>

        </section>
      `
    }
  })
})
document
  .getElementById('market-intelligence-card')
  ?.addEventListener('click', () => {
    document.getElementById('start-btn')?.click()
  })

document
  .getElementById('smart-recommendations-card')
  ?.addEventListener('click', () => {
    document.getElementById('start-btn')?.click()
  })
  document
  .getElementById('buyer-matching-card')
  ?.addEventListener('click', () => {
    document.getElementById('start-btn')?.click()
  })
  document
  .getElementById('transport-storage-card')
  ?.addEventListener('click', () => {
    document.getElementById('start-btn')?.click()
  })