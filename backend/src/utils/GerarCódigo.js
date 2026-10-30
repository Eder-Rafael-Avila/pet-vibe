import { randomInt } from 'node:crypto';

export function GerarCodigo(){
const codigo = randomInt(0, 10000).toString().padStart(4, '0');

setInterval(() => {
  codigo = GerarCodigo();
}, 10 * 60 * 1000);

return codigo;
}
