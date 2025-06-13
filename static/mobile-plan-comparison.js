// --- Mobile Plan Data ---
        // IMPORTANT: This data is illustrative and WILL become outdated quickly.
        // Prices, data amounts, and promotions change frequently.
        // Data amounts are simplified (e.g., 'Unlimited' often means throttled after cap).
        const mobilePlans = [
          // Major Providers (Postpaid often require credit check)
          { provider: "Rogers", planName: "Infinite Essential BYOD", type: "Postpaid", features: ["100GB 5G/LTE Data (then reduced speed)", "Unlimited Canada-wide Talk & Text", "Int'l Text Included"], price: 85, dataGB: 100, newcomerFriendly: true, link: "https://www.rogers.com/plans", logo: "rogers-logo.svg" },
          { provider: "Bell", planName: "Essential 100 BYOD", type: "Postpaid", features: ["100GB 5G+ Data (then reduced speed)", "Unlimited Canada-wide Talk & Text"], price: 85, dataGB: 100, newcomerFriendly: true, link: "https://www.bell.ca/Mobility/Cell_phone_plans", logo: "bell-logo.svg" },
          { provider: "Telus", planName: "Essential 100 5G+ BYOD", type: "Postpaid", features: ["100GB 5G+ Data (then reduced speed)", "Unlimited Canada-wide Talk & Text"], price: 85, dataGB: 100, newcomerFriendly: true, link: "https://www.telus.com/en/mobility/plans", logo: "telus-logo.svg" },

           // Flanker Brands (Often better value, use parent network)
           { provider: "Fido", planName: "Data, Talk & Text Plan 50GB", type: "Postpaid", features: ["50GB 4G LTE Data", "Unlimited Canada-wide Talk & Text", "BYOD"], price: 45, dataGB: 50, newcomerFriendly: true, link: "https://www.fido.ca/plans", logo: "fido-logo.png" },
           { provider: "Koodo", planName: "$50 BYOD Plan 60GB", type: "Postpaid", features: ["60GB 4G LTE Data", "Unlimited Canada-wide Talk & Text", "Pick Your Perk options"], price: 50, dataGB: 60, newcomerFriendly: true, link: "https://www.koodomobile.com/en/plans", logo: "koodo-logo.svg" },
           { provider: "Virgin Plus", planName: "$50 BYOD Plan 60GB", type: "Postpaid", features: ["60GB 5G Data", "Unlimited Canada-wide Talk & Text", "Member Benefits"], price: 50, dataGB: 60, newcomerFriendly: true, link: "https://www.virginplus.ca/en/plans/index.html", logo: "virgin-plus-logo.svg" },

           // Discount Brands (Often Prepaid, No Credit Check)
           { provider: "Public Mobile", planName: "Canada-US 60GB 5G", type: "Prepaid", features: ["60GB 5G Data", "Unlimited Canada-US Talk & Text", "eSIM available", "Points Rewards"], price: 40, dataGB: 60, newcomerFriendly: true, link: "https://publicmobile.ca/en/on/plans", logo: "public-mobile-logo.svg" },
           { provider: "Public Mobile", planName: "Canada 20GB 4G", type: "Prepaid", features: ["20GB 4G LTE Data", "Unlimited Canada-wide Talk & Text", "AutoPay Discount"], price: 34, dataGB: 20, newcomerFriendly: true, link: "https://publicmobile.ca/en/on/plans", logo: "public-mobile-logo.svg" },
           { provider: "Lucky Mobile", planName: "$25 Canada-Wide Talk & Text", type: "Prepaid", features: ["Unlimited Canada-wide Talk & Text", "No Data Included", "Auto Top-Up Bonus possible"], price: 25, dataGB: 0, newcomerFriendly: true, link: "https://www.luckymobile.ca/shop/plans/prepaid", logo: "lucky-mobile-logo.png" },
           { provider: "Chatr Mobile", planName: "$35 Plan 6GB", type: "Prepaid", features: ["6GB 3G Data", "Unlimited Canada-wide Talk & Text", "Auto-pay bonus data possible"], price: 35, dataGB: 6, newcomerFriendly: true, link: "https://www.chatrwireless.com/plans", logo: "chatr-logo.svg" },

           // Regional / Other
           { provider: "Freedom Mobile", planName: "5G Unlimited 50GB CA-US", type: "Postpaid", features: ["50GB 5G Data + Unlimited at lower speed", "Unlimited Talk & Text (Can/US)", "Includes Roaming"], price: 50, dataGB: 50, newcomerFriendly: true, link: "https://www.freedommobile.ca/en-CA/plans", logo: "freedom-mobile-logo.png" },
           { provider: "Freedom Mobile", planName: "4G LTE 6GB", type: "Prepaid", features: ["6GB LTE Data", "Unlimited Canada-wide Talk & Text", "No contract"], price: 24, dataGB: 6, newcomerFriendly: true, link: "https://www.freedommobile.ca/en-CA/prepaid-plans", logo: "freedom-mobile-logo.png" }
      ];

      // --- DOM Elements ---
      const providerFilter = document.getElementById('providerFilter');
      const planTypeFilter = document.getElementById('planTypeFilter');
      const dataAmountFilter = document.getElementById('dataAmountFilter');
      const priceRangeFilter = document.getElementById('priceRangeFilter');
      const newcomerFriendlyFilter = document.getElementById('newcomerFriendlyFilter');
      const plansContainer = document.getElementById('plansContainer');
      // const recommendedContainer = document.getElementById('recommendedPlans'); // Merged into main container now

      // --- Functions ---

      /** Populates the provider filter dropdown */
      function populateProviderFilter() {
          const providers = [...new Set(mobilePlans.map(plan => plan.provider))].sort(); // Get unique, sorted providers
          providers.forEach(provider => {
              const option = document.createElement('option');
              option.value = provider;
              option.textContent = provider;
              providerFilter.appendChild(option);
          });
      }

      /** Creates HTML for a single plan card */
      function createPlanCard(plan) {
          const card = document.createElement('div');
          card.className = `plan-card`;

          // Use the logo from plan.logo, with h-12 max-w-[160px] and w-auto
          const logoSrc = `static/images/providers/${plan.logo}`;
          const logoImg = `<img src="${logoSrc}" alt="${plan.provider} logo" class="provider-logo h-12 max-w-[160px] w-auto mb-3">`;

          card.innerHTML = `
              ${logoImg}
              <h4>${plan.planName}</h4>
              <ul>
                  ${plan.features.map(feature => `<li><i class="fas fa-check"></i><span>${feature}</span></li>`).join("")}
              </ul>
              <p class="price">$${plan.price}/month</p>
               <div class="tags">
                  <span class="tag ${plan.type === 'Prepaid' ? 'prepaid' : 'postpaid'}">${plan.type}</span>
                  ${plan.newcomerFriendly ? '<span class="tag newcomer">Newcomer Friendly</span>' : ''}
               </div>
              <a href="${plan.link}" target="_blank" rel="noopener noreferrer" class="view-button mt-auto">
                 View Plan Details <i class="fas fa-external-link-alt ml-1 text-xs"></i>
              </a>
          `;
          return card;
      }

      /** Filters and renders plans based on current selections */
      function filterAndRenderPlans() {
          const selectedProvider = providerFilter.value;
          const selectedPlanType = planTypeFilter.value;
          const minData = parseInt(dataAmountFilter.value);
          const maxPrice = parseInt(priceRangeFilter.value);
          const newcomerOnly = newcomerFriendlyFilter.checked;

          plansContainer.innerHTML = ''; // Clear previous results

          const filteredPlans = mobilePlans.filter(plan => {
              const matchesProvider = !selectedProvider || plan.provider === selectedProvider;
              const matchesType = !selectedPlanType || plan.type === selectedPlanType;
              const matchesData = plan.dataGB >= minData;
              const matchesPrice = plan.price <= maxPrice;
              const matchesNewcomer = !newcomerOnly || plan.newcomerFriendly;
              return matchesProvider && matchesType && matchesData && matchesPrice && matchesNewcomer;
          });

          // Sort recommended to top, then by price
           filteredPlans.sort((a, b) => {
               if (a.recommended !== b.recommended) {
                   return b.recommended - a.recommended; // true (1) comes before false (0)
               }
               return a.price - b.price; // Then sort by price ascending
           });


          if (filteredPlans.length === 0) {
              plansContainer.innerHTML = `
                  <div class="col-span-full no-results">
                      <i class="fas fa-search text-4xl mb-4 text-gray-400"></i>
                      <p>No mobile plans match your selected filters.</p>
                      <p class="text-sm mt-1">Try adjusting your criteria.</p>
                  </div>`;
          } else {
              filteredPlans.forEach(plan => {
                  plansContainer.appendChild(createPlanCard(plan));
              });
          }
      }

      // --- Event Listeners ---
      document.addEventListener('DOMContentLoaded', () => {
          populateProviderFilter(); // Populate provider dropdown on load
          filterAndRenderPlans(); // Initial render

          // Add listeners to all filters
          providerFilter.addEventListener("change", filterAndRenderPlans);
          planTypeFilter.addEventListener("change", filterAndRenderPlans);
          dataAmountFilter.addEventListener("change", filterAndRenderPlans);
          priceRangeFilter.addEventListener("change", filterAndRenderPlans);
          newcomerFriendlyFilter.addEventListener("change", filterAndRenderPlans);
      });
