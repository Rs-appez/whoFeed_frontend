import { ParTypes } from './par-types';
import { Tags } from './tags';

export interface Champion {
  id: number;
  name: string;
  fr_name: string;
  key: string;
  image: string;
  sprite: string;
  lore: string;
  fr_lore: string;
  title: string;
  fr_title: string;

  selected: boolean;

  tags: Tags[];
  par_types: ParTypes[];
}
