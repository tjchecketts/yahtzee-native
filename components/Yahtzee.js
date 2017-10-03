import React from 'react';
import { View } from 'react-native';
import Board from './Board';
import ScoreCard from './ScoreCard';

const Yahtzee = () => (
  <View>
    <ScoreCard />
    <Board />
  </View>
);

export default Yahtzee;