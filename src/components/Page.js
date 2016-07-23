import React, { PropTypes as pt } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Page({ children }) {
  return (
    <MuiThemeProvider>
      <div className="wrapper">
        {children}
      </div>
    </MuiThemeProvider>
  );
}

Page.propTypes = {
  children: pt.oneOfType([pt.element, pt.arrayOf(pt.element)]).isRequired,
};
