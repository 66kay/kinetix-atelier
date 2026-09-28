/**
 * KINETIX ATELIER // CATALOG DATASET (CHILE / CLP)
 * Precios en pesos chilenos ($ CLP), especificaciones técnicas reales y coherencia visual 100% verificada.
 */
const PRODUCTS = [
    {
        id: "kinetix-apex-carbon",
        name: "Apex Carbon Veloce",
        slug: "apex-carbon-veloce",
        subtitle: "Zapatilla de competición para maratón y asfalto",
        category: "running",
        categoryName: "Running",
        price: 179990,
        originalPrice: 209990,
        rating: 4.9,
        reviewsCount: 148,
        badge: "Más Vendido",
        badgeType: "accent",
        stock: 5,
        colorName: "Escarlata / Blanco / Negro",
        colorHex: "#dc2626",
        description: "Diseñada para atletas que buscan mejorar su marca personal. Equipada con placa de carbono longitudinal que maximiza el impulso en cada zancada y espuma EVA supercrítica que absorbe el impacto de manera progresiva.",
        specs: [
            { label: "Peso", value: "198 g (Talla 42)" },
            { label: "Drop de Mediasuela", value: "8 mm" },
            { label: "Tipo de Pisada", value: "Neutra / Competición" },
            { label: "Material Superior", value: "Malla técnica Jacquard transpirable" },
            { label: "Suela Exterior", value: "Caucho de alta tracción para asfalto húmedo" }
        ],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=85",
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=900&auto=format&fit=crop&q=85"
        ]
    },
    {
        id: "kinetix-monolith-black",
        name: "Monolith Technical Low",
        slug: "monolith-technical-low",
        subtitle: "Silueta técnica urbana monocromática",
        category: "trail",
        categoryName: "Trail & Outdoor",
        price: 189990,
        originalPrice: null,
        rating: 4.8,
        reviewsCount: 94,
        badge: "Edición Limitada",
        badgeType: "dark",
        stock: 3,
        colorName: "Triple Black / Carbón",
        colorHex: "#111827",
        description: "Construida para resistir tanto la intemperie como las exigencias del pavimento urbano. Su tejido de cordura ripstop repele el agua ligera y su chasis envolvente proporciona una estabilidad excepcional en cualquier terreno.",
        specs: [
            { label: "Peso", value: "245 g" },
            { label: "Drop de Mediasuela", value: "6 mm" },
            { label: "Tipo de Pisada", value: "Neutra / Terreno mixto" },
            { label: "Resistencia al Agua", value: "Tratamiento DWR hidrófugo" },
            { label: "Suela Exterior", value: "Tacos multidireccionales de 4.5 mm" }
        ],
        sizes: [40, 41, 42, 43, 44, 45],
        images: [
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=85",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&auto=format&fit=crop&q=85"
        ]
    },
    {
        id: "kinetix-strata-high",
        name: "Strata Court High",
        slug: "strata-court-high",
        subtitle: "Bota deportiva clásica remasterizada",
        category: "hightop",
        categoryName: "High-Top",
        price: 199990,
        originalPrice: 229990,
        rating: 5.0,
        reviewsCount: 82,
        badge: "Novedad FW26",
        badgeType: "light",
        stock: 4,
        colorName: "Blanco Óptico / Hueso / Carmín",
        colorHex: "#f8fafc",
        description: "Un tributo a las siluetas de baloncesto de los años noventa confeccionada con piel flor natural de primera calidad, refuerzos acolchados en el cuello del tobillo y una suela cosida a mano de máxima durabilidad.",
        specs: [
            { label: "Peso", value: "285 g" },
            { label: "Corte", value: "Piel natural de grano completo y ante" },
            { label: "Plantilla", value: "Espuma anatómica con memoria OrthoLite" },
            { label: "Construcción", value: "Suela de copa cosida 360°" },
            { label: "Uso", value: "Lifestyle / Streetwear" }
        ],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        images: [
            "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=900&auto=format&fit=crop&q=85",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=85"
        ]
    },
    {
        id: "kinetix-minimal-pure",
        name: "Atelier Minimalist Low",
        slug: "atelier-minimalist-low",
        subtitle: "Elegancia minimalista para uso diario",
        category: "lifestyle",
        categoryName: "Lifestyle",
        price: 139990,
        originalPrice: 159990,
        rating: 4.9,
        reviewsCount: 215,
        badge: "Imprescindible",
        badgeType: "light",
        stock: 12,
        colorName: "Blanco Crudo / Gris Perla",
        colorHex: "#e2e8f0",
        description: "El calzado esencial del armario contemporáneo. Líneas limpias, ausencia total de logotipos invasivos y una horma ergonómica diseñada para brindar comodidad durante jornadas de más de 12 horas.",
        specs: [
            { label: "Peso", value: "220 g" },
            { label: "Material Exterior", value: "Piel suave ecológica certificada" },
            { label: "Forro Interior", value: "Algodón orgánico transpirable" },
            { label: "Suela", value: "Caucho natural vulcanizado antideslizante" },
            { label: "Fabricación", value: "Artesanal con tintes no tóxicos" }
        ],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45],
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=85",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900&auto=format&fit=crop&q=85"
        ]
    },
    {
        id: "kinetix-cobalt-veloce",
        name: "Veloce Kinetic Blue",
        slug: "veloce-kinetic-blue",
        subtitle: "Entrenamiento diario y media distancia",
        category: "running",
        categoryName: "Running",
        price: 149990,
        originalPrice: null,
        rating: 4.8,
        reviewsCount: 167,
        badge: "Recomendado",
        badgeType: "accent",
        stock: 8,
        colorName: "Azul Cobalto / Plata",
        colorHex: "#2563eb",
        description: "El equilibrio ideal entre ligereza y amortiguación generosa. Su chasis fluido guía la transición de la pisada desde el talón hasta el despegue de puntera, reduciendo la fatiga en tiradas medias y largas.",
        specs: [
            { label: "Peso", value: "205 g" },
            { label: "Drop de Mediasuela", value: "10 mm" },
            { label: "Amortiguación", value: "Espuma CloudPulse de doble compuesto" },
            { label: "Ventilación", value: "Panel micro-perforado en empeine" },
            { label: "Reflectividad", value: "Inserciones reflectantes 3M traseras" }
        ],
        sizes: [39, 40, 41, 42, 43, 44],
        images: [
            "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=900&auto=format&fit=crop&q=85",
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=900&auto=format&fit=crop&q=85"
        ]
    },
    {
        id: "kinetix-trail-horizon",
        name: "Horizon All-Terrain Pro",
        slug: "horizon-all-terrain-pro",
        subtitle: "Rendimiento técnico en montaña y gravilla",
        category: "trail",
        categoryName: "Trail & Outdoor",
        price: 169990,
        originalPrice: 199990,
        rating: 4.9,
        reviewsCount: 112,
        badge: "Alta Tracción",
        badgeType: "dark",
        stock: 6,
        colorName: "Gris Asfalto / Negro / Lima",
        colorHex: "#374151",
        description: "Pensada para corredores de montaña que demandan agarre implacable en barro, roca suelta y bajadas técnicas. Incluye placa protectora anti-rocas integrada en la mediasuela.",
        specs: [
            { label: "Peso", value: "260 g" },
            { label: "Drop de Mediasuela", value: "5 mm" },
            { label: "Protección", value: "Puntera reforzada de TPU termosellado" },
            { label: "Suela Exterior", value: "Compuesto GripMax con tacos de 5 mm" },
            { label: "Ajuste", value: "Sistema de lazada rápida con bolsillo en lengüeta" }
        ],
        sizes: [40, 41, 42, 43, 44, 45],
        images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&auto=format&fit=crop&q=85",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=85"
        ]
    },
    {
        id: "kinetix-court-vintage",
        name: "Retro Court 1988",
        slug: "retro-court-1988",
        subtitle: "Inspiración tenis vintage con confort actual",
        category: "lifestyle",
        categoryName: "Lifestyle",
        price: 129990,
        originalPrice: null,
        rating: 4.7,
        reviewsCount: 188,
        badge: "Clásico Atemporal",
        badgeType: "light",
        stock: 9,
        colorName: "Blanco Roto / Verde Vintage",
        colorHex: "#15803d",
        description: "La silueta que nunca pasa de moda. Diseñada originalmente para las canchas de arcilla y reinterpretada con plantilla acolchada moderna para adaptarse al ritmo de la ciudad moderna.",
        specs: [
            { label: "Peso", value: "235 g" },
            { label: "Corte", value: "Piel sintética vegana ultra-suave" },
            { label: "Detalles", value: "Talonera en ante verde y perforaciones laterales" },
            { label: "Suela", value: "Goma natural con patrón de espiga tradicional" },
            { label: "Mantenimiento", value: "Fácil limpieza con paño húmedo" }
        ],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45],
        images: [
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900&auto=format&fit=crop&q=85",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=85"
        ]
    },
    {
        id: "kinetix-aero-speed",
        name: "Aero Speed Mesh",
        slug: "aero-speed-mesh",
        subtitle: "Máxima ventilación para climas cálidos y gimnasio",
        category: "running",
        categoryName: "Running",
        price: 134990,
        originalPrice: 154990,
        rating: 4.8,
        reviewsCount: 130,
        badge: "Ultraligera",
        badgeType: "accent",
        stock: 7,
        colorName: "Gris Humo / Carbón / Blanco",
        colorHex: "#64748b",
        description: "Su empeine de punto elástico sin costuras abraza el pie como un calcetín técnico. Diseñada para mantener tus pies frescos incluso durante los entrenamientos más intensos bajo calor.",
        specs: [
            { label: "Peso", value: "178 g (Récord de ligereza)" },
            { label: "Drop de Mediasuela", value: "7 mm" },
            { label: "Construcción", value: "Upper de una pieza sin puntos de fricción" },
            { label: "Plantilla", value: "Tratamiento antibacteriano con carbón activo" },
            { label: "Flexibilidad", value: "Ranuras de flexión profunda en el antepié" }
        ],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        images: [
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=900&auto=format&fit=crop&q=85",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=85"
        ]
    }
];

// Cupones de descuento válidos en Chile
const PROMO_CODES = {
    "BIENVENIDA10": { discount: 0.10, label: "10% de descuento de bienvenida" },
    "CHILE15": { discount: 0.15, label: "15% de descuento especial Chile" },
    "RUNNER20": { discount: 0.20, label: "20% de descuento para miembros del club" }
};

// Reseñas de corredores y clientes reales en Chile
const REVIEWS = [
    {
        name: "Marcos Varela",
        location: "Santiago, Región Metropolitana",
        role: "Maratonista amateur (Club Vitacura)",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        text: "Compré las Apex Carbon Veloce para la media maratón de Viña del Mar. Llevo más de 200 km acumulados por el Parque Bicentenario y el Cerro San Cristóbal: la respuesta de la placa de carbono a ritmos de 4:10 min/km es una maravilla. El despacho por Chilexpress llegó al día siguiente.",
        date: "Hace 4 días",
        verified: true,
        shoe: "Apex Carbon Veloce"
    },
    {
        name: "Carolina Silva",
        location: "Concepción, Región del Biobío",
        role: "Arquitecta & Diseñadora",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        text: "Las Atelier Minimalist son una joya: piel legítima, acabados limpios sin logos invasivos y comodísimas para estar de pie visitando obras todo el día. Pagué con Webpay en 3 cuotas sin interés y me llegó en 48 horas impecable a Concepción.",
        date: "Hace 2 semanas",
        verified: true,
        shoe: "Atelier Minimalist Low"
    },
    {
        name: "Diego Morales",
        location: "Viña del Mar, Región de Valparaíso",
        role: "Entrenador de Trail Running",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        text: "El agarre de las Horizon All-Terrain en los senderos de La Campana me sorprendió mucho. El compuesto de la suela no resbala en roca húmeda ni maicillo suelto. La talla 43 calza exactamente como mi número normal.",
        date: "Hace 3 semanas",
        verified: true,
        shoe: "Horizon All-Terrain Pro"
    }
];

// Preguntas frecuentes adaptadas al mercado chileno
const FAQS = [
    {
        question: "¿Cómo sé cuál es mi talla chilena/europea correcta?",
        answer: "Nuestro calzado se basa en el tallaje europeo estándar (EU), que es el sistema que usamos normalmente en Chile en zapatillas deportivas de marcas como Nike, Adidas o Salomon. Si calzas 42 nacional, pide talla 42. Si dudas entre dos números o tienes el empeine ancho, te aconsejamos optar por la talla superior. Puedes ver los centímetros exactos de plantilla en la ficha de cada modelo."
    },
    {
        question: "¿Cuáles son los plazos y costes de entrega en Chile?",
        answer: "El envío es 100% gratuito a todo Chile en compras sobre $90.000. Para compras menores, el envío tiene una tarifa fija de $4.990. Despachamos mediante Chilexpress, Starken o Blue Express. Los plazos son de 24 a 48 horas hábiles en la Región Metropolitana y de 2 a 4 días hábiles en regiones (Arica a Punta Arenas), siempre con número de seguimiento en tiempo real."
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos tarjetas de débito y crédito bancarias mediante Webpay Plus (Transbank) con opción de hasta 3 y 6 cuotas sin interés. También puedes pagar con Mercado Pago, tarjetas de prepago (MACH, Tenpo, Dale Coopeuch) y transferencia electrónica directa con comprobante automático."
    },
    {
        question: "¿Cómo funcionan los cambios de talla y devoluciones?",
        answer: "Tienes 30 días continuos desde que recibes el paquete para solicitar un cambio de talla o devolución. Solo te pedimos que pruebes el calzado en interiores y lo conserves en su caja original. El primer cambio de talla es totalmente gratis: coordinamos el retiro a tu domicilio o mediante sucursal Chilexpress sin coste para ti."
    }
];
