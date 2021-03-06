/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as d3 from 'd3';
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { CivicSandboxMap } from '../src';
import CivicSandboxTooltip from '../src/CivicSandboxMap/CivicSandboxTooltip';
import { CivicSandboxDashboard } from '../src';
import { css } from 'emotion';
import { wallOfText } from './shared';

const dashboardInfo = css`
  padding: 0 1% 0 7.5%;
`;

const displayName = CivicSandboxDashboard.displayName || 'CivicSandboxDashboard';

class LoadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation1: null,
      slide1: null,
      slide2: null,
      error: null,
    };
  }

  componentDidMount() {
    let cmp = this;
    d3.queue()
      .defer(d3.json, this.props.urls[0])
      .defer(d3.json, this.props.urls[1])
      .defer(d3.json, this.props.urls[2])
      .await((error, foundation1, slide1, slide2) => {
        if (error) { return this.setState({error: error}) }
        cmp.setState({foundation1, slide1, slide2});
      });
  }

  render() {
    if (this.state.data1 === null) { return null }
    const { foundation1, slide1, slide2 } = this.state;
    return this.props.children(foundation1, slide1, slide2);
  }
}

const dataURLs = [
  'https://gist.githubusercontent.com/mendozaline/f78b076ce13a9fd484f6b8a004065a95/raw/ff8bd893ba1890a6f6c20265f720587f9595a9c4/pop.json',
  'https://gist.githubusercontent.com/mendozaline/b3a75b40c9a60781b6adc77cebb9b400/raw/fa0aa13c75bfcc2fd92ccf1f3cc612af83d5d704/002-bike-lanes.json',
  'https://gist.githubusercontent.com/mendozaline/b3a75b40c9a60781b6adc77cebb9b400/raw/fa0aa13c75bfcc2fd92ccf1f3cc612af83d5d704/010-grocery.json',
];

export default () => storiesOf(displayName, module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add('Simple usage', () => (
    <LoadData urls={dataURLs}>
      {
        (foundation1, slide1, slide2) => {
          if (foundation1 === null) { return null }

          const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';
          const mapStyleOptions = {
            'Hack Oregon Light': 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
            'Hack Oregon Dark': 'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
            'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
            'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
            'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
            'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
            'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
          };
          const mapboxStyle = selectV2('Mapbox Style', mapStyleOptions, mapStyleOptions['Hack Oregon Light']);

          const opacityOptions = {
            range: true,
            min: 0,
            max: 1,
            step: 0.05,
          };
          const opacity = number('Opacity:', 0.75, opacityOptions);

          const colorOptions = {
            'Thermal': '[[255,255,204,255],[255,237,160,255],[254,217,118,255],[254,178,76,255],[253,141,60,255],[252,78,42,255],[227,26,28,255],[189,0,38,255],[128,0,38,255]]',
            'Planet': '[[247,244,249,255],[231,225,239,255],[212,185,218,255],[201,148,199,255],[223,101,176,255],[231,41,138,255],[206,18,86,255],[152,0,67,255],[103,0,31,255]]',
            'Space': '[[247,252,253,255],[224,236,244,255],[191,211,230,255],[158,188,218,255],[140,150,198,255],[140,107,177,255],[136,65,157,255],[129,15,124,255],[77,0,75,255]]',
            'Earth': '[[255,247,251,255],[236,226,240,255],[208,209,230,255],[166,189,219,255],[103,169,207,255],[54,144,192,255],[2,129,138,255],[1,108,89,255],[1,70,54,255]]',
            'Ocean': '[[255,255,217,255],[237,248,177,255],[199,233,180,255],[127,205,187,255],[65,182,196,255],[29,145,192,255],[34,94,168,255],[37,52,148,255],[8,29,88,255]]',
          };
          const colorScheme = selectV2('Color Schemes:', colorOptions, colorOptions['Ocean']);
          const colorSchemeArray = JSON.parse(colorScheme);

          const populationGetColor = f => {
            const population = parseFloat(f.properties.total_population); 
            return population < 3000 ? colorSchemeArray[0] :
              population < 8000 ? colorSchemeArray[1] :
              population < 12000 ? colorSchemeArray[2] :
              population < 16000 ? colorSchemeArray[3] :
              population < 20000 ? colorSchemeArray[4] :
              population < 24000 ? colorSchemeArray[5] :
              population < 28000 ? colorSchemeArray[6] :
              population < 32000 ? colorSchemeArray[7] :
              colorSchemeArray[8];
          };

          const foundation = {
            mapType: 'ChoroplethMap',
            id: 'choropleth-layer-foundation-population',
            pickable: true,
            data: foundation1.slide_data.features,
            opacity: opacity,
            getPolygon: f => f.geometry.coordinates,
            getLineColor: f => [0,0,0,255],
            getLineWidth: f => 50,
            stroked: true,
            getFillColor: populationGetColor,
            filled: true,
            onClick: info => action('Layer clicked:', { depth: 2 })(info, info.object),
            autoHighlight: true,
            highlightColor: [200,200,200,150],
            updateTriggers: {getFillColor: populationGetColor},
          };

          //SLIDES
          //002 Bike Lanes
          const bikeLanesBoundary = {
            mapType: 'PolygonPlotMap',
            id: 'boundary-layer-bike-lanes',
            data: slide1.slide_meta.boundary,
            opacity: 1,
            filled: false,
            getPolygon: f => f.coordinates,
            getLineColor: f => [220,69,86,255],
            getLineWidth: f => 55,
            lineWidthScale: 1,
            lineJointRounded: false,
          };
          const bikeLanesMap = {
            mapType: 'PathMap',
            id: 'path-layer-bike-lanes',
            pickable: true,
            data: slide1.slide_data.features,
            opacity: 1,
            getColor: f => [220,69,86,255],
            getPath: f => f.geometry.coordinates,
            getWidth: f => 40,
            rounded: false,
            autoHighlight: true,
            highlightColor: [200,200,200,100],
          };

          //010 Grocery Stores
          const groceryBoundary = {
            mapType: 'PolygonPlotMap',
            id: 'boundary-layer-grocery',
            data: slide2.slide_meta.boundary,
            opacity: 1,
            filled: false,
            getPolygon: f => f.coordinates,
            getLineColor: f => [138,43,226,255],
            getLineWidth: f => 45,
            lineWidthScale: 1,
            lineJointRounded: false,
          };
          const groceryMap = {
            mapType: 'ScatterPlotMap',
            id: 'scatterplot-layer-grocery',
            pickable: true,
            data: slide2.slide_data.features,
            getPosition: f => f.geometry.coordinates,
            opacity: 0.9,
            getColor: f => [138,43,226,255],
            getRadius: f => 75,
            radiusScale: 1,
            radiusMinPixels: 1,
            autoHighlight: true,
            parameters: { depthTest: false },
            highlightColor: [200,200,200,255],
          };

          const bikeLanesSlideVisible = boolean('Bike Lanes:', true);
          const grocerySlideVisible = boolean('Grocery Stores:', true);

          const allMapLayers = [
            {
              "data": foundation,
              "visible": true,
            },
            {
              "data": bikeLanesBoundary,
              "visible": bikeLanesSlideVisible,
            },
            {
              "data": bikeLanesMap,
              "visible": bikeLanesSlideVisible,
            },
            {
              "data": groceryBoundary,
              "visible": grocerySlideVisible,
            },
            {
              "data": groceryMap,
              "visible": grocerySlideVisible,
            },
          ];

          const mapLayersArray = allMapLayers.filter(d => {
            if (d.visible === true) { return d.data }
          });

          //dashboard data
          const mockData = [
            {
              visualizationType: 'Text',
              title: 'Population',
              data: 245450,
            },
            {
              visualizationType: 'PieChart',
              title: 'Percentage White/Non-White',
              data: [{'x': 1, 'y': 40}, {'x': 2, 'y': 60}],
            },
          ];

          return (
            <div style={{position:"relative"}}>
              <BaseMap
                mapboxToken={mapboxToken}
                mapboxStyle={mapboxStyle}
                initialZoom={10.1}
                initialLatitude={45.5445}
                initialLongitude={-122.5599}
              >
                <CivicSandboxMap mapLayers={mapLayersArray}>
                  <CivicSandboxTooltip/>
                </CivicSandboxMap>
              </BaseMap>
              <CivicSandboxDashboard data={mockData}>
                <div className={dashboardInfo}>
                  <h2>How has ridership changed throughout Tri-Met's service area over time?</h2>
                  <p>{wallOfText}</p>
                  <h4>Source: census.gov ACS</h4>
                </div>
              </CivicSandboxDashboard>
            </div>
          );
      }}
    </LoadData>
  ));
