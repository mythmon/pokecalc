import React, { Component, PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
} from 'material-ui/Table';

import { startEditing, changePending, commitPending } from '../';
import PokemonRow from './PokemonRow.js';
import EditPokemonRow from './EditPokemonRow.js';

@connect(({ ivcalc }) => (
  {
    pokemon: Object.values(ivcalc.pokemonList).sort((a, b) => a.key - b.key),
    pendingPokemon: ivcalc.pendingPokemon,
  }
))
export default class PokemonTableContainer extends Component {
  static propTypes = {
    dispatch: pt.func.isRequired,
    pokemon: pt.arrayOf(pt.object).isRequired,
    pendingPokemon: pt.object,
  };

  render() {
    const { dispatch, pokemon, pendingPokemon } = this.props;

    const rowToKey = row => pokemon[row].key;

    return (
      <Paper>
        <Table onCellClick={row => dispatch(startEditing(rowToKey(row)))}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Species</TableHeaderColumn>
              <TableHeaderColumn>CP</TableHeaderColumn>
              <TableHeaderColumn>HP</TableHeaderColumn>
              <TableHeaderColumn>Next Dust</TableHeaderColumn>
              <TableHeaderColumn>Level</TableHeaderColumn>
              <TableHeaderColumn>ATT</TableHeaderColumn>
              <TableHeaderColumn>DEF</TableHeaderColumn>
              <TableHeaderColumn>STA</TableHeaderColumn>
              <TableHeaderColumn>IV %</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {pokemon.map(p => {
              if (p.key in pendingPokemon) {
                return (
                  <EditPokemonRow
                    key={p.key}
                    pending={pendingPokemon[p.key]}
                    doChange={(name, value) => dispatch(changePending(p.key, name, value))}
                    doCommit={() => dispatch(commitPending(p.key))}
                  />
                );
              } else {
                return <PokemonRow key={p.key} {...p} />;
              }
            })}
            <EditPokemonRow
              pending={pendingPokemon.next}
              doChange={(name, value) => dispatch(changePending('next', name, value))}
              doCommit={() => dispatch(commitPending('next'))}
            />
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
