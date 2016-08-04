import React, { Component, PropTypes as pt } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import ivCalculator from 'pokemon-go-iv-calculator';

export default class PokemonRow extends Component {
  static propTypes = {
    name: pt.string,
    species: pt.string.isRequired,
    cp: pt.number.isRequired,
    hp: pt.number.isRequired,
    nextDust: pt.number.isRequired,
  }

  render() {
    const { name, species, cp, hp, nextDust } = this.props;
    const stats = ivCalculator.evaluate(species, cp, hp, nextDust);

    const rangeReducer = ([min, max], b) => [Math.min(min, b), Math.max(max, b)];
    const rangeStart = [Infinity, -Infinity];

    const levelRange = stats.ivs.map(iv => iv.level / 2).reduce(rangeReducer, rangeStart);
    const attRange = stats.ivs.map(iv => iv.attackIV).reduce(rangeReducer, rangeStart);
    const defRange = stats.ivs.map(iv => iv.defenseIV).reduce(rangeReducer, rangeStart);
    const staRange = stats.ivs.map(iv => iv.staminaIV).reduce(rangeReducer, rangeStart);
    const perfectRange = stats.ivs.map(iv => iv.perfection * 100).reduce(rangeReducer, rangeStart);

    return (
      <TableRow>
        <TableRowColumn>{name || '<None>'}</TableRowColumn>
        <TableRowColumn>{species}</TableRowColumn>
        <TableRowColumn>{cp}</TableRowColumn>
        <TableRowColumn>{hp}</TableRowColumn>
        <TableRowColumn>{nextDust}</TableRowColumn>

        <TableRowColumn><RangeDisplay range={levelRange} /></TableRowColumn>
        <TableRowColumn><RangeDisplay range={attRange} /></TableRowColumn>
        <TableRowColumn><RangeDisplay range={defRange} /></TableRowColumn>
        <TableRowColumn><RangeDisplay range={staRange} /></TableRowColumn>
        <TableRowColumn><RangeDisplay range={perfectRange} />%</TableRowColumn>
      </TableRow>
    );
  }
}

function RangeDisplay({ range }) {
  if (range[0] === range[1]) {
    return <span>range[0]</span>;
  } else {
    return <span>{range[0]}{' - '}{range[1]}</span>;
  }
}
RangeDisplay.propTypes = {
  range: pt.array.isRequired,
};
