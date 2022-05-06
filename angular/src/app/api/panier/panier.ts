import {LigneDepense} from "./ligneDepense";

export class Panier {
  id!: number;
  dateAchat!: Date;
  sign!: string;
  total!: number;
  ligneDepenses!: LigneDepense[];
}
