function updateLeverageValue(value) {
  document.getElementById("leverageValue").textContent = value + "x";
}

function displayTradeInfo() {
  // Hide the form container
  document.querySelector(".container").style.display = "none";

  // Get user inputs
  const tradingPair = document.getElementById("tradingPair").value;
  const leverage = parseFloat(document.getElementById("leverage").value);
  const marginMode = document.getElementById("marginMode").value;
  const entryPrice = parseFloat(document.getElementById("entryPrice").value);
  const markPrice = parseFloat(document.getElementById("markPrice").value);
  const margin = parseFloat(document.getElementById("margin").value);

  // Calculations:
  const size = margin * leverage;
  const unrealizedPNL = (markPrice - entryPrice) * (size / entryPrice);
  const roi = (unrealizedPNL / margin) * 100;
  const liquidationPrice = entryPrice - (margin * entryPrice) / size;
  const marginRatio = ((entryPrice - liquidationPrice) / entryPrice) * 100;

  // const col = leverage > 33 ? "-red" : leverage > 17 ? "-yellow" : "-green";
  // Create the info content.
  const infoContent = `
      
    <div class="dashboard">
      <div class="header">
        <div class="title">
          
          <div class="badge">B</div>
          <div class="exchange">${tradingPair.toUpperCase()}</div>
          <span class="Perpetual"> Perpetual </span>
          <div class="margin">${marginMode} ${leverage}x</div>
          <span class="warning-green"> !!!!</span>
          
              <ion-icon name="share-social-outline" class="share-icon"></ion-icon>
      </div>
      

      <!-- ///////////////// -->

      <div class="stats">
        <div class="row">
          <span class="roi">Unrealized PNL (USDT)</span>
          <span >ROI</span>
        </div>
        <div class="numbers">
          <!-- <span>ROI</span> -->
          <span class="green bold">+${unrealizedPNL.toFixed(2)}</span>
          <span class="green bold">+${roi.toFixed(2)}%</span>
        </div>
      </div>

      <div class="details">
        <div>
          <div class="Size">Size (USDT)</div>
          <p>${size.toFixed(1)}</p>
        </div>
        <div>
          <div class="marginusd">Margin (USDT)</div>
          <p>${margin.toFixed(1)}</p>
        </div>
        <div class="marginratio">
          <div class="ratio">Margin Ratio</div>
          <div class=" num-green">${marginRatio.toFixed(2)}%</div>
        </div>
        <div>
          <div class="entryprice">Entry Price</div>
          <p>${entryPrice.toFixed(6)}</p>
        </div>
        <div>
          <span>Mark Price</span>
          <p>${markPrice.toFixed(6)}</p>
        </div>
        <div class="liquid-price">
          <span>Liq. Price</span>
          <p class="numliq">${liquidationPrice.toFixed(6)}</p>
        </div>
      </div>

      <div class="buttons">
        <button class="btn1" onclick="handleClick('Adjust Leverage')">
          Adjust Leverage
        </button>
        <button class="btn1" onclick="handleClick('Stop Profit & Loss')">
          Stop Profit & Loss
        </button>
        <button class="btn1" onclick="handleClick('Close Position')">
          Close Position
        </button>
      </div>
    </div>
    `;

  // Display the info in the card and show it.
  document.getElementById("tradeInfoContent").innerHTML = infoContent;
  document.getElementById("tradeInfoCard").style.display = "block";
}

function closeCard() {
  // Hide the trade info card
  document.getElementById("tradeInfoCard").style.display = "none";
  // Bring back the form container
  document.querySelector(".container").style.display = "block";
}
