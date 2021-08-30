import React, {useRef, useState, useEffect} from 'react';
import { View, StyleSheet, Animated } from 'react-native';


function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const ProgressBar = () => {
  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(0);
  useInterval(() => {
    if(progress < 100) {
      setProgress(progress + 5);
    }
  }, 0);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 4200
    }).start();
  },[progress])

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width }}/>
      </View>
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop:5,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    marginTop:30
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  }
});
