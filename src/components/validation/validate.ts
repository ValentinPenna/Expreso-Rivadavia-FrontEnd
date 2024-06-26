import type { Quote, QuoteError } from "../QuoteShipping";

export default function validate(values: Quote): QuoteError {
  const errors: QuoteError = {};
  if (!values.origin) {
    errors.origin = "Por favor ingrese un origen";
  }
  if (!values.destination) {
    errors.destination = "Por favor ingrese un destino";
  }
  if (!values.weight) {
    errors.weight = "Por favor ingrese un peso";
  }
  if (!values.high) {
    errors.high = "Por favor ingrese una altura";
  }
  if (!values.long) {
    errors.long = "Por favor ingrese una longitud";
  }
  if (!values.widht) {
    errors.widht = "Por favor ingrese una ancho";
  }
  return errors;
 
}
