import { createAction, props } from '@ngrx/store';
import { Spelare } from '../models/spelare';

export const addPlayer = createAction('[Game Player] Add', props<{ spelare: Spelare }>());
export const removePlayer = createAction('[Game Player] Remove', props<{ spelareId: number }>());
export const reset = createAction('[Game] Reset');
export const nextPlayer = createAction('[Game Player] Next', props<{ spelareId: number }>());
export const loseLifePlayer = createAction('[Game Player] Lose Life', props<{ spelareId: number }>());
export const gainLifePlayer = createAction('[Game Player] Gain Life', props<{ spelareId: number }>());
