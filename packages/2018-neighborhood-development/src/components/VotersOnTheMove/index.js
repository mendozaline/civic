import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class VotersOnTheMove extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Voters on the Move"
        slug="voters-on-the-move"
      >
        <Placeholder issue="201"/>
      </CivicStoryCard>
    );
  }
}

VotersOnTheMove.displayName = 'VotersOnTheMove';

// Connect this to the redux store when necessary
export default VotersOnTheMove;
