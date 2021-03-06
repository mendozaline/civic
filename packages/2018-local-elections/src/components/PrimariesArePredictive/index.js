import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class PrimariesArePredictive extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Primaries are Predictive"
        slug="primaries-are-predictive"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

PrimariesArePredictive.displayName = 'PrimariesArePredictive';

// Connect this to the redux store when necessary
export default PrimariesArePredictive;
