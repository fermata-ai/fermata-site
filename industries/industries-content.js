// All text and photos for the industries page. Photos are in photos/; credits are attached where the license needs one. Sources for every line are in
// Fermata-business/product-feedback/08_Industries/Industries-Page_Content-and-Sources_2026-11-21.md.
window.FERMATA_INDUSTRIES = {
  closeHeading: "Tell us what your team is scaling up.",
  closeText: "We'll show you how Fermata fits around the way your team already works.",
  heroPhotos: [
    {
      "src": "photos/hero/hero_k01_stainless-process-vessel_pexels-33514501.jpg",
      "alt": "Stainless process vessel, valves and pipework"
    },
    {
      "src": "photos/hero/hero_k02_refinery-towers_pexels-4883682.jpg",
      "alt": "Refinery pipework and towers"
    },
    {
      "src": "photos/hero/hero_k03_microscopy-bench_unsplash-1602052577122-f73b9710adba.jpg",
      "alt": "Microscope and instruments on a laboratory bench"
    },
    {
      "src": "photos/hero/hero_k04_glass-condensers_pexels-32769363.jpg",
      "alt": "Glass condensers with blue fittings on a laboratory bench"
    },
    {
      "src": "photos/hero/hero_k05_steel-pipe-gallery_unsplash-1620203853151-496c7228306c.jpg",
      "alt": "Monochrome industrial pipes and valves"
    }
  ],
  industries: [
    {
      id: "batteries",
      goalsHeading: "Turn every result into progress against your KPIs",
      name: "Batteries and energy storage",
      goals: ["$/kWh and levelized cost of storage (LCOS)", "Energy density (Wh/kg, Wh/L)", "Cycle and calendar life", "Round-trip efficiency (RTE)", "Safety", "Fast charge and power"],
      photos: [
        {
          "src": "photos/batteries/batteries_k01_consumer-cell-terminals_pexels-698485.jpg",
          "alt": "Close-up of consumer battery terminals"
        },
        {
          "src": "photos/batteries/batteries_k02_ev-charging-port_pexels-37576219.jpg",
          "alt": "Charging cable connected to an electric vehicle"
        },
        {
          "src": "photos/batteries/batteries_n04_pouch-cell-build-line-in-a-white_flickr-54713023002.jpg",
          "alt": "Pouch-cell build line in a white lab",
          "credit": {
            "author": "Andrea Starr, PNNL",
            "licence": "US government work",
            "licenceUrl": "",
            "page": "https://www.flickr.com/photos/departmentofenergy/54713023002/"
          }
        },
        {
          "src": "photos/batteries/batteries_n03_coated-copper-foil_commons-64243640.jpg",
          "alt": "A Sandia researcher holds a silicon–graphite electrode on copper foil"
        }
      ],
      line: {
        title: "How a battery cell is made, and what each step checks",
        sub: "Eleven steps from slurry to finished cell. Hover over a step, then switch scale to see what changes from lab to factory.",
        steps: [
          { name: "Mixing", what: "Active powders, binder and solvent are mixed into a slurry.", measured: "Slurry viscosity, the most critical property of the slurry.", keeps: "Which powder lot and recipe went into each slurry." },
          { name: "Coating", what: "A slot die spreads the slurry onto metal foil.", measured: "Coating weight and thickness, which set the cell's capacity.", keeps: "Coating weight for every roll, next to past rolls." },
          { name: "Drying", what: "An oven line evaporates the solvent, in one to two minutes at industrial scale.", measured: "Uniform thickness and a defined residual moisture.", keeps: "Oven settings and moisture, linked to the cells made from that roll." },
          { name: "Calendering", what: "Rollers press the electrode to a set thickness and density.", measured: "Thickness, density and porosity.", keeps: "Density targets, and which press settings hit them." },
          { name: "Slitting", what: "Wide rolls are cut to electrode width.", measured: "Width, and edge burrs that can pierce the separator and short the cell.", keeps: "Edge defects, traced back to the roll they came from." },
          { name: "Vacuum drying", what: "Electrodes are heated under vacuum to remove leftover water, for 12 to 30 hours.", measured: "Moisture level after drying.", keeps: "Drying time and moisture for each lot." },
          { name: "Assembly", what: "Electrodes and separator are stacked or wound, welded and packed.", measured: "Weld quality, and optical checks of separator and electrodes.", keeps: "Assembly checks, tied to each cell's later results." },
          { name: "Filling", what: "Electrolyte is dosed under vacuum, then cells rest at 30 to 50 \u00b0C so it soaks in.", measured: "Soak temperature and time.", keeps: "Soak conditions, so wetting problems can be traced." },
          { name: "Formation", what: "The first charge builds the protective layer on the electrodes. Gas is removed and the cell is sealed.", measured: "Charging voltages, and a leak test after sealing.", keeps: "Formation settings, since formation and aging are about a third of manufacturing cost." },
          { name: "Aging", what: "Cells are stored for days to weeks at a constant temperature.", measured: "Open-circuit voltage over time, which shows self-discharge.", keeps: "Self-discharge results, compared with earlier builds." },
          { name: "End-of-line test", what: "Each cell is measured, then graded and sorted.", measured: "Capacity, internal resistance and coulombic efficiency.", keeps: "Final grades, traced back through every step to the cause." }
        ],
        scales: [
          { name: "Lab: coin cells", note: "In the lab, coin cells are usually made by hand and coatings are spread with a doctor blade. Results don't always carry over: differences in cell size can lead to wrong conclusions when lab and factory cells are compared." },
          { name: "Pilot line", note: "Prototypes and pre-series cells are built on pilot lines or in technical centers, with slot-die coaters and full-size cells, before a factory line exists." },
          { name: "Production", note: "Factory coaters run at 60 to 80 meters a minute. Scrap rates of 15 to 30 percent are common in the first years. Formation and aging make up about a third of manufacturing cost and can take up to three weeks." }
        ]
      }
    },
    {
      id: "hydrogen",
      goalsHeading: "Turn every result into progress against your KPIs",
      name: "Hydrogen and e-fuels",
      goals: ["Production cost ($/kg, $/gal)", "Carbon intensity (kg CO₂ equivalent per kg)", "Energy efficiency (kWh/kg H₂)", "Current density at cell voltage", "Durability (degradation rate)", "Faradaic efficiency"],
      photos: [
        {
          "src": "photos/hydrogen-efuels/hydrogen-efuels_k01_waterfront-terminal_unsplash-1784910628628-53ac23cee74f.jpg",
          "alt": "Industrial storage terminal on the waterfront"
        },
        {
          "src": "photos/hydrogen-efuels/hydrogen-efuels_k02_gas-pressure-regulators_pexels-8943269.jpg",
          "alt": "Blue and brass gas pressure regulators"
        },
        {
          "src": "photos/hydrogen-efuels/hydrogen-efuels_k03_storage-tank-shell_unsplash-1765405016584-0ad9f20e2ff9.jpg",
          "alt": "Sunlit storage-tank shell and exterior ladder"
        },
        {
          "src": "photos/hydrogen-efuels/hydrogen-efuels_n07_single-tall-reactor-column-again_pexels-15970027.jpg",
          "alt": "Single tall reactor column against blue sky"
        },
        {
          "src": "photos/hydrogen-efuels/hydrogen-efuels_n09_2-mw-electrolyser-module-open-co_commons-one-2mw-electrolyser-mod.jpg",
          "alt": "2 MW electrolyser module, open container",
          "credit": {
            "author": "Bubble60",
            "licence": "CC BY-SA 4.0",
            "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
            "page": "https://commons.wikimedia.org/wiki/File:One_2MW_Electrolyser_module.jpg"
          }
        },
        {
          "src": "photos/hydrogen-efuels/hydrogen-efuels_n06_station-electrolyser_commons-149394574.jpg",
          "alt": "Electrolyser from a UK hydrogen refuelling station, on display at the Science Museum",
          "credit": {
            "author": "The wub",
            "licence": "CC BY-SA 4.0",
            "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
            "page": "https://commons.wikimedia.org/wiki/File:Hydrogen_electrolyser_-_Science_Museum,_London.jpg"
          }
        }
      ]
    },
    {
      id: "minerals",
      goalsHeading: "Turn every result into progress against your KPIs",
      name: "Critical minerals",
      goals: ["Recovery (%)", "Purity (battery-grade)", "Cost per tonne ($/t)", "Selectivity", "Water and reagent use", "Capacity (tonnes per year)"],
      photos: [
        {
          "src": "photos/critical-minerals/critical-minerals_k01_moab-potash-ponds_pexels-23022540.jpg",
          "alt": "Aerial view of potash evaporation ponds near Moab, Utah"
        },
        {
          "src": "photos/critical-minerals/critical-minerals_k02_uyuni-salt-harvest_unsplash-1567693528052-e213227086bb.jpg",
          "alt": "Salt harvest on the Uyuni salt flat in Bolivia"
        },
        {
          "src": "photos/critical-minerals/critical-minerals_n04_rare-earth-oxide-powders_commons-10512749.jpg",
          "alt": "Six rare-earth oxide powders photographed as watershed tracer materials"
        },
        {
          "src": "photos/critical-minerals/critical-minerals_n06_neodymium-oxide_commons-148235338.jpg",
          "alt": "Pale violet neodymium(III) oxide powder",
          "credit": {
            "author": "Leiem",
            "licence": "CC BY-SA 4.0",
            "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
            "page": "https://commons.wikimedia.org/wiki/File:Neodymium_oxide_sample_(cropped).jpg"
          }
        }
      ]
    },
    {
      id: "carbon",
      goalsHeading: "Turn every result into progress against your KPIs",
      name: "Carbon capture, removal and use",
      goals: ["Cost per net tonne of CO₂ ($/tCO₂)", "Durability", "Net removal (life-cycle assessment, LCA)", "Energy use (GJ per tonne of CO₂)", "Capture rate (%)", "Capacity (tonnes of CO₂ per year)"],
      photos: [
        {
          "src": "photos/carbon-capture/carbon-capture_k01_silo-catwalk_pexels-13565263.jpg",
          "alt": "Silos connected by a catwalk"
        },
        {
          "src": "photos/carbon-capture/carbon-capture_k02_power-station-cooling-towers_unsplash-1630142895963-6996ae6b3a5b.jpg",
          "alt": "A row of cooling towers releasing water vapour"
        },
        {
          "src": "photos/carbon-capture/carbon-capture_n03_ethanol-capture-plant_commons-172430108.jpg",
          "alt": "Red Trail Energy ethanol and CO₂ capture plant in North Dakota",
          "credit": {
            "author": "Acroterion",
            "licence": "CC BY-SA 4.0",
            "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
            "page": "https://commons.wikimedia.org/wiki/File:Red_Trail_Energy_ethanol_CO2_capture_plant_Richardton_ND1.jpg"
          }
        },
        {
          "src": "photos/carbon-capture/carbon-capture_n07_inoculated-biochar_commons-148112819.jpg",
          "alt": "Charged and inoculated biochar ready for soil application in Namibia",
          "credit": {
            "author": "Tim Brunauer on behalf of Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ)",
            "licence": "CC BY-SA 4.0",
            "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
            "page": "https://commons.wikimedia.org/wiki/File:Charged_and_inoculated_biochar_ready_for_soil_application.jpg"
          }
        }
      ]
    },
    {
      id: "coatings",
      goalsHeading: "Turn every result into progress against your KPIs",
      name: "Coatings, adhesives and polymers",
      goals: ["Low volatile organic compound (VOC) content", "Adhesion and lap shear strength", "Cure time and pot life", "Corrosion resistance and weatherability", "Tensile strength and glass transition temperature (Tg)", "PFAS-free (per- and polyfluoroalkyl substances)"],
      photos: [
        {
          "src": "photos/coatings-adhesives-polymers/coatings-adhesives-polymers_k01_coloured-plastic-pellets_pexels-38741337.jpg",
          "alt": "Rows of colored plastic pellets on white"
        },
        {
          "src": "photos/coatings-adhesives-polymers/coatings-adhesives-polymers_k02_powder-coating-metal_pexels-36215204.jpg",
          "alt": "Operator powder-coats metal sections in a booth"
        },
        {
          "src": "photos/coatings-adhesives-polymers/coatings-adhesives-polymers_k03_open-blue-paint-can_unsplash-1670940094923-6f75e4dc5c3a.jpg",
          "alt": "Blue paint and a stirrer in an open can"
        },
        {
          "src": "photos/coatings-adhesives-polymers/coatings-adhesives-polymers_n10_mixing-two-part-resin-in-a-clear_pexels-7256844.jpg",
          "alt": "Mixing two-part resin in a clear cup"
        },
        {
          "src": "photos/coatings-adhesives-polymers/coatings-adhesives-polymers_n07_epoxy-bonded-composite-tensile-t_commons-st-rigme-jpg.jpg",
          "alt": "Epoxy-bonded composite tensile test samples (lab)"
        },
        {
          "src": "photos/coatings-adhesives-polymers/coatings-adhesives-polymers_n06_shrink-film-line_pexels-36423819.jpg",
          "alt": "A roll of shrink film feeds packaging equipment in a Tanzanian warehouse"
        }
      ]
    }
  ]
};
