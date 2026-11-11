import { randomInt } from 'node:crypto';

export function GerarCodigo(){
  return randomInt(0, 10000).toString().padStart(4, '0');
}

export function GerarCodigoOng(){
  return randomInt(0, 10000).toString().padStart(4, '0');
}

export function GerarCodigoCadastroUsuario() {
  return randomInt(0, 10000).toString().padStart(4, '0');
}