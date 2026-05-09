export const WHATSAPP_NUMBER = '237671122318'

export function buildMessage({ name, description, serviceName, packageName, price, currency = 'XAF' }) {
  return [
    `Hi, I'm ${name} \u{1F44B}`,
    `Interested in ${serviceName} — ${packageName} at ${price.toLocaleString()} ${currency}.`,
    ``,
    `Here's what I'm working on:`,
    description
  ].join('\n')
}

export function buildWhatsAppURL(message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}
