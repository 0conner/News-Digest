import {HomeScreen} from '../App';
import {StoryScreen} from '../App';
test('HomeScreen',()=>{
    expect(HomeScreen()).toBeCalled();
});

test('StoryScreen',()=>{
    expect(StoryScreen()).toBeCalled();
});