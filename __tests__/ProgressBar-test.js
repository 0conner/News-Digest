import 'react-native';
import React from 'react';
import ProgressBar from '../components/ProgressBar';
import renderer from 'react-test-renderer';

test('Details snapShot', ()=>{
    const snap=renderer.create(
        <ProgressBar />
    ).toJSON();
expect(snap).toMatchSnapshot();
});