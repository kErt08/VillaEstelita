/** Villa Estelita — guest assistant knowledge base */
window.VillaEstelitaKB = {
  links: {
    airbnb: "https://www.airbnb.com/rooms/958621443730134214",
    facebook: "https://www.facebook.com/VillaEstelitaIdian",
    phone: "tel:+639992286117",
    phoneDisplay: "0999 228 6117",
    maps: "https://www.google.com/maps/search/?api=1&query=14.2614786,121.4313217",
  },
  quickQuestions: [
    "What are your rates?",
    "How do I book?",
    "Where is Villa Estelita?",
    "How many guests can stay?",
    "What's included in the package?",
    "Is the pool heated?",
    "What are check-in times?",
    "How can I contact you?",
    "What are the house rules?",
  ],
  quickAnswers: {
    "What are your rates?": "rates",
    "How do I book?": "booking",
    "Where is Villa Estelita?": "location",
    "How many guests can stay?": "capacity",
    "What's included in the package?": "amenities-included",
    "Is the pool heated?": "heated-pool",
    "What are check-in times?": "checkin",
    "How can I contact you?": "contact",
    "What are the house rules?": "stay-guidelines",
  },
  entries: [
    {
      id: "greeting",
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "kumusta", "help"],
      answer:
        "Hello! I'm the Villa Estelita assistant. Ask me about location, rates, booking, amenities, pool hours, events, or house rules — or tap a suggested question below.",
    },
    {
      id: "thanks",
      keywords: ["thank", "thanks", "salamat", "appreciate"],
      answer: "You're welcome! If you need anything else, just ask. You can also call us at 0999 228 6117 or message us on Facebook.",
    },
    {
      id: "location",
      keywords: ["where", "located", "location", "address", "map", "coordinates", "pagsanjan", "laguna", "idian"],
      answer:
        "Villa Estelita is in Idian, Pagsanjan, Laguna, Philippines.\n\nSearch \"Villa Estelita Pagsanjan Laguna\" on Waze or Google Maps.\nCoordinates: 14.2614786, 121.4313217\n\nUse the Location section on this website for an interactive map and nearby places.",
    },
    {
      id: "directions",
      keywords: ["how to get", "directions", "commute", "travel", "drive", "bus", "terminal", "route"],
      answer:
        "Use Waze or Google Maps and search for \"Villa Estelita Pagsanjan Laguna.\"\n\nCoordinates: 14.2614786, 121.4313217\n\nThe LLI Bus Terminal in Pagsanjan is nearby for commuters. Our Location section also has an interactive map and one-tap directions.",
    },
    {
      id: "operating-hours",
      keywords: ["operating hours", "open hours", "what time open", "what time close", "hours"],
      answer:
        "Hours depend on your booked package:\n• Daytime: 8:00 AM – 5:00 PM (₱6,499)\n• Overnight: 7:00 PM – 6:00 AM (₱7,499)\n• 21 Hours: 5:00 PM – 2:00 PM next day (₱8,499)\nCheck-in and check-out must follow your selected package schedule.",
    },
    {
      id: "open-daily",
      keywords: ["every day", "daily", "open daily", "weekend", "weekday", "holiday"],
      answer:
        "Yes — Villa Estelita accepts bookings throughout the week, subject to availability. Reservations are on a first come, first served basis, so we recommend booking early for weekends and holidays.",
    },
    {
      id: "unique",
      keywords: ["unique", "special", "why choose", "why villa estelita", "what makes", "different"],
      answer:
        "Villa Estelita stands out as an exclusive-use private vacation house with a heated swimming pool, modern pool courtyard, indoor dining & lounge, poolside seating, videoke, and cozy second-floor rooms — perfect for families and groups who want the entire place to themselves without sharing with strangers.",
    },
    {
      id: "family",
      keywords: ["family", "family-friendly", "kids", "children", "child"],
      answer:
        "Yes, Villa Estelita is family-friendly. Up to 15 guests are covered in the base package (3 rooms + 3 extra mattresses for sleeping). Groups exceeding 15 people are charged ₱150 per additional person. Adult supervision is required for children in the pool at all times.",
    },
    {
      id: "pets",
      keywords: ["pet", "pets", "dog", "dogs", "cat", "cats", "animal"],
      answer:
        "Pets are allowed inside the villa. For hygiene and allergy reasons, please keep them outside the rooms and in their own cages. Inform us when booking if you are bringing pets.",
    },
    {
      id: "exclusive",
      keywords: ["exclusive", "private", "entire place", "whole resort", "shared", "other guests"],
      answer:
        "Yes — Villa Estelita is exclusive for your group. You get private use of the entire vacation house and pool area for the duration of your booked package. No shared facilities with other guests.",
    },
    {
      id: "capacity",
      keywords: ["capacity", "how many guests", "how many people", "pax", "accommodate", "maximum", "limit"],
      answer:
        "Guest capacity:\n• Base package covers up to 15 guests\n• Sleeping: up to 15 PAX (3 rooms + 3 extra mattresses)\n• Extra person fee: ₱150 per person above 15 PAX\n\nThe entire property is exclusive to your group for your booked schedule.",
    },
    {
      id: "events-suitable",
      keywords: ["events", "celebration", "party", "gathering", "occasion"],
      answer:
        "Yes! Villa Estelita is ideal for birthdays, reunions, team retreats, and private gatherings. Please inform our representative if you are celebrating an occasion (birthday party, company outing, etc.) when you book.",
    },
    {
      id: "booking",
      keywords: ["book", "booking", "reserve", "reservation", "how can i make"],
      answer:
        "You can reserve Villa Estelita through:\n\n1. Airbnb — tap Book Here on this website\n2. Phone / SMS — 0999 228 6117\n3. Facebook — facebook.com/VillaEstelitaIdian\n\nReservations are first come, first served. A deposit is required to confirm direct bookings (non-refundable).",
    },
    {
      id: "walk-in",
      keywords: ["walk-in", "walk in", "without reservation", "same day"],
      answer:
        "Walk-ins are not guaranteed. Villa Estelita operates by reservation on a first come, first served basis. Please book ahead via Airbnb, phone, or Facebook to secure your preferred date and package.",
    },
    {
      id: "entrance-fee",
      keywords: ["entrance fee", "entrance", "admission", "day pass"],
      answer:
        "Villa Estelita is a private rental property, not a public resort with per-person entrance fees. You book a package (Daytime, Overnight, or 21 Hours) that covers exclusive use of the property for your group.",
    },
    {
      id: "rates",
      keywords: ["rate", "rates", "price", "pricing", "cost", "how much", "package", "fee"],
      answer:
        "Current package rates (exclusive use of the whole property):\n\n• Daytime — 8:00 AM to 5:00 PM: ₱6,499\n• Overnight — 7:00 PM to 6:00 AM: ₱7,499\n• 21 Hours — 5:00 PM to 2:00 PM next day: ₱8,499\n\nMulti-day stays: 21-hour rate × number of days. Extra person above 15 PAX: ₱150 each. Gas stove use: ₱500 (Airbnb guests exempt). Rates may change without notice.",
    },
    {
      id: "minimum-guests",
      keywords: ["minimum", "min guest", "minimum guest", "minimum number"],
      answer:
        "There is no strict minimum guest count — packages are priced for exclusive use of the property. The base rate covers up to 15 guests; each person above 15 is ₱150 extra.",
    },
    {
      id: "deposit",
      keywords: ["deposit", "down payment", "reservation fee", "advance payment"],
      answer:
        "A reservation deposit is required to confirm your booking. Per our house rules, the deposit is non-refundable. For direct bookings (phone/Facebook), contact us for the exact deposit amount and payment instructions.",
    },
    {
      id: "refund",
      keywords: ["refund", "refundable", "money back"],
      answer:
        "The reservation deposit is non-refundable. For rescheduling, cancellation, or special circumstances, please contact us as early as possible at 0999 228 6117 or via Facebook so we can assist you.",
    },
    {
      id: "reschedule",
      keywords: ["reschedule", "change date", "move booking", "transfer date"],
      answer:
        "Reschedule requests depend on availability. Contact us at 0999 228 6117 or Facebook as soon as possible. Because deposits are non-refundable, rescheduling is handled case by case — the earlier you reach out, the better.",
    },
    {
      id: "cancellation",
      keywords: ["cancel", "cancellation", "cancellation policy"],
      answer:
        "Deposits are non-refundable. If you need to cancel, please notify us immediately by phone or Facebook. For Airbnb bookings, Airbnb's cancellation policy also applies to your reservation.",
    },
    {
      id: "confirm-reservation",
      keywords: ["confirm", "confirmation", "verified", "booking confirmed"],
      answer:
        "For Airbnb bookings, you'll receive confirmation through Airbnb. For direct bookings, we confirm once your deposit is received — you'll get a message or call from our team. Keep your booking details and valid ID ready for check-in.",
    },
    {
      id: "online-booking",
      keywords: ["online", "airbnb", "website book", "book online"],
      answer:
        "Yes! You can reserve online through our Airbnb listing. Tap Book Here anywhere on this website, or visit our Airbnb page directly. You can also inquire via phone (0999 228 6117) or Facebook.",
    },
    {
      id: "payment",
      keywords: ["payment", "pay", "payment method", "how to pay"],
      answer:
        "Airbnb bookings are paid through Airbnb's secure platform. For direct reservations via phone or Facebook, we accept arrangements such as GCash and bank transfer — contact us for current payment options and official receipt requests.",
    },
    {
      id: "gcash",
      keywords: ["gcash", "g cash", "e-wallet"],
      answer:
        "GCash is accepted for direct bookings made through phone or Facebook. Airbnb reservations are paid on Airbnb. Message us or call 0999 228 6117 for GCash payment details when booking directly.",
    },
    {
      id: "bank-transfer",
      keywords: ["bank", "bank transfer", "transfer", "bpi", "bdo"],
      answer:
        "Bank transfer may be available for direct bookings. Please contact us at 0999 228 6117 or Facebook for account details and deposit instructions.",
    },
    {
      id: "pay-arrival",
      keywords: ["pay upon arrival", "pay on arrival", "cash on arrival", "pay when arrive"],
      answer:
        "Full payment terms depend on how you book. A deposit is typically required to confirm a reservation. Contact us before your stay if you need to discuss payment upon arrival.",
    },
    {
      id: "receipt",
      keywords: ["receipt", "official receipt", "invoice"],
      answer:
        "Official receipts can be arranged for direct bookings. Please request this when you reserve by phone or Facebook so we can prepare it for you.",
    },
    {
      id: "rooms",
      keywords: ["room", "rooms", "bedroom", "bedrooms", "room type", "accommodation"],
      answer:
        "Villa Estelita has 3 rooms on the second floor with balcony access overlooking the pool courtyard, plus 3 extra mattresses included in the package. Rooms are designed for families and group stays — contact us for specific room layouts.",
    },
    {
      id: "bathrooms",
      keywords: ["bathroom", "bathrooms", "toilet", "restroom", "shower"],
      answer:
        "The property includes modern bathroom facilities for guests. For the exact number of bathrooms and layouts, message us on Facebook or call 0999 228 6117 — you can also browse actual photos in our Gallery section.",
    },
    {
      id: "aircon",
      keywords: ["aircon", "air con", "air-conditioned", "air conditioned", "cooling"],
      answer:
        "Room cooling/AC details are best confirmed directly before your stay. Please call 0999 228 6117 or message us on Facebook for the latest room amenities.",
    },
    {
      id: "towels-linens",
      keywords: ["towel", "towels", "bed linen", "linens", "sheets", "blanket", "bedding"],
      answer:
        "Pillows and blankets are provided per bed. You may bring extra blankets for a cozier sleep. Please bring your own towels and toiletries for hygienic purposes.",
    },
    {
      id: "toiletries",
      keywords: ["toiletries", "soap", "shampoo", "amenities room"],
      answer:
        "Please bring your own toiletries and towels for hygienic purposes. Pillows and blankets are provided per bed.",
    },
    {
      id: "housekeeping",
      keywords: ["housekeeping", "cleaning", "cleaner", "maid"],
      answer:
        "The property is prepared before check-in. If you need additional cleaning during your stay, contact our team on the day of your visit.",
    },
    {
      id: "checkin",
      keywords: ["check-in", "check in", "checkin", "arrival time", "check-in time", "check in time"],
      answer:
        "Check-in times follow your booked package:\n\n• Daytime (₱6,499): 8:00 AM – 5:00 PM\n• Overnight (₱7,499): 7:00 PM – 6:00 AM\n• 21 Hours (₱8,499): 5:00 PM – 2:00 PM next day\n\nValid government ID is required at check-in. Please arrive on time — schedules are strictly observed.",
    },
    {
      id: "checkout",
      keywords: ["check-out", "check out", "checkout", "departure"],
      answer:
        "Check-out time depends on your package:\n• Daytime: by 5:00 PM\n• Overnight: by 6:00 AM\n• 21 Hours: by 2:00 PM the next day\nLate check-out may be possible by prior arrangement — contact us early.",
    },
    {
      id: "early-checkin",
      keywords: ["early check-in", "early checkin", "arrive early", "before time"],
      answer:
        "Early check-in is not guaranteed — we do not have a designated waiting area for early arrivals. Please follow your assigned check-in schedule. Contact us in advance if you need to request an earlier time.",
    },
    {
      id: "late-checkout",
      keywords: ["late check-out", "late checkout", "extend checkout", "stay longer checkout"],
      answer:
        "Late check-out is subject to availability and may have an extra charge. Please ask in advance by phone or Facebook. To extend your stay beyond your package, see our 21-hour rate or inquire about add-on hours.",
    },
    {
      id: "pool-count",
      keywords: ["how many pool", "swimming pool", "pools available", "pool"],
      answer:
        "Villa Estelita has a private heated swimming pool in the central courtyard — exclusive to your group during your stay. Poolside lounge, bar, and gazebo areas surround the pool.",
    },
    {
      id: "pool-exclusive",
      keywords: ["pool exclusive", "private pool", "shared pool"],
      answer:
        "Yes — the pool is exclusive to your group for the duration of your booking. Villa Estelita is a private rental, not a shared public pool.",
    },
    {
      id: "pool-depth",
      keywords: ["pool depth", "deep", "shallow", "depth"],
      answer:
        "For exact pool depth and layout details, please contact us directly. Adult supervision is required for all children using the pool.",
    },
    {
      id: "kiddie-pool",
      keywords: ["kiddie pool", "kids pool", "children pool", "wading"],
      answer:
        "Please contact us for current pool layout details regarding shallow areas or kiddie-friendly sections. Adult supervision is always required for children.",
    },
    {
      id: "heated-pool",
      keywords: ["heated", "heating", "warm pool", "hot pool", "jacuzzi", "jaccuzi"],
      answer:
        "Yes! Villa Estelita has a heated swimming pool and jacuzzi. For the 21-hour package only, heated jacuzzi use includes 30 minutes complimentary — additional time may be subject to fees. Contact us for details on other packages.",
    },
    {
      id: "lifeguard",
      keywords: ["lifeguard", "life guard", "lifesavers"],
      answer:
        "There is no lifeguard on duty. Adult supervision is required for children at all times in the pool area. Please swim responsibly and follow pool safety rules.",
    },
    {
      id: "pool-hours",
      keywords: ["pool hours", "pool time", "pool operating", "swim hours"],
      answer:
        "Pool use follows your booked package hours (Daytime, Overnight, or 21 Hours). Night swimming is available during Overnight and 21-hour packages. Always supervise children in the pool.",
    },
    {
      id: "night-swimming",
      keywords: ["night swim", "night swimming", "swim at night", "evening swim"],
      answer:
        "Yes — night swimming is available with Overnight (7:00 PM – 6:00 AM) and 21-hour (5:00 PM – 2:00 PM) packages. Our heated pool is especially enjoyable in the evening.",
    },
    {
      id: "pool-floats",
      keywords: ["float", "floats", "inflatable", "pool toys"],
      answer:
        "Pool floats and inflatables are generally allowed — please use them safely and rinse off before entering the pool. Avoid glass containers near the pool area.",
    },
    {
      id: "amenities-included",
      keywords: ["amenities", "included", "inclusions", "what's included", "facilities included", "features"],
      answer:
        "Package inclusions:\n• 3 rooms + 3 extra mattresses\n• Videoke / karaoke (auto-off at 10:00 PM)\n• Exclusive use of the heated swimming pool\n• 21-hour rate: 30 min free heated jacuzzi use\n• Indoor dining & lounge, poolside seating, gazebo\n• Kitchen equipment (see house rules for details)\n\nBase rate covers up to 15 guests. Extra person: ₱150/pax above 15.",
    },
    {
      id: "wifi",
      keywords: ["wifi", "wi-fi", "internet", "connection", "online work"],
      answer:
        "Wi-Fi availability should be confirmed before your stay. Please call 0999 228 6117 or message Facebook for the latest connectivity details. Mobile signal in the Pagsanjan area is generally available.",
    },
    {
      id: "videoke",
      keywords: ["videoke", "karaoke", "sing", "kTV"],
      answer:
        "Yes — videoke/karaoke is included! Per Pagsanjan ordinance, videoke automatically turns off at 10:00 PM — no exceptions. Loud music also has a 10:00 PM cut-off; police patrol the area at night.",
    },
    {
      id: "billiards",
      keywords: ["billiards", "pool table", "billiard"],
      answer:
        "Billiards is not listed among our current amenities. Our main inclusions are the heated pool, videoke, indoor lounge, outdoor kitchen, gazebo, and poolside areas.",
    },
    {
      id: "basketball",
      keywords: ["basketball", "court", "sports court"],
      answer:
        "A basketball court is not listed among our current amenities. Villa Estelita focuses on pool, lounge, and gathering spaces for private group stays.",
    },
    {
      id: "playground",
      keywords: ["playground", "play area", "swing", "slide"],
      answer:
        "There is no dedicated playground listed. The property is family-friendly — children should be supervised, especially in the pool area.",
    },
    {
      id: "function-hall",
      keywords: ["function hall", "ballroom", "conference hall", "event hall"],
      answer:
        "There is no separate function hall, but the indoor dining & lounge, pool courtyard, gazebo, and terrace areas work well for birthdays, reunions, and small events within capacity limits.",
    },
    {
      id: "gazebo",
      keywords: ["gazebo", "pavilion", "terrace", "outdoor lounge"],
      answer:
        "Yes — Villa Estelita has a wooden gazebo lounge and terrace/pavilion areas, perfect for shaded gatherings, photos, and relaxing by the pool.",
    },
    {
      id: "kitchen",
      keywords: ["kitchen", "cooking", "cook", "stove", "utensils"],
      answer:
        "Kitchen equipment available for guest use:\n• Refrigerator\n• Water dispenser (bring your own circle gallon)\n• Griller (bring your own charcoal or buy outside)\n• Cooking stove / gas stove (₱500 fee — inform caretaker; Airbnb guests exempt)\n• Microwave oven & rice cooker\n• Medium frying pan, kettle, medium casserole, ladle\n\nPlease bring your own plates, spoons, forks, cups, glasses, and other cooking wares.",
    },
    {
      id: "refrigerator",
      keywords: ["refrigerator", "fridge", "ref", "chiller"],
      answer:
        "Yes — a refrigerator is available in the kitchen area along with a water dispenser (bring circle gallon type), microwave, rice cooker, and other equipment. See house rules for the full kitchen list.",
    },
    {
      id: "grill",
      keywords: ["grill", "grilling", "barbecue", "bbq", "ihaw"],
      answer:
        "Yes — grilling is allowed. A griller is available; please bring your own charcoal or buy outside. Follow fire safety rules and dispose of coals properly.",
    },
    {
      id: "dining",
      keywords: ["dining", "dining area", "eat", "table", "mesas"],
      answer:
        "Yes — Villa Estelita has an indoor dining & lounge area plus poolside seating for group meals and celebrations.",
    },
    {
      id: "tv-speakers",
      keywords: ["tv", "television", "speaker", "speakers", "sound system", "music"],
      answer:
        "Videoke is included for entertainment. For TV and speaker details in rooms or lounge areas, please confirm with us when booking.",
    },
    {
      id: "food-served",
      keywords: ["serve food", "food served", "meals provided", "restaurant", "catering"],
      answer:
        "We do not operate an on-site restaurant. Guests typically bring their own food or cook using the outdoor kitchen. Catering can be arranged externally — contact us for recommendations if needed.",
    },
    {
      id: "breakfast",
      keywords: ["breakfast", "free breakfast", "meal included"],
      answer:
        "Breakfast is not included in the standard package. You may bring your own food or cook at the resort. Ask us about special arrangements for large groups.",
    },
    {
      id: "bring-food",
      keywords: ["bring food", "own food", "outside food", "potluck"],
      answer:
        "Yes — you may bring your own food and beverages. The outdoor kitchen and dining areas are available for your group.",
    },
    {
      id: "alcohol",
      keywords: ["alcohol", "drink", "drinking", "beer", "wine", "liquor"],
      answer:
        "Responsible drinking for of-age guests is generally allowed for private group bookings. Please inquire about corkage or event-specific rules when you reserve.",
    },
    {
      id: "corkage",
      keywords: ["corkage", "cork fee", "bring drinks"],
      answer:
        "Corkage policies, if any, depend on your booking type and event size. Please ask when you reserve by phone, Facebook, or Airbnb messaging.",
    },
    {
      id: "day-tour",
      keywords: ["day tour", "daytime", "day use", "day trip", "day package"],
      answer:
        "Yes — our Daytime package (8:00 AM – 5:00 PM) works like a day use stay for ₱6,499. Includes exclusive property use, pool, videoke, and package inclusions for up to 15 guests (₱150/pax above 15).",
    },
    {
      id: "overnight",
      keywords: ["overnight", "stay overnight", "sleep over", "night stay"],
      answer:
        "Yes — we offer Overnight (7:00 PM – 6:00 AM, ₱7,499) and 21-hour (5:00 PM – 2:00 PM next day, ₱8,499) packages. The 21-hour rate includes 30 minutes free use of the heated jacuzzi only.",
    },
    {
      id: "extend-stay",
      keywords: ["extend", "extension", "longer stay", "extra hours", "add hours"],
      answer:
        "Extensions depend on availability. The 21-hour package covers most overnight needs. Contact us early if you need additional hours or multiple days — rate × number of days applies.",
    },
    {
      id: "birthday",
      keywords: ["birthday", "bday", "birthday party"],
      answer:
        "Absolutely! Villa Estelita is popular for birthday celebrations. You get exclusive use of the pool, lounge, videoke, and outdoor areas for your group.",
    },
    {
      id: "wedding",
      keywords: ["wedding", "reception", "bridal", "marriage"],
      answer:
        "Smaller wedding receptions and celebrations may be possible within our capacity. Contact us with your guest count and setup needs so we can advise on suitability and arrangements.",
    },
    {
      id: "corporate",
      keywords: ["corporate", "team building", "company", "office", "retreat"],
      answer:
        "Yes — Villa Estelita works well for team retreats and corporate outings. Exclusive privacy, heated pool, and lounge spaces make it ideal for bonding and meetings.",
    },
    {
      id: "reunion",
      keywords: ["reunion", "family reunion", "batch", "classmates"],
      answer:
        "Yes — reunions are a great fit! Base package covers up to 15 guests; ₱150 per person above 15. Please inform us if you are holding an occasion so we can prepare accordingly.",
    },
    {
      id: "decorate",
      keywords: ["decorate", "decoration", "balloon", "styling", "setup"],
      answer:
        "Yes — you may decorate for your event. Please use non-damaging materials, avoid open flames near pool areas, and restore the space before check-out. Fireworks are not allowed.",
    },
    {
      id: "event-coordinator",
      keywords: ["event coordinator", "coordinator", "planner", "host"],
      answer:
        "We do not provide an in-house event coordinator, but you may hire external suppliers for styling, food, and photography. Coordinate with us in advance for access and setup times.",
    },
    {
      id: "external-suppliers",
      keywords: ["external supplier", "caterer", "vendor", "photographer hire"],
      answer:
        "External suppliers such as caterers, photographers, and decorators are generally welcome. Please inform us ahead of time about delivery and setup schedules.",
    },
    {
      id: "parking",
      keywords: ["parking", "park", "car park", "vehicle"],
      answer:
        "Parking is available for guests. Contact us with your expected number of vehicles (including vans or buses) so we can confirm space and road access.",
    },
    {
      id: "parking-free",
      keywords: ["parking free", "free parking", "parking fee", "parking cost"],
      answer:
        "Parking for guest vehicles is typically included with your booking. Confirm vehicle count when you reserve — especially for events with many attendees.",
    },
    {
      id: "bus-access",
      keywords: ["bus", "buses", "large vehicle", "van", "coaster"],
      answer:
        "Please contact us before your event if buses or large vehicles will enter the property so we can confirm road access and parking arrangements.",
    },
    {
      id: "shuttle",
      keywords: ["shuttle", "pick up", "pickup", "transport service"],
      answer:
        "We do not provide a shuttle service. The LLI Bus Terminal is nearby in Pagsanjan. Most guests arrive by private car — use Google Maps for directions.",
    },
    {
      id: "security",
      keywords: ["security", "secured", "safe", "guard", "guards", "cctv"],
      answer:
        "Please secure your belongings inside your rooms. Do not leave items outside or in your vehicle. Villa Estelita is a private exclusive-use property — keep valuables safe and follow all house rules.",
    },
    {
      id: "first-aid",
      keywords: ["first aid", "firstaid", "medicine", "injury"],
      answer:
        "Please ask our team about first-aid availability on site. For medical needs, Laguna Doctors Hospital, Pagsanjan Rural Health Unit, and Pagsanjan Prime Medical Center are nearby — see our Location map.",
    },
    {
      id: "emergency",
      keywords: ["emergency", "urgent", "accident", "911"],
      answer:
        "In an emergency, call Philippine emergency hotlines (911) and notify our team immediately at 0999 228 6117. The nearest medical facilities in Pagsanjan are listed on our website's Location map.",
    },
    {
      id: "safe-at-night",
      keywords: ["safe at night", "night safety", "area safe"],
      answer:
        "The property is private and for exclusive guest use during your booking. As with any travel, stay aware of your surroundings and follow our house rules. Contact us with any safety questions before your stay.",
    },
    {
      id: "rules",
      keywords: ["rules", "house rules", "policies", "policy", "regulations"],
      answer:
        "Important house rules:\n• Videoke & loud music off at 10:00 PM (Pagsanjan ordinance)\n• Extra person fee: ₱150/pax above 15 guests\n• 21-hour rate: heated jacuzzi 30 min free use only\n• Gas stove: ₱500 fee (inform caretaker; Airbnb guests exempt)\n• Bring own towels, toiletries & kitchen utensils\n• Pets allowed — keep outside rooms in cages\n• Follow check-in schedule — no early waiting area\n• Staff last call: 8:00 PM (emergencies excepted)\n\nAsk \"stay guidelines\" for the full list.",
    },
    {
      id: "smoking",
      keywords: ["smoking", "smoke", "cigarette", "vape"],
      answer:
        "Smoking policies should be confirmed when booking. Please smoke only in designated areas if permitted, and never near the pool or indoor lounge where other guests may be affected.",
    },
    {
      id: "fireworks",
      keywords: ["fireworks", "firecracker", "pyrotechnics"],
      answer:
        "Fireworks and firecrackers are not allowed for safety reasons, especially near the pool and wooden structures.",
    },
    {
      id: "loud-speakers",
      keywords: ["loud", "noise", "speaker loud", "sound", "music loud", "curfew"],
      answer:
        "Per Pagsanjan, Laguna ordinance, videoke and loud music must stop at 10:00 PM. Police patrol the area at night and may penalize offenders. Videoke also shuts off automatically at 10:00 PM.",
    },
    {
      id: "visitors",
      keywords: ["visitor", "visitors", "extra guest", "additional guest", "outsider"],
      answer:
        "Groups exceeding 15 people are charged ₱150 per additional person. Please inform us of your final headcount when booking. All guests must follow house rules.",
    },
    {
      id: "drones",
      keywords: ["drone", "drones", "aerial shot"],
      answer:
        "Personal drone use may require prior approval. For professional shoots and drones, contact us in advance to discuss guidelines and any applicable fees.",
    },
    {
      id: "glass-pool",
      keywords: ["glass bottle", "glass", "bottle pool"],
      answer:
        "Glass bottles are not allowed near the pool for safety. Please use plastic or non-breakable containers in pool areas.",
    },
    {
      id: "rainy-season",
      keywords: ["rainy season", "rain", "monsoon", "typhoon", "weather"],
      answer:
        "Villa Estelita is open year-round by reservation. During rain, enjoy covered areas such as the indoor lounge, gazebo, and rooms. Pool use during rain depends on conditions — safety first.",
    },
    {
      id: "covered-areas",
      keywords: ["covered", "indoor", "shelter", "roof", "shade"],
      answer:
        "Yes — covered and shaded areas include the indoor dining & lounge, gazebo, terrace pavilion, and guest rooms — so your group can still gather comfortably if it rains.",
    },
    {
      id: "best-months",
      keywords: ["best time", "best month", "when to visit", "season"],
      answer:
        "Villa Estelita can be enjoyed year-round. Dry season (roughly November–May) is popular for pool activities. Weekends and holidays book quickly — reserve early.",
    },
    {
      id: "mobile-signal",
      keywords: ["mobile signal", "signal", "cellphone", "network", "globe", "smart"],
      answer:
        "Mobile signal is generally available in the Pagsanjan, Laguna area. Specific network strength can vary — Globe and Smart are commonly used. Confirm Wi-Fi details with us before your stay.",
    },
    {
      id: "nearby",
      keywords: ["nearby", "near", "around", "attraction", "tourist", "restaurant nearby", "grocery", "convenience", "pharmacy", "atm", "gas"],
      answer:
        "Nearby places include Shakey's, Jollibee, McDonald's, Le Katsu, PICKUP COFFEE at Areza Town Center, Bean There & Starbucks coffee, Goodwill & Puregold supermarkets, Pagsanjan Public Market, Areza Mall, Petron & Shell gas stations, Laguna Doctors Hospital, and Pagsanjan Prime Medical Center. Explore the full list on our Location map!",
    },
    {
      id: "wheelchair",
      keywords: ["wheelchair", "accessible", "accessibility", "pwd", "disability", "senior", "ramp"],
      answer:
        "Accessibility details (ramps, ground-floor access) should be confirmed before booking. Please call 0999 228 6117 so we can discuss accommodations for seniors and guests with mobility needs.",
    },
    {
      id: "photos",
      keywords: ["photo", "photos", "pictures", "gallery", "actual photo", "real photo"],
      answer:
        "Yes! Browse our Photo Gallery on this website for actual resort photos — pool, rooms, gazebo, kitchen, and more. You can also view updates on our Facebook page @VillaEstelitaIdian.",
    },
    {
      id: "video-tour",
      keywords: ["video tour", "video", "virtual tour", "walkthrough"],
      answer:
        "For a video tour or live walkthrough, message us on Facebook at facebook.com/VillaEstelitaIdian or call 0999 228 6117 — we're happy to share recent footage or schedule a viewing.",
    },
    {
      id: "visit-before-booking",
      keywords: ["visit before", "site visit", "inspect", "viewing", "oculus"],
      answer:
        "Pre-booking visits may be arranged depending on availability. Contact us on Facebook or phone to schedule. You can also explore photos on this website and Street View via our Location section.",
    },
    {
      id: "prenup-shoot",
      keywords: ["prenup", "pre-nup", "photoshoot", "photo shoot", "professional shoot"],
      answer:
        "Prenup and professional photo shoots may be allowed with prior approval. Contact us for scheduling, fees, and guidelines. Personal photos during your stay are always welcome!",
    },
    {
      id: "contact",
      keywords: [
        "contact",
        "contact you",
        "how can i contact",
        "get in touch",
        "phone number",
        "phone",
        "call you",
        "text you",
        "message you",
        "inquiry",
        "inquiries",
        "reach you",
        "talk to",
        "speak to",
      ],
      answer:
        "You can reach Villa Estelita here:\n\nPhone / SMS: 0999 228 6117\nFacebook: facebook.com/VillaEstelitaIdian (@VillaEstelitaIdian)\nBook online: Airbnb — tap Book Here on this website\n\nFor availability, rates, or special requests, call or message us on Facebook Messenger. Scroll to the Contact section on this page for direct links.",
    },
    {
      id: "facebook",
      keywords: [
        "facebook",
        "fb",
        "social media",
        "messenger",
        "facebook page",
        "your facebook",
        "fb page",
        "villaestelitaidian",
      ],
      answer:
        "Our official Facebook page is facebook.com/VillaEstelitaIdian (@VillaEstelitaIdian).\n\nMessage us there for inquiries, photos, and updates. You can also call or text 0999 228 6117.",
    },
    {
      id: "response-time",
      keywords: ["how fast", "response", "reply", "24/7", "support hours"],
      answer:
        "We aim to reply to Facebook messages and texts as soon as possible during the day. For the fastest answer, call 0999 228 6117. During an active booking, our on-site team can assist your group directly.",
    },
    {
      id: "hidden-charges",
      keywords: ["hidden", "hidden charge", "extra fee", "additional cost", "surprise fee"],
      answer:
        "Published packages include 3 rooms, 3 extra mattresses, and videoke for up to 15 guests. Extra person fee: ₱150/pax above 15. Gas stove fee: ₱500 (Airbnb guests exempt). Bring your own towels, toiletries, and kitchen utensils.",
    },
    {
      id: "total-price",
      keywords: ["total", "total price", "total cost", "how much total", "package price"],
      answer:
        "Total price = package rate × number of days (for multi-day 21-hour stays), plus ₱150 per person above 15 guests, plus ₱500 if using the gas stove (Airbnb guests exempt). Current rates: Daytime ₱6,499 | Overnight ₱7,499 | 21 Hours ₱8,499.",
    },
    {
      id: "pool-safety",
      keywords: ["pool safety", "slippery", "wet floor", "running", "footwear", "swim attire", "shower before", "hygiene"],
      answer:
        "Pool & hygiene guidelines:\n• Use the toilet and shower before swimming\n• Wear proper swim attire\n• Do not run — floors can be slippery when wet\n• Wear appropriate footwear safe for wet surfaces\n• Adult supervision required for children at all times",
    },
    {
      id: "gas-stove",
      keywords: ["gas stove", "gas fee", "stove fee", "cooking stove", "caretaker", "lpg"],
      answer:
        "If you plan to use the gas stove, please inform the caretaker. There is a fee of ₱500. Guests who booked through Airbnb are exempt from this charge.",
    },
    {
      id: "staff-hours",
      keywords: ["staff", "caretaker", "last call", "8 pm", "8pm", "attendant", "request after"],
      answer:
        "The last call for our staff is 8:00 PM. No requests will be attended to after this time unless it is an emergency.",
    },
    {
      id: "occasion",
      keywords: ["occasion", "birthday party", "company outing", "event notification", "celebration notify"],
      answer:
        "Please inform our representative if you are having an occasion such as a birthday party, company outing, reunion, or similar event so we can prepare and assist your group accordingly.",
    },
    {
      id: "belongings",
      keywords: ["belongings", "secure items", "valuables", "leave outside", "car items", "lost items"],
      answer:
        "Please secure your belongings inside your rooms. Do not leave items outside or in your car. By entering the premises, guests acknowledge that the property owner is not responsible for loss or damage of personal items.",
    },
    {
      id: "stay-guidelines",
      keywords: [
        "stay guidelines",
        "guidelines",
        "important rules",
        "before stay",
        "house rules full",
        "rules and guidelines",
        "information for stay",
        "read before",
      ],
      answer:
        "Important rules & guidelines for your stay at Villa Estelita, Pagsanjan, Laguna:\n\n1. Videoke automatically turns off at 10:00 PM (Pagsanjan ordinance).\n2. 21-hour rate only: heated jacuzzi includes 30 minutes free use.\n3. Floors can be slippery when wet — no running; wear safe footwear.\n4. Secure belongings in your rooms — not outside or in your car.\n5. Groups exceeding 15 people: ₱150 extra per person.\n6. Gas stove use: inform caretaker — ₱500 fee (Airbnb guests exempt).\n7. Bring your own toiletries and towels.\n8. Loud music & videoke cut-off: 10:00 PM (police patrol at night).\n9. Kitchen: fridge, water dispenser (bring circle gallon), griller (bring charcoal), stove, microwave, rice cooker, frying pan, kettle, casserole, ladle. Bring plates, utensils & cooking wares.\n10. Bedding: pillows & blankets per bed provided; extra blankets welcome.\n11. Pets allowed — keep outside rooms in cages.\n12. Follow assigned check-in schedule — no waiting area for early arrivals.\n13. Staff last call: 8:00 PM (emergencies only after).\n14. Inform us if celebrating an occasion (birthday, company outing, etc.).\n\nDirections: Search \"Villa Estelita Pagsanjan Laguna\" on Waze or Google Maps.\n\nPool hygiene: shower before swimming, proper swim attire, no running.\n\nBy entering, guests accept that the owner is not liable for loss or damage of personal items.",
    },
    {
      id: "why-choose",
      keywords: ["why choose", "why book", "why stay", "recommend"],
      answer:
        "Choose Villa Estelita for exclusive privacy, a heated pool, spacious gathering areas, videoke, and a beautiful pool courtyard — all for your group alone. Ideal for families, celebrations, and retreats without the crowds of a public resort.",
    },
  ],
};
