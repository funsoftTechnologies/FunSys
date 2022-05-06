import {LigneDepense} from "../panier/ligneDepense";

export class Achat {
  id!: number;
  dateAchat!: Date;
  sign!: string;
  total!: number;
  ligneDepenses!: LigneDepense[];
}
