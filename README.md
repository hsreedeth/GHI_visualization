# World Hunger Index: Visualized

This application is an interactive data-art visualization of the Global Hunger Index (GHI) across 128 countries. It represents the severity of hunger over four discrete years (2000, 2006, 2012, 2021) using an elegant circular glyph design. 

## What the Visualization Shows
Each country is visualized as a circular "glyph" divided into four quadrants:
- **Top-left:** 2000
- **Top-right:** 2006
- **Bottom-right:** 2012
- **Bottom-left:** 2021

Countries are ranked by their 2021 GHI score in descending order, meaning the countries with the highest current hunger burdens are presented first.

## Color / Severity Mapping
The color of each quadrant indicates the severity of the hunger index for that particular year:
- **Low (0 - 9.9):** Green (`#31955E`)
- **Moderate (10 - 19.9):** Yellow (`#EEDD53`)
- **Serious (20 - 34.9):** Orange (`#F2A154`)
- **Alarming (35 - 49.9):** Red-Orange (`#E96745`)
- **Extreme (50+):** Dark Red (`#9A0000`)
- **Missing / No Value:** Light Grey (`#e5e7eb`)

## Interaction Rules
- **Initial Load:** A staggered entrance animation smoothly reveals the countries into view, prioritizing the highest hunger indices first.
- **Year Filtering:** Use the year selector pills at the top to filter which years' quadrants are visually highlighted. 
  - To prevent an empty visualization, a minimum of 1 year must be selected at all times.
  - De-selected years retreat perfectly into a dull inactive state, allowing pattern recognition across the remaining emphasized years.
- **Hover/Tooltip:** Interact with any country glyph to subtly magnify its presence and reveal a detailed data card, giving a structured numeric breakdown of the country's index history over the four years.

## Data Structure
The application processes a single raw dataset natively (`global-hunger-index.csv`). The data must be located exactly at:
```
/public/data/global-hunger-index.csv
```

Expected CSV columns:
1. `Entity` (Country Name)
2. `Code` (Country Code)
3. `Year` (Data timestamp)
4. `Global Hunger Index (2021)` (The value)
5. *Annotations (optional/ignored)*

## Run Locally
1. Ensure you have the `global-hunger-index.csv` properly placed in `public/data/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access via your local browser at `http://localhost:3000`.
