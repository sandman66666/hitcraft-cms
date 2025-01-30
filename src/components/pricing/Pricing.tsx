import Navbar from "../layout/Navbar";

export default function Pricing() {
  return (
    <main className="pricing-page" role="main" itemScope itemType="https://schema.org/PriceSpecification">
      <Navbar isPricingPage={true} />
      <div className="pricing-content">
        <header className="text-center">
          <h1 className="text-[#B5B5B5]">Pricing</h1>
          <p className="text-[#B5B5B5]">Choose the plan that's right for you</p>
        </header>

        <div className="pricing-plans" role="list">
          <div className="pricing-card" role="listitem" itemScope itemType="https://schema.org/Offer">
            <h2 id="basic-plan">Basic</h2>
            <meta itemProp="name" content="Basic Plan" />
            <div className="price" itemProp="price" content="9.99">$9.99</div>
            <meta itemProp="priceCurrency" content="USD" />
            <ul className="features-list sr-only">
              <li>Basic AI music production tools</li>
              <li>Limited song exports</li>
              <li>Standard support</li>
            </ul>
            <button 
              className="main-button-design black-button"
              aria-labelledby="basic-plan"
            >
              GET STARTED
            </button>
          </div>

          <div className="pricing-card popular" role="listitem" itemScope itemType="https://schema.org/Offer">
            <div className="most-popular-badge" aria-label="Most Popular Plan">Most Popular</div>
            <h2 id="pro-plan">Pro</h2>
            <meta itemProp="name" content="Pro Plan" />
            <div className="price" itemProp="price" content="19.99">$19.99</div>
            <meta itemProp="priceCurrency" content="USD" />
            <ul className="features-list sr-only">
              <li>Advanced AI music production tools</li>
              <li>Unlimited song exports</li>
              <li>Priority support</li>
              <li>Advanced features access</li>
            </ul>
            <button 
              className="main-button-design gradient-purple-button"
              aria-labelledby="pro-plan"
            >
              TRY PRO
            </button>
          </div>

          <div className="pricing-card" role="listitem" itemScope itemType="https://schema.org/Offer">
            <h2 id="enterprise-plan">Enterprise</h2>
            <meta itemProp="name" content="Enterprise Plan" />
            <div className="price">Custom</div>
            <meta itemProp="priceSpecification" content="Custom pricing based on needs" />
            <ul className="features-list sr-only">
              <li>Custom AI model training</li>
              <li>Dedicated support team</li>
              <li>Custom integrations</li>
              <li>SLA guarantees</li>
            </ul>
            <button 
              className="main-button-design black-button"
              aria-labelledby="enterprise-plan"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
