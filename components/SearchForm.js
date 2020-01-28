import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Button, TextInput, Title, Subheading, Searchbar, List } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'


const styles = StyleSheet.create({
  label: {
    color: '#FFFFFF',
    margin: 20,
    marginLeft: 0
  },
  button :{
    marginTop: 40,
    height: 20,
    backgroundColor: '#1DE9B6',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#263238',
    borderRadius:10,
    height:'auto',
     ...Platform.select({
      ios: {
        width: 320
      },
      web: {
        width: ((Dimensions.get('window').width)<500)? ((Dimensions.get('window').width)-50): 600,
      },
      android: {
        width: 320
      },
    })
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 40,
    padding: 5,
    borderRadius: 4,
  },
  inputIngredient: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 20,
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 4,
  },
});

var more = false;

function SearchForm({props}) {
        
    var ingredientTemplate = <TextInput style={styles.inputIngredient} dense={true} onChangeText={(text) => {results.ingredient1 = text}}/>;
    var ingredientList = ingredientTemplate;
    var results = {title: '', cuisine: 'none'}

    const { control, handleSubmit, errors } = useForm({mode:'onChange'});
    const onSubmit = data => {

        console.log(data);
        props.navigate('Results')
    
    }
    const onChange = args => {
        return {
            value: args[0].nativeEvent.text,
        };
    };

    const toggleFilter = () => {

        if(more) {

            console.log('less')
            more = false;

        } else {

            console.log('more')
            more = true;

        }
        

    }

    const setCuisine = (c) => {

        results.cuisine = c;

    }

    const addButton = () => {

        ingredientList = ingredientList + ingredientTemplate;

    }

  return (

    <View style={styles.container}>
        <Title style={{color:'#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center'}}>Search</Title>
            <View style={{marginBottom:10}}>
                <Controller
                    as={<Searchbar style={styles.input} onIconPress={(t) => results.title = t}/>}
                    name="search"
                    control={control}
                    onChange={onChange}
                    rules={{ required: true }}
                />
                {errors.search && <Subheading style={{color:'#BF360C', fontSize:15, fontWeight:'300'}}>Invalid Search.</Subheading>}

                <List.Section>
                    <List.Accordion
                        style={{ color: 'red'}}
                        title='Cuisine'
                        >
                        <List.Item color='#FF00FF' title='None' onPress={() => {setCuisine('none')}}></List.Item>
                        <List.Item title='French' onPress={() => {setCuisine('french')}}></List.Item>
                        <List.Item title='Italian' onPress={() => {setCuisine('italian')}}></List.Item>
                        <List.Item title='Indian' onPress={() => {setCuisine('indian')}}></List.Item>
                        <List.Item title='American' onPress={() => {setCuisine('american')}}></List.Item>
                    </List.Accordion>
                    <List.Accordion
                        title='Ingredients'>
                        {ingredientList}
                        <Button color='#FFFFFF' style={{alignSelf: 'center', backgroundColor:'purple', margin: 20}} onPress={() => addButton()}>Add</Button>
                    </List.Accordion>
                </List.Section>

                <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:10}}>
                    <Button color='#FFFFFF' style={{alignSelf: 'center', backgroundColor:'purple', margin: 20}} onPress={() => console.log(results)}>
                        Search
                    </Button>   
                    <Button color='#FFFFFF' style={{alignSelf: 'center',backgroundColor:'grey', margin: 20}} onPress={() => toggleFilter()}>
                        Filters
                    </Button>
                </View>
        </View>
        
        
    </View>
  );
}
export default SearchForm;
