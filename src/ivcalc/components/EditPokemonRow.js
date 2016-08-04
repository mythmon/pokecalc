import React, { Component, PropTypes as pt } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class EditPokemonRow extends Component {
  static propTypes = {
    doChange: pt.func.isRequired,
    doCommit: pt.func.isRequired,
    pending: pt.shape({
      name: pt.string,
      species: pt.string,
      cp: pt.string,
      hp: pt.string,
      nextDust: pt.string,
    }).isRequired,
  }

  handleChange({ target: { name, value } }) {
    this.props.doChange(name, value);
  }

  render() {
    const { name, species, cp, hp, nextDust } = this.props.pending;

    return (
      <TableRow>
        <TableRowColumn>
          <TextField
            name="name"
            value={name}
            placeholder="Name"
            onChange={::this.handleChange}
          />
        </TableRowColumn>

        <TableRowColumn>
          <TextField
            name="species"
            value={species}
            placeholder="Species"
            onChange={::this.handleChange}
          />
        </TableRowColumn>

        <TableRowColumn>
          <TextField
            name="cp"
            value={cp}
            placeholder="CP"
            onChange={::this.handleChange}
          />
        </TableRowColumn>

        <TableRowColumn>
          <TextField
            name="hp"
            value={hp}
            placeholder="HP"
            onChange={::this.handleChange}
          />
        </TableRowColumn>

        <TableRowColumn>
          <TextField
            name="nextDust"
            value={nextDust}
            placeholder="Dust to powerup"
            onChange={::this.handleChange}
          />
        </TableRowColumn>

        <TableRowColumn>
          <RaisedButton label="Add" onClick={::this.props.doCommit} />
        </TableRowColumn>
      </TableRow>
    );
  }
}
