export function formatPrice(value: number) {
    const formattedNumber = Number(value).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
    return formattedNumber;
  }