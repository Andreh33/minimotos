import { site } from "./site";

/**
 * Plantillas legales (ES). ⚠️ TODO:REVISIÓN-JURÍDICA — borradores orientativos,
 * deben ser revisados/aprobados por un profesional antes de publicar.
 */
export type LegalDoc = {
  title: string;
  intro: string;
  sections: { h: string; p: string }[];
};

export const legalDocs: Record<string, LegalDoc> = {
  "aviso-legal": {
    title: "Aviso legal",
    intro: `Información general del sitio de ${site.name} (${site.legalName}), conforme a la LSSI-CE.`,
    sections: [
      { h: "Titular", p: `${site.legalName}. Domicilio: ${site.address}. Email: ${site.email}. (TODO:DATO-REAL — NIF/CIF, datos registrales y teléfono.)` },
      { h: "Objeto", p: "Este sitio ofrece información y venta de minimotos, quads, pit bikes, buggies, equipación y recambios, así como servicios de taller." },
      { h: "Propiedad intelectual", p: "Los contenidos, marca y diseño pertenecen a su titular o se usan con autorización. Queda prohibida su reproducción sin permiso." },
      { h: "Responsabilidad", p: "El titular no se responsabiliza del mal uso de los contenidos ni de daños derivados del uso del sitio." },
      { h: "Legislación", p: "Estas condiciones se rigen por la legislación española. (TODO:REVISIÓN-JURÍDICA.)" },
    ],
  },
  privacidad: {
    title: "Política de privacidad",
    intro: "Cómo tratamos tus datos personales conforme al RGPD y la LOPDGDD.",
    sections: [
      { h: "Responsable", p: `${site.legalName}. Email: ${site.email}.` },
      { h: "Finalidad", p: "Gestionar consultas, pedidos, citas de taller y, si lo autorizas, comunicaciones comerciales (newsletter)." },
      { h: "Legitimación", p: "Consentimiento del interesado y/o ejecución de una relación contractual o precontractual." },
      { h: "Conservación", p: "Conservamos los datos el tiempo necesario para la finalidad y mientras existan obligaciones legales." },
      { h: "Derechos", p: `Puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${site.email}.` },
      { h: "Encargados", p: "Usamos proveedores (alojamiento, pagos, email) que tratan datos por nuestra cuenta con garantías adecuadas. (TODO:REVISIÓN-JURÍDICA.)" },
    ],
  },
  cookies: {
    title: "Política de cookies",
    intro: "Información sobre las cookies y tecnologías similares que utiliza este sitio.",
    sections: [
      { h: "Qué son", p: "Pequeños archivos que se almacenan en tu dispositivo para el funcionamiento del sitio y, opcionalmente, análisis." },
      { h: "Cookies técnicas", p: "Necesarias para el funcionamiento (carrito, preferencias). No requieren consentimiento." },
      { h: "Cookies de análisis/terceros", p: "Si se incorporan (p. ej. analítica), se solicitará tu consentimiento. (TODO:DATO-REAL — listar proveedores cuando se activen.)" },
      { h: "Gestión", p: "Puedes configurar o bloquear las cookies desde tu navegador. (TODO:REVISIÓN-JURÍDICA.)" },
    ],
  },
  devoluciones: {
    title: "Devoluciones y garantía",
    intro: "Condiciones de devolución, desistimiento y garantía de los productos.",
    sections: [
      { h: "Desistimiento", p: "Dispones de 14 días naturales para desistir de compras a distancia, salvo excepciones legales. (TODO:REVISIÓN-JURÍDICA.)" },
      { h: "Garantía", p: "Los productos cuentan con la garantía legal aplicable según la normativa de consumo vigente." },
      { h: "Cómo tramitar", p: `Escríbenos a ${site.email} o por WhatsApp indicando tu pedido y el motivo.` },
      { h: "Vehículos", p: "Para vehículos (minimotos, quads, pit bikes, buggies) consulta condiciones específicas de entrega, matriculación y financiación en tienda." },
    ],
  },
};

export const legalSlugs = Object.keys(legalDocs);
