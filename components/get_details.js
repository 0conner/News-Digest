import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useQuery, gql} from '@apollo/client';

const Details = (props) => {
  const GET_NAME = gql`
    query {
      getUserDetails(id: ${props.id}) {
        name
        bio
      }
    }
  `;
  const {loading, error, data} = useQuery(GET_NAME);

  if (loading) return <Text>Loading</Text>;
  if(error) return <Text>Error</Text>
  return (
    <View style={styles.bio}>
      <Text style={styles.name}>{data.getUserDetails.name})</Text>
      <Text style={styles.two}>{data.getUserDetails.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    color: '#fca311',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bio: {
    alignItems: 'center',
  },
  two: {
    fontSize: 16,
  },
});

export default Details;