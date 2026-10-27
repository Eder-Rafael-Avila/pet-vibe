import { randomInt } from 'node:crypto';

export function GerarCodigo(){
const codigo = randomInt(0, 10000).toString().padStart(4, '0');
return codigo;
}
