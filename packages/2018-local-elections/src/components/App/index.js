import React from 'react';

import '@hackoregon/component-library/assets/global.styles.css';
import { PageLayout } from '@hackoregon/component-library';
import IncreasingVolumeOfMoney from '../IncreasingVolumeOfMoney';
import HowMuchDoesMoneyMatterInElections from '../HowMuchDoesMoneyMatterInElections';
import OutraisingYourOpponent from '../OutraisingYourOpponent';
import SuccessfulSpendingPatterns from '../SuccessfulSpendingPatterns';
import InfluentialContributorCohorts from '../InfluentialContributorCohorts';
import MeasuringThePowerOfGrassroots from '../MeasuringThePowerOfGrassroots';
import YourVoteHasAPriceTag from '../YourVoteHasAPriceTag';
import PrimariesArePredictive from '../PrimariesArePredictive';
import IsPartyAffiliationRelevant from '../IsPartyAffiliationRelevant';
import RealTimeInformationOnPoliticalCampaigns from '../RealTimeInformationOnPoliticalCampaigns';

const App = () => (
  <PageLayout
    teamTitle="Local Elections"
    heroTitle="Quantifying Influence and Understanding the Impact of Money in our Political System"
  >
    <p className="small">The amount of money in our political system has been increasing over time, with a lot of focus on national elections.  Very little is known about how money influences our state and local elections. This project seeks to move beyond simply money in politics and national campaigns to examine how an increasing volume of money flowing into Oregon election influences who wins, and even whose name goes on the primary ballot. This project used data science, machine learning and AI to analyze data from over a million transactions totaling over $1.5B exchanged between candidates, businesses, PACs, unions and state parties since 2002, including the nearly 33% of contributions from outside Oregon.</p>
    <p className="small">The charts below use a predictive analytics method called PR curves to visualize the fitness (or estimated degree of accuracy) of a predictive algorithm. The curve represents the tension between precision and recall. High precision correlates to a low false positive rate, while high recall means a low false negative rate. A superior algorithm produces a PR curve with more area under the curve (or a higher AUC), and an inferior algorithm will have a lower AUC. An ideal (or perfect) algorithm will have an AUC of 1 (the highest possible), meaning that for every recall threshold, precision is maxed out. In other words, the algorithm correctly classifies all records, both positive and negative, all the time.</p>
    <IncreasingVolumeOfMoney />
    {/* <HowMuchDoesMoneyMatterInElections /> */}
    <OutraisingYourOpponent />
    {/* <SuccessfulSpendingPatterns /> */}
    {/* <InfluentialContributorCohorts /> */}
    {/* <MeasuringThePowerOfGrassroots /> */}
    {/* <YourVoteHasAPriceTag /> */}
    {/* <PrimariesArePredictive /> */}
    {/* <IsPartyAffiliationRelevant /> */}
    <RealTimeInformationOnPoliticalCampaigns />
  </PageLayout>
);

App.displayName = 'App';

export default App;
