import { createReducer, on, Action, State } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { addPlayer, removePlayer, reset, gainLifePlayer, loseLifePlayer, nextPlayer } from '../actions/spelare.actions';
import { Spelare } from '../models/spelare';

export interface SpelareState extends EntityState<Spelare> {
  next: number | null;
  lostLife: number | null;
  gainedLife: number | null;
}

export const adapter: EntityAdapter<Spelare> = createEntityAdapter<Spelare>();

export const initialState = adapter.getInitialState({
  next: null,
  lostLife: null,
  gainedLife: null
});


// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of spelare ids
export const selectSpelareIds = selectIds;

// select the dictionary of Spelare entities
export const selectSpelareEntities = selectEntities;

// select the array of Spelare
export const selectAllSpelares = selectAll;

// select the total Spelare count
export const selectSpelareTotal = selectTotal;

export const spelareReducer = createReducer(
  initialState,
  on(addPlayer, (state, { spelare }) => {
    return adapter.addOne(spelare, state);
  }),
  on(removePlayer, (state, { spelareId }) => {
    return adapter.removeOne(spelareId, state);
  }),
  on(reset, () => {
    return this.initialState;
  }),
  on(nextPlayer, (state, { spelareId }) => ({...state, next: spelareId })),
  on(loseLifePlayer,
    (state, { spelareId }) => {
      const spelare = selectSpelareEntities[spelareId];
      if (spelare.liv > 0) {
        adapter.updateOne({ id: spelare.id, changes: { liv: spelare.liv--}}, state);
      }
      return {...state, lostLife: spelareId };
    }
  ),
  on(gainLifePlayer,
    (state, { spelareId }) => {
      const spelare = selectSpelareEntities[spelareId];
      if (spelare.liv < 2) {
        adapter.updateOne({ id: spelare.id, changes: { liv: spelare.liv++}}, state);
      }
      return {...state, gainedLife: spelareId };
    }
  ),
);

export function reducer(state: SpelareState | undefined, action: Action) {
  return spelareReducer(state, action);
}
